import { env } from "@/env";
import { db } from "@/db";
import { Account } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { Client, auth } from "twitter-api-sdk";

interface TwitterTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
}

/**
 * Get Twitter tokens for a user from the database
 */
async function getTwitterTokens(userId: string): Promise<TwitterTokens | null> {
  const account = await db
    .select()
    .from(Account)
    .where(and(eq(Account.userId, userId), eq(Account.providerId, "twitter")))
    .limit(1);

  const accountData = account[0];
  if (!accountData?.accessToken) {
    return null;
  }

  return {
    accessToken: accountData.accessToken,
    refreshToken: accountData.refreshToken || undefined,
    expiresAt: accountData.accessTokenExpiresAt || undefined,
  };
}

/**
 * Create a Twitter API client with user's tokens
 */
async function createTwitterClient(userId: string): Promise<Client> {
  const tokens = await getTwitterTokens(userId);

  if (!tokens) {
    throw new Error("No Twitter tokens found for user");
  }

  const authClient = new auth.OAuth2User({
    client_id: env.TWITTER_CLIENT_ID,
    client_secret: env.TWITTER_CLIENT_SECRET,
    callback: `${env.SERVER_BASE_URL}/api/auth/callback/twitter`,
    scopes: ["bookmark.read", "tweet.read", "users.read", "offline.access"],
  });

  // Set the token directly
  authClient.token = {
    access_token: tokens.accessToken,
    refresh_token: tokens.refreshToken,
    token_type: "bearer",
  };

  return new Client(authClient);
}

/**
 * Alternative approach: Create client with bearer token directly
 */
function createTwitterClientWithBearer(accessToken: string): Client {
  const authClient = new auth.OAuth2Bearer(accessToken);
  return new Client(authClient);
}

/**
 * Get user's bookmarks from Twitter API
 */
export async function getUserBookmarks(userId: string) {
  try {
    const tokens = await getTwitterTokens(userId);

    if (!tokens) {
      throw new Error("No Twitter tokens found for user");
    }

    // Try using bearer token approach first
    const client = createTwitterClientWithBearer(tokens.accessToken);

    // Get current user info first to get the user ID
    const userInfo = await client.users.findMyUser();
    const twitterUserId = userInfo.data?.id;

    if (!twitterUserId) {
      throw new Error("Could not get Twitter user ID");
    }

    const response = await client.bookmarks.getUsersIdBookmarks(twitterUserId, {
      max_results: 10,
      "tweet.fields": ["created_at", "public_metrics", "text", "author_id"],
      "user.fields": ["name", "username"],
      expansions: ["author_id"],
    });

    return response;
  } catch (error) {
    console.error("Error fetching user bookmarks:", error);

    // If bearer token fails, try OAuth2User approach
    try {
      console.log("Retrying with OAuth2User...");
      const client = await createTwitterClient(userId);

      const userInfo = await client.users.findMyUser();
      const twitterUserId = userInfo.data?.id;

      if (!twitterUserId) {
        throw new Error("Could not get Twitter user ID");
      }

      const response = await client.bookmarks.getUsersIdBookmarks(
        twitterUserId,
        {
          max_results: 10,
          "tweet.fields": ["created_at", "public_metrics", "text", "author_id"],
          "user.fields": ["name", "username"],
          expansions: ["author_id"],
        },
      );

      return response;
    } catch (retryError) {
      console.error("Retry also failed:", retryError);
      throw error; // throw original error
    }
  }
}

/**
 * Get user's recent tweets
 */
export async function getUserTweets(userId: string) {
  try {
    const tokens = await getTwitterTokens(userId);

    if (!tokens) {
      throw new Error("No Twitter tokens found for user");
    }

    const client = createTwitterClientWithBearer(tokens.accessToken);

    // Get current user info first
    const userInfo = await client.users.findMyUser();
    const twitterUserId = userInfo.data?.id;

    if (!twitterUserId) {
      throw new Error("Could not get Twitter user ID");
    }

    const response = await client.tweets.usersIdTweets(twitterUserId, {
      max_results: 10,
      "tweet.fields": ["created_at", "public_metrics", "text"],
    });

    return response;
  } catch (error) {
    console.error("Error fetching user tweets:", error);
    throw error;
  }
}

/**
 * Get current user info
 */
export async function getTwitterUserInfo(userId: string) {
  try {
    const tokens = await getTwitterTokens(userId);

    if (!tokens) {
      throw new Error("No Twitter tokens found for user");
    }

    const client = createTwitterClientWithBearer(tokens.accessToken);
    const response = await client.users.findMyUser({
      "user.fields": ["name", "username", "public_metrics", "description"],
    });

    return response;
  } catch (error) {
    console.error("Error fetching Twitter user info:", error);
    throw error;
  }
}

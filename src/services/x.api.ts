import { Client, auth } from "twitter-api-sdk";

import { getTwitterTokens } from "@/dao/x.dao";

const createTwitterClient = (accessToken: string): Client => {
  const authClient = new auth.OAuth2Bearer(accessToken);
  return new Client(authClient);
};

export const getUserBookmarks = async (userId: string) => {
  const tokens = await getTwitterTokens(userId);
  if (!tokens?.accessToken) {
    throw new Error("No Twitter tokens found for user");
  }

  const client = createTwitterClient(tokens.accessToken);
  const userInfo = await client.users.findMyUser();
  const twitterUserId = userInfo.data?.id;
  if (!twitterUserId) {
    throw new Error("Could not get Twitter user ID");
  }

  const bookmarks = await client.bookmarks.getUsersIdBookmarks(twitterUserId, {
    max_results: 10,
    "tweet.fields": [
      "attachments",
      "author_id",
      "context_annotations",
      "conversation_id",
      "created_at",
      "edit_controls",
      "edit_history_tweet_ids",
      "entities",
      "geo",
      "id",
      "in_reply_to_user_id",
      "lang",
      "non_public_metrics",
      "organic_metrics",
      "possibly_sensitive",
      "promoted_metrics",
      "public_metrics",
      "referenced_tweets",
      "reply_settings",
      "source",
      "text",
      "withheld",
    ],
    "user.fields": [
      "created_at",
      "description",
      "entities",
      "id",
      "location",
      "name",
      "pinned_tweet_id",
      "profile_image_url",
      "protected",
      "public_metrics",
      "url",
      "username",
      "verified",
      "withheld",
    ],
    expansions: ["author_id"],
  });

  return bookmarks;
};

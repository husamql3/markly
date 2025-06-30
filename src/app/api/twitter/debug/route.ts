import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth/server";
import { db } from "@/db";
import { Account } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get Twitter account info
    const account = await db
      .select()
      .from(Account)
      .where(
        and(
          eq(Account.userId, session.user.id),
          eq(Account.providerId, "twitter")
        )
      )
      .limit(1);

    const accountData = account[0];
    
    return NextResponse.json({
      hasAccount: !!accountData,
      hasAccessToken: !!accountData?.accessToken,
      hasRefreshToken: !!accountData?.refreshToken,
      accessTokenExpiresAt: accountData?.accessTokenExpiresAt,
      scope: accountData?.scope,
      // Don't return actual tokens for security
      accessTokenPreview: accountData?.accessToken ? 
        `${accountData.accessToken.substring(0, 8)}...` : null,
      refreshTokenPreview: accountData?.refreshToken ? 
        `${accountData.refreshToken.substring(0, 8)}...` : null,
    });
  } catch (error) {
    console.error("Debug API error:", error);
    return NextResponse.json(
      { error: "Failed to get debug info" },
      { status: 500 }
    );
  }
} 
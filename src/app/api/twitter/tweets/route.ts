import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth/server";
import { getUserTweets } from "@/services/x.api";

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

    const tweets = await getUserTweets(session.user.id);
    
    return NextResponse.json(tweets);
  } catch (error) {
    console.error("Tweets API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tweets" },
      { status: 500 }
    );
  }
} 
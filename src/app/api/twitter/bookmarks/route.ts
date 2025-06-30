import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth/server";
import { getUserBookmarks } from "@/services/x.api";

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

    const bookmarks = await getUserBookmarks(session.user.id);
    
    return NextResponse.json(bookmarks);
  } catch (error) {
    console.error("Bookmarks API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookmarks" },
      { status: 500 }
    );
  }
} 
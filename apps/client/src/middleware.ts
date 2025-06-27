import { type NextRequest, NextResponse } from "next/server";

import { auth } from "@markly/auth/server";

export async function middleware(request: NextRequest) {
  try {
    const { user } = await auth.api.getSession({
      headers: request.headers,
    });
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export const config = {};

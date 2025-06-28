import { type NextRequest, NextResponse } from "next/server";

import { auth } from "@markly/server/src/auth/server";
import { log } from "@markly/lib/src/logger";

export async function middleware(request: NextRequest) {
  log.debug("[middleware]", request.url);

  try {
    const data = await auth.api.getSession({
      headers: request.headers,
    });
    if (!data?.session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export const config = {
  runtime: "nodejs",
};

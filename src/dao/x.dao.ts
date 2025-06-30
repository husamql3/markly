import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { Account } from "@/db/schema";
import type { TwitterTokensT } from "@/types/x.type";

export const getTwitterTokens = async (
  userId: string,
): Promise<TwitterTokensT | null> => {
  const account = await db
    .select()
    .from(Account)
    .where(and(eq(Account.userId, userId), eq(Account.providerId, "twitter")))
    .limit(1);

  const accountData = account[0];
  if (!accountData.accessToken) {
    return null;
  }

  return {
    accessToken: accountData.accessToken,
    refreshToken: accountData.refreshToken,
  };
};

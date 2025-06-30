import type { AccountT } from "@/types";

export type TwitterTokensT = Pick<AccountT, "accessToken" | "refreshToken">;

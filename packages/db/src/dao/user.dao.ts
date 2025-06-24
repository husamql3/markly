import { eq } from "drizzle-orm";

import type { UserT } from "../types";
import { BaseDao } from "./base.dao";
import { User } from "../schema";
import { db } from "../db";

export class UserDao extends BaseDao<UserT> {
  protected table = User;

  async getByEmail(email: string): Promise<UserT | undefined> {
    const [foundUser] = await db
      .select()
      .from(User)
      .where(eq(User.email, email))
      .limit(1);

    return foundUser as UserT | undefined;
  }

  async findByUserId(id: string): Promise<UserT | undefined> {
    const [foundUser] = await db
      .select()
      .from(User)
      .where(eq(User.id, id))
      .limit(1);

    return foundUser as UserT | undefined;
  }
}

import { eq, type SQL } from "drizzle-orm";

import { BaseDao } from "./base.dao";
import { users } from "../schema";
import { db } from "../db";

export interface User {
  id: number;
  email: string;
  name: string | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserDao extends BaseDao<User> {
  protected table = users;

  async getByEmail(email: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user as unknown as User | undefined;
  }

  async findWithPosts(id: number) {
    const result = await db.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        posts: true,
      },
    });

    return result;
  }
}

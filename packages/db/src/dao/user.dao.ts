import { type SQL, eq } from "drizzle-orm";

import { db } from "../db";
import { type User, user } from "../schema/auth";
import { BaseDao } from "./base.dao";

export class UserDao extends BaseDao<User> {
	protected table = user;

	async getByEmail(email: string): Promise<User | undefined> {
		const [foundUser] = await db
			.select()
			.from(user)
			.where(eq(user.email, email))
			.limit(1);

		return foundUser as User | undefined;
	}

	async findByUserId(id: string): Promise<User | undefined> {
		const [foundUser] = await db.select().from(user).where(eq(user.id, id)).limit(1);

		return foundUser as User | undefined;
	}
}

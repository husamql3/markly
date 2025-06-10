import type { SQL, Table } from "drizzle-orm";
import { eq } from "drizzle-orm";

import { db } from "../db";

export abstract class BaseDao<T> {
	protected abstract table: Table;

	async getAll(options?: {
		where?: SQL | undefined;
		limit?: number;
		offset?: number;
	}): Promise<T[]> {
		const { where, limit, offset } = options || {};

		let query = db.select().from(this.table);

		if (where) {
			query = query.where(where) as typeof query;
		}

		if (limit) {
			query = query.limit(limit) as typeof query;
		}

		if (offset) {
			query = query.offset(offset) as typeof query;
		}

		const result = await query;

		return result as T[];
	}

	async findById(id: number): Promise<T | undefined> {
		const [record] = await db
			.select()
			.from(this.table)
			.where(eq(this.table.id, id))
			.limit(1);

		return record as unknown as T | undefined;
	}

	async create(data: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T> {
		const [record] = await db.insert(this.table).values(data).returning();

		return record as T;
	}

	async update(
		id: number,
		data: Partial<Omit<T, "id" | "createdAt" | "updatedAt">>,
	): Promise<T | undefined> {
		const [record] = await db
			.update(this.table)
			.set({ ...data, updatedAt: new Date() })
			.where(eq(this.table.id, id))
			.returning();

		return record as unknown as T | undefined;
	}

	async delete(id: number): Promise<T | undefined> {
		const [record] = await db.delete(this.table).where(eq(this.table.id, id)).returning();

		return record as unknown as T | undefined;
	}
}

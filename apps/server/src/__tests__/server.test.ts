import { describe, expect, it } from "@jest/globals"
import supertest from "supertest"
import { createServer } from "../server.js"

describe("server", () => {
	it("status check returns 200", async () => {
		await supertest(createServer())
			.get("/status")
			.expect(200)
			.then((res) => {
				expect(res.body.ok).toBe(true)
			})
	})

	it("message endpoint says hello", async () => {
		await supertest(createServer())
			.get("/message/jared")
			.expect(200)
			.then((res) => {
				expect(res.body.message).toBe("hello jared")
			})
	})
})

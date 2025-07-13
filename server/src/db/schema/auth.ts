import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

<<<<<<< HEAD
export const user = pgTable("user", {
=======
export const User = pgTable("user", {
>>>>>>> bhvr
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

<<<<<<< HEAD
export const session = pgTable("session", {
=======
export const Session = pgTable("session", {
>>>>>>> bhvr
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
<<<<<<< HEAD
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
=======
    .references(() => User.id, { onDelete: "cascade" }),
});

export const Account = pgTable("account", {
>>>>>>> bhvr
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
<<<<<<< HEAD
    .references(() => user.id, { onDelete: "cascade" }),
=======
    .references(() => User.id, { onDelete: "cascade" }),
>>>>>>> bhvr
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

<<<<<<< HEAD
export const verification = pgTable("verification", {
=======
export const Verification = pgTable("verification", {
>>>>>>> bhvr
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
<<<<<<< HEAD
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
=======
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
>>>>>>> bhvr
  ),
});

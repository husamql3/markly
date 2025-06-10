CREATE TYPE "public"."platform" AS ENUM('facebook', 'x', 'instagram', 'youtube', 'tiktok', 'linkedin', 'reddit', 'pinterest', 'threads', 'medium', 'dev');--> statement-breakpoint
CREATE TABLE "bookmark" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url" text NOT NULL,
	"platform" "platform" NOT NULL,
	"content" text,
	"media_urls" jsonb DEFAULT '[]'::jsonb,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "collection" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"description" text NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bookmark" ADD CONSTRAINT "bookmark_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collection" ADD CONSTRAINT "collection_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "bookmark_user_id_idx" ON "bookmark" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "bookmark_platform_idx" ON "bookmark" USING btree ("platform");
import nodemailer from "nodemailer";
import { env } from "./env.js";

/**
 * Configured Nodemailer transporter for sending emails via Gmail SMTP.
 */
export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
  pool: true,
  maxConnections: 5,
  maxMessages: Number.POSITIVE_INFINITY,
  rateLimit: 10,
  rateDelta: 1000,
  tls: {
    rejectUnauthorized: true,
    minVersion: "TLSv1.2",
  },
  logger: env.NODE_ENV === "development",
  // debug: env.NODE_ENV === "development",
});

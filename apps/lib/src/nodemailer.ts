import nodemailer from "nodemailer";
import type { SendMailOptions } from "nodemailer";
import { env } from "./env.js";
import { tryCatch } from "./try-catch.js";

/**
 * Configured Nodemailer transporter for sending emails via Gmail SMTP.
 */
const transporter = nodemailer.createTransport({
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

/**
 * Sends an email using the nodemailer transporter.
 * @param options - The email options to send.
 */
export const sendEmail = async (options: SendMailOptions) => {
  const result = await tryCatch(async () => {
    const info = await transporter.sendMail(options);
    console.log("Email sent:", options.to);
    return info;
  });

  if (result.error) {
    console.error(`Failed to send email: ${result.error}`);
  }
};

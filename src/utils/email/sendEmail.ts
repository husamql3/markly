import type { SendMailOptions } from "nodemailer";

import { transporter } from "@/lib/nodemailer";
import { log } from "@/utils/logger";
import { tryCatch } from "@/utils/try-catch";

/**
 * Sends an email using the nodemailer transporter.
 * @param options - The email options to send.
 */
export const sendEmail = async (options: SendMailOptions) => {
  const result = await tryCatch(async () => {
    const info = await transporter.sendMail(options);
    log.debug("Email sent:", options.to);
    return info;
  });

  if (result.error) {
    log.error(`Failed to send email: ${result.error}`);
  }
};

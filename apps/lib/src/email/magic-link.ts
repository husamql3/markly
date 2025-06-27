// import { log } from "../l";
// import { tryCatch } from "../try-catch.js";

// interface MagicLinkEmailParams {
//   email: string;
//   url: string;
// }

// /**
//  * Email template for magic link authentication
//  */
// const MAGIC_LINK_TEMPLATE = ({ url }: { url: string }) => `
//   <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
//     <h1 style="color: #1F2937; margin-bottom: 24px;">Welcome to Markly!</h1>
//     <p style="color: #4B5563; margin-bottom: 16px;">Click the button below to sign in to your account:</p>
//     <a href="${url}"
//        style="display: inline-block;
//               background-color: #4F46E5;
//               color: white;
//               padding: 12px 24px;
//               text-decoration: none;
//               border-radius: 6px;
//               font-weight: 500;
//               margin: 16px 0;">
//       Sign In
//     </a>
//     <p style="color: #6B7280; font-size: 14px; margin-top: 24px;">
//       If you didn't request this email, you can safely ignore it.
//     </p>
//     <p style="color: #6B7280; font-size: 14px;">
//       This link will expire in 5 minutes.
//     </p>
//   </div>
// `;

// /**
//  * Sends a magic link email for authentication
//  * @param params.email - The recipient's email address
//  * @param params.url - The magic link URL for authentication
//  * @returns A Result type containing either the success data or an error
//  * @throws {Error} If the email fails to send
//  */
// export async function sendMagicLinkEmail({ email, url }: MagicLinkEmailParams) {
//   const mailOptions = {
//     from: process.env.SMTP_USER,
//     to: email,
//     subject: "Your Magic Link for Markly",
//     html: MAGIC_LINK_TEMPLATE({ url }),
//   };

//   const result = await tryCatch(async () => {
//     log.debug(`Sending magic link email to ${email}`);
//     await transporter.sendMail(mailOptions);
//     log.debug(`Magic link email sent successfully to ${email}`);
//   });

//   if (!result.isSuccess) {
//     log.error("Failed to send magic link email:", result.error);
//     throw new Error(`Failed to send magic link email: ${result.error.message}`);
//   }
// }

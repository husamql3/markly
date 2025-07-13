import { hcWithType } from "server/dist/client";

export const client = hcWithType(import.meta.env.VITE_SERVER_URL);

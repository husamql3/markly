import { Poppins } from "next/font/google";
import type { ReactNode } from "react";
import type { Metadata } from "next";

import { ReactQueryProvider } from "@/providers/react-query-provider";
import { cn } from "@/utils/cn";
import "./globals.css";
import { Toaster } from "@/ui/sonner";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Markly",
  description: "",
};

function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={cn("root bg-zinc-950 text-zinc-100", poppins.className)}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster position="top-center" expand={true} />
      </body>
    </html>
  );
}

export default RootLayout;

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";

import { ReactQueryProvider } from "@/app/_components/react-query-provider";
import { Toaster } from "@/ui/sonner";
import { cn } from "@/lib/utils";
import "./globals.css";

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
      <body className={cn("bg-zinc-950 text-zinc-100", poppins.className)}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster position="top-center" expand={true} />
      </body>
    </html>
  );
}

export default RootLayout;

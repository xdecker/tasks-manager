import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "../providers/providers";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Tasks Manager",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}

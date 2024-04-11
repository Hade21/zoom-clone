import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yoom",
  description: "Zoom clone by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          logoImageUrl: "icons/yoom-logo.svg",
          socialButtonsVariant: "iconButton",
        },
        variables: {
          colorText: "#ffffff",
          colorPrimary: "#0E78F9",
          colorBackground: "#1c1f2e",
          colorInputBackground: "#252a41",
          colorInputText: "#ffffff",
          fontFamily: "Inter, sans-serif",
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.className} bg-dark-2`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}

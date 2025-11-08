import "@/styles/globals.css";

import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { fontMono, fontSans } from "@/styles/fonts";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      template: "%s | Cryptocurrency Listings App",
      default: "Cryptocurrency Listings App",
    },
    description: "A simple app for real-time cryptocurrency listings",
    icons: {
      icon: "/favicon.ico",
    },
  };
}

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable
        )}
      >
        <main className="container max-w-6xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}

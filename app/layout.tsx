import type { Metadata } from "next";

import "@fontsource/inter/index.css";
import { CursorProvider } from "@/components/cursor-system";
import { SiteAudioProvider } from "@/components/site-audio";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Joshua Beyer | Software Engineer",
    template: "%s",
  },
  description:
    "Portfolio website for Joshua Beyer, a software engineer building thoughtful products across finance, AI, and product systems.",
  openGraph: {
    title: "Joshua Beyer | Portfolio",
    description:
      "Thoughtful digital products spanning finance, AI tooling, maps, and frontend craft.",
    siteName: "Joshua Beyer Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joshua Beyer | Portfolio",
    description:
      "Thoughtful digital products spanning finance, AI tooling, maps, and frontend craft.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <SiteAudioProvider>
          <CursorProvider>{children}</CursorProvider>
        </SiteAudioProvider>
      </body>
    </html>
  );
}

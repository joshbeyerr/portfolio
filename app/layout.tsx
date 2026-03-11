import type { Metadata } from "next";

import "@fontsource/inter/index.css";
import { CursorProvider } from "@/components/cursor-system";
import { SiteAudioProvider } from "@/components/site-audio";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Your Name | Product Designer and Frontend Engineer",
    template: "%s",
  },
  description:
    "Portfolio website for a product designer and frontend engineer focused on calm, precise digital experiences.",
  openGraph: {
    title: "Your Name | Portfolio",
    description:
      "Calm, precise digital experiences spanning product strategy, interface systems, and frontend craft.",
    siteName: "Your Name Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name | Portfolio",
    description:
      "Calm, precise digital experiences spanning product strategy, interface systems, and frontend craft.",
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

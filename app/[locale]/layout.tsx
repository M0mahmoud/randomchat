import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Tajawal } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/themeProvider";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Chat Stranger",
    template: "%s | Chat Stranger",
  },
  description:
    "Connect with strangers and make new friends through random chat!",
  keywords: ["chat", "random", "social", "messaging", "friends"],
  authors: [{ name: "Chat Stranger Team" }],
  creator: "Chat Stranger Team",
  publisher: "Chat Stranger",
  verification: {
    google: "yJjSOYb8whfF_s3VSwzoA5yIazKROQaFdDsiZE761B8",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chatstranger.vercel.app",
    siteName: "ChatStranger",
    title: "ChatStranger - Connect with Strangers",
    description:
      "Connect with strangers and make new friends through random chat!",
    images: [
      {
        url: "https://chatstranger.vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "ChatStranger Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatStranger - Connect with Strangers",
    description:
      "Connect with strangers and make new friends through random chat!",
    images: ["https://chatstranger.vercel.app/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body suppressHydrationWarning className={tajawal.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

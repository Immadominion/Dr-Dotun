import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr Dotun | Venture Capitalist, Entrepreneur & Podcast Host",
  description:
    "Dr. Dotun Olowoporoku — Nigerian-born venture capitalist, entrepreneur, and ecosystem builder shaping the next generation of high-growth companies across Africa.",
  keywords: [
    "Dr Dotun",
    "venture capital",
    "entrepreneur",
    "Africa startups",
    "Building the Future podcast",
    "Ventures Platform",
    "investor",
  ],
  authors: [{ name: "Dr Dotun Olowoporoku" }],
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Dr Dotun | Venture Capitalist, Entrepreneur & Podcast Host",
    description:
      "Scientist at heart. Entrepreneur by accident. Investor by calling.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr Dotun | Venture Capitalist & Entrepreneur",
    description:
      "Scientist at heart. Entrepreneur by accident. Investor by calling.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
        <ThemeProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

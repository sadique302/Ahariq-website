import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AharIQ (आहार IQ) - Indian Food Health & Safety Scanner",
  description: "Decode Indian packaged food labels, Palm Oil, Maida, INS chemical codes and find cleaner alternatives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100 antialiased font-sans transition-colors">
        {children}
      </body>
    </html>
  );
}

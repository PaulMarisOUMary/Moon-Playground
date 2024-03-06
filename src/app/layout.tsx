import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";

import "@/app/styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

const roboto_mono = Roboto_Mono({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "Moon Playground",
  description: "Run Moon code online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${roboto_mono.className}`}>{children}</body>
    </html>
  );
}

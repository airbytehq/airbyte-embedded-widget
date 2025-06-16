import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airbyte Embedded Widget Dev App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen text-black">
        {children}
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import "./globals.css";
import RequireAuth from "./components/utils/RequireAuth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <RequireAuth>
        <body>{children}</body>
      </RequireAuth>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chlorophyll",
  description: "Horticultural ERP for managing living assets with phenological intelligence."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-slate-950 text-slate-50">
      <body className="min-h-full antialiased">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6">
          {children}
        </div>
      </body>
    </html>
  );
}



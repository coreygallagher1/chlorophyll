import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chlorophyll",
  description: "Horticultural ERP for managing living assets with phenological intelligence.",
  icons: {
    icon: "/chlorophyll_logo.png",
    apple: "/chlorophyll_logo.png"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth bg-white">
      <body className="min-h-full antialiased bg-gradient-to-br from-white via-chlorophyll-light-50 to-white">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 md:px-8 md:py-12">
          {children}
        </div>
      </body>
    </html>
  );
}



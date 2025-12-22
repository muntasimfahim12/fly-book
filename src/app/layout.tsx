import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Fotter";
import { AuthProvider } from "../context/AuthContext"; // ✅ AuthContext import

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flight Booking",
  description: "Professional Flight Booking Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* AuthProvider wrap */}
        <AuthProvider>
          <Navbar />

          {/* Page content (navbar fixed, so padding needed) */}
          <main className="pt-20">
            {children}
          </main>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { MediaProvider } from "@/context/MediaContext";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Kishin High School",
  description: "Portal pengelolaan sekolah virtual Kishin High School - Gakuran Roleplay",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${bebas.variable} ${inter.variable} font-body`}>
        <MediaProvider>
          <AuthProvider>{children}</AuthProvider>
        </MediaProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/context/ThemeContext";
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

const NO_FLASH_THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('kishin_theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${bebas.variable} ${inter.variable} font-body`}>
        {/* Applies a saved theme before paint so switching to light mode
            doesn't flash the dark theme first on reload. */}
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_THEME_SCRIPT }} />
        <ThemeProvider>
          <MediaProvider>
            <SessionProvider>
              <AuthProvider>{children}</AuthProvider>
            </SessionProvider>
          </MediaProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

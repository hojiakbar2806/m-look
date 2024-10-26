import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReduxProvider from "./globalReux/provider";
import Header from "./components/header/header";

const poppins = localFont({
  src: "../assets/fonts/Poppins-Regular.ttf",
  variable: "--font-poppins",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <ReduxProvider>
          <main>
            <Header />
            {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}

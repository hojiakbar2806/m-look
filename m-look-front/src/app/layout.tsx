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
  title: "M-Look",
  description: "M-Look is a E-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} flex flex-col items-center`}>
        <ReduxProvider>
          <main className="max-w-[1710px] w-full">
            <Header />
            {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}

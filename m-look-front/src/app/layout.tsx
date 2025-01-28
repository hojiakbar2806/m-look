import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import CartDialog from "src/components/store/cartDialog/cartDialog";
import Header from "src/components/store/header/header";
import ReactQueryProvider from "src/providers/reactQueryProvider";

const poppins = localFont({
  src: "../fonts/Poppins-Regular.ttf",
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
      <ReactQueryProvider>
        <body className={poppins.variable}>
          <main className="app">
            {children}
            <CartDialog />
            <Toaster position="bottom-right" richColors />
          </main>
        </body>
      </ReactQueryProvider>
    </html>
  );
}

import "src/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import ReduxProvider from "src/providers/reduxProvider";
import { Toaster } from "sonner";
import CartDialog from "src/components/store/cartDialog/cartDialog";
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
    <body className={`${poppins.variable} w-full flex flex-col items-center`}>
    <ReduxProvider>
      <ReactQueryProvider>
        <main className="max-w-[1710px] h-screen w-full flex flex-col">
          {children}
        </main>
      </ReactQueryProvider>
      <CartDialog />
      <Toaster position="bottom-right" richColors />
    </ReduxProvider>
    </body>
    </html>
  );
}

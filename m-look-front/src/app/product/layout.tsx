import type { Metadata } from "next";
import Header from "src/components/header/header";
import React from "react";
import CategoryCard from ".";

export const metadata: Metadata = {
  title: "M-Look",
  description: "M-Look is a E-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <React.Fragment>
      <Header />
      <div className="w-full gap-4 flex global-padding">
        <CategoryCard />
        <div className="flex-1 flex flex-col gap-4">{children}</div>
      </div>
    </React.Fragment>
  );
}

import React from "react";
import SettingHeader from "src/components/profile/settingHeader/settingHeader";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-full">
      <SettingHeader />
      <div className="h-full">{children}</div>
    </div>
  );
}

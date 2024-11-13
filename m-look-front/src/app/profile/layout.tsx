import React from "react";
import ProfileHead from "src/components/profile/heads";
import NotificationDialog from "src/components/profile/notificationDialog/notificationDialog";
import SideBar from "src/components/profile/sideBar.tsx/sideBar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-screen flex flex-col">
      <ProfileHead />
      <div className="w-full h-full flex gap-8 px-[10%] py-10 bg-slate-300">
        <SideBar />
        <main className="w-full h-full bg-white rounded-xl overflow-hidden">
          {children}
        </main>
      </div>
      <NotificationDialog />
    </div>
  );
}

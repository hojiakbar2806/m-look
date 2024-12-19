import React, { Fragment } from "react";
import ProfileHead from "src/components/profile/header/header";
import NotificationDialog from "src/components/profile/notificationDialog/notificationDialog";
import SidebarDialog from "src/components/profile/sidebarDialog/sidebarDialog";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Fragment>
      <ProfileHead />
      {children}
      <NotificationDialog />
      <SidebarDialog />
    </Fragment>
  );
}

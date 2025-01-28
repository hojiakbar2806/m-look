"use client";

import React from "react";
import Dialog from "src/components/common/dialog";
import DialogHeader from "src/components/common/dialogHeader";
import { useNotificationDialogStore } from "src/store/profileStore";

const NotificationDialog: React.FC = () => {
  const { isOpen, closeDialog } = useNotificationDialogStore();
  return (
    <Dialog dialogState={isOpen ? "open" : "close"} onClose={closeDialog}>
      <DialogHeader setCartDialog={closeDialog} title="Notifications" />
    </Dialog>
  );
};

export default NotificationDialog;

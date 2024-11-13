import React from "react";
import Dialog from "src/components/common/dialog";

const NotificationDialog: React.FC = () => {
  return (
    <Dialog dialogState="close">
      <div className="w-full h-24 bg-slate-200 flex justify-center items-center text-2xl">
        Recently Notifications
      </div>
    </Dialog>
  );
};

export default NotificationDialog;

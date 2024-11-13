import Link from "next/link";
import React from "react";
import SettingHeaderItem from "./settingHeaderItem";

const SettingHeader: React.FC = () => {
  return (
    <div>
      <ul className="flex items-center px-6 py-2">
        <SettingHeaderItem name="Account setting" path="/profile/setting" />
        <SettingHeaderItem name="Security&privacy"path="/profile/setting/security"/>
        <SettingHeaderItem name="Account setting" path="/profile/setting/account" />
        <SettingHeaderItem name="Account setting" path="/setting/account" />
      </ul>
    </div>
  );
};

export default SettingHeader;

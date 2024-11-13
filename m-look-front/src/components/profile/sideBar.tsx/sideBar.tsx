import React from "react";
import SideBarLink from "./sideBarItem";
import {
  Heart,
  HomeIcon,
  MessageSquareText,
  PackageCheck,
  Settings,
} from "lucide-react";
import LogoutButton from "./logoutButton";

const SideBar: React.FC = () => {
  return (
    <aside className="bg-white flex flex-col justify-between w-72 rounded-xl h-full overflow-hidden p-2">
      <div>
        <SideBarLink
          icon={<HomeIcon size={26} />}
          name="Home"
          path="/profile"
        />
        <SideBarLink
          icon={<Heart size={26} />}
          name="Wishlist"
          path="/profile/wishlist"
        />
        <SideBarLink
          icon={<PackageCheck size={26} />}
          name="Your orders"
          path="/profile/order"
        />
        <SideBarLink
          icon={<MessageSquareText size={26} />}
          name="Chats"
          path="/profile/chat"
        />
        <SideBarLink
          icon={<Settings size={26} />}
          name="Settings"
          path="/profile/setting"
        />
      </div>

      <LogoutButton />
    </aside>
  );
};

export default SideBar;

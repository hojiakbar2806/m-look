import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebarDialogStore } from "src/store/profileStore";

type sideBarItemProps = {
  href: string;
  label: string;
  Icon: LucideIcon;
};

const SidebarItem: React.FC<sideBarItemProps> = ({ href, label, Icon }) => {
  const { closeDialog } = useSidebarDialogStore();
  const pathName = usePathname().split("/").slice(0, 3).join("/");
  const isActive = pathName === href;

  return (
    <li
      data-active={isActive}
      className="flex text-lg
      data-[active=true]:text-primary"
      onClick={closeDialog}
    >
      <Link
        href={href}
        className="w-full flex items-center gap-5 p-4 border-b 
        data-[active=true]:border-b-primary data-[active=true]:text-primary hover:border-b-primary hover:text-primary transition-all duration-200"
      >
        <Icon className="app-icon" />
        {label}
      </Link>
    </li>
  );
};

export default SidebarItem;

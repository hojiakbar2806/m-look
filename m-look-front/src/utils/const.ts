import { HeartIcon, HomeIcon, InboxIcon, MessageCircle } from "lucide-react";

export const BASE_URL = "/api";

export const PROFILE_LINKS = [
  {
    label: "Home",
    path: "/profile",
    icon: HomeIcon,
  },
  {
    label: "Wishlist",
    path: "/profile/wishlist",
    icon: HeartIcon,
  },
  {
    label: "Orders",
    path: "/profile/order",
    icon: InboxIcon,
  },
  {
    label: "Chats",
    path: "/profile/chat",
    icon: MessageCircle,
  },
];

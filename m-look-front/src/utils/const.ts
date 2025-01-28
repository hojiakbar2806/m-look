import { HeartIcon, HomeIcon, InboxIcon, MessageCircle } from "lucide-react";

const APP_ENV = process.env.NODE_ENV;

const TEST_URL = "http://localhost:8000/api";
const PROD_URL = "/m-look/api";

export const BASE_URL = APP_ENV === "production" ? PROD_URL : TEST_URL;

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

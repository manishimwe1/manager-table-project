import { BadgeDollarSign, Home } from "lucide-react";

export const navLink = [
  {
    label: "Home",
    route: "/",
    Icon: <Home className="text-gray-500 h-5 w-5" />,
  },
  {
    label: "Sale",
    route: "/sales",
    Icon: <BadgeDollarSign className="text-gray-500 h-5 w-5" />,
  },
];

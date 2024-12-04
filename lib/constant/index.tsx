import { BadgeDollarSign, Home, PackagePlus } from "lucide-react";

export const navLink = [
  {
    label: "Stock",
    route: "/",
    Icon: <Home className="text-gray-500 h-5 w-5" />,
  },
  {
    label: "Curuza",
    route: "/curuza",
    Icon: <BadgeDollarSign className="text-gray-500 h-5 w-5" />,
  },
  {
    label: "Rangura ",
    route: "/rangura",
    Icon: <PackagePlus className="text-gray-500 h-5 w-5" />,
  },
];

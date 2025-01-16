import {
  BadgeDollarSign,
  BaggageClaim,
  Home,
  PackagePlus,
  ScrollText,
  Store,
  Undo2,
} from "lucide-react";

export const navLink = [
  {
    label: "Home",
    route: "/",
    Icon: <Home className="text-gray-500 h-4 w-4" />,
  },
  {
    label: "Stock",
    route: "/stock",
    Icon: <Store className="text-gray-500 h-4 w-4" />,
  },
  {
    label: "Curuza",
    route: "/curuza",
    Icon: <BadgeDollarSign className="text-gray-500 h-4 w-4" />,
  },
  {
    label: "Rangura ",
    route: "/rangura",
    Icon: <PackagePlus className="text-gray-500 h-4 w-4" />,
  },
  {
    label: "Ibyagurishijwe ",
    route: "/ibyagurishijwe",
    Icon: <BaggageClaim className="text-gray-500 h-4 w-4" />,
  },
  {
    label: "Amadeni ",
    route: "/ideni",
    Icon: <ScrollText className="text-gray-500 h-4 w-4" />,
  },
  {
    label: "Ingaru ",
    route: "/ingaru",
    Icon: <Undo2 className="text-gray-500 h-4 w-4" />,
  },
];

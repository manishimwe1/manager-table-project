"use client";

import { cn, formatReadableDate } from "@/lib/utils";
import { outOfStock } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";

import ActionComponents from "../ActionComponents";
import { MoreVertical } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import ActionElement from "../ibyaranguwe/ActionElement";

export const columns: ColumnDef<outOfStock>[] = [
  {
    accessorKey: "_id",
    header: "",
    cell: ({ row }) => {
      <p className="text-sm dark:text-stone-400 text-stone-800">
        {row.index + 1}
      </p>;
    },
  },
  {
    accessorKey: "igicuruzwa",
    header: "Igicuruzwa",
    cell: ({ row }) => {
      const igicuruzwa = row.getValue("igicuruzwa") as string;
      return <p className="text-nowrap">{igicuruzwa}</p>;
    },
  },
  {
    accessorKey: "ikiranguzo",
    header: "Ikiranguzo",
    cell: ({ row }) => {
      const ikiranguzo = row.getValue("ikiranguzo") as number;
      return (
        <p className="text-blue-900/90 font-bold text-nowrap">
          {ikiranguzo.toLocaleString()} Rwf
        </p>
      );
    },
  },
  {
    accessorKey: "ingano",
    header: () => <p className="text-center">Hasigaye</p>,
    cell: ({ row }) => {
      const hasgaye = row.getValue("ingano") as number;
      return (
        <p className="text-blue-900/90 font-bold text-center">{hasgaye}</p>
      );
    },
  },
  {
    accessorKey: "ndanguyeZingahe",
    header: () => < p className="text-center" > Naranguye</p>,
    cell: ({ row }) => {
      const naranguye = row.getValue("ndanguyeZingahe") as number;
      return (
        <p className="text-blue-900/90 font-bold text-center">{naranguye}</p>
      );
    },
  },

  {
    accessorKey: "status",
    header: () => <p className="text-center">Naranguye gute</p>,
    cell: ({ row }) => {
      const status = row.getValue("status") as boolean;
      console.log(status, "status");
      const amaount = row.getValue("uzishyuraAngahe") as number;
      return (
        <div className="text-right">
          <Badge
            className={cn(
              "!text-center",
              status === false
                ? "bg-[#FFAAAA] hover:bg-[#FFAAAA]"
                : "bg-[#859F3D] hover:bg-[#859F3D]"
            )}
          >
            {status === false ? (
              <p className="flex items-center text-[11px] text-nowrap">
                Ryari ideni
                <span className="text-xs">{amaount.toLocaleString()}</span>
                Rwf
              </p>
            ) : (
              "Nashyuye cash"
            )}
          </Badge>
        </div>
      );
    },
  },

  {
    accessorKey: "uzishyuraAngahe",
    header: undefined,
    cell: ({ row }) => {
      const status = row.getValue("status") as boolean;
      console.log(status, "status");
      const id = row.getValue("_id") as Id<"product">;
      const ndanguyeGute = row.getValue("ndanguyeGute") as "nishyuyeCash" | "mfasheIdeni" | "nishyuyeMake";

      return (
        <ActionElement id={id} ndanguyeGute={ndanguyeGute} />
      );
    },
  },
];

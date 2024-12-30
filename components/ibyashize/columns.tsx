"use client";

import { cn, formatReadableDate } from "@/lib/utils";
import { outOfStock } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";

import ActionComponents from "../ActionComponents";
import { MoreVertical } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

export const columns: ColumnDef<outOfStock>[] = [
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
    header: "Hasigaye",
    cell: ({ row }) => {
      const hasgaye = row.getValue("ingano") as number;
      return (
        <p className="text-blue-900/90 font-bold text-center">{hasgaye}</p>
      );
    },
  },
  {
    accessorKey: "ndanguyeZingahe",
    header: "Naranguye",
    cell: ({ row }) => {
      const naranguye = row.getValue("ndanguyeZingahe") as number;
      return (
        <p className="text-blue-900/90 font-bold text-center">{naranguye}</p>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Ideni narangujwe",
    cell: ({ row }) => {
      const status = row.getValue("status") as boolean;
      console.log(status, "status");
      const amaount = row.getValue("uzishyuraAngahe") as number;
      return (
        <div className="text-right">
          <Badge
            className={cn(
              "!text-right",
              status === false
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
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
    accessorKey: "_id",
    header: undefined,
    cell: ({ row }) => {
      //   const status = row.getValue("status") as boolean;
      //   console.log(status, "status");
      //   const id = row.getValue("_id") as Id<"product">;
      //   return (
      //     <ActionComponents id={id} bishyuye={status}>
      //       <MoreVertical />
      //     </ActionComponents>
      //   );
      // },
      undefined;
    },
  },
  {
    accessorKey: "uzishyuraAngahe",
    header: undefined,
    cell: ({ row }) => {
      const status = row.getValue("status") as boolean;
      console.log(status, "status");
      const id = row.getValue("_id") as Id<"product">;
      return (
        <ActionComponents id={id} bishyuye={status} ibyashize={true}>
          <MoreVertical />
        </ActionComponents>
      );
    },
  },
];

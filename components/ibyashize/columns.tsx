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
    accessorKey: "_creationTime",
    header: "Tariki",
    cell: ({ row }) => {
      const tariki = row.getValue("_creationTime") as number;
      return <p className="w-fit text-xs">{formatReadableDate(tariki)}</p>;
    },
  },
  {
    accessorKey: "igicuruzwa",
    header: "Igicuruzwa",
    cell: ({ row }) => {
      const igicuruzwa = row.getValue("igicuruzwa") as string;
      return <p>{igicuruzwa}</p>;
    },
  },
  {
    accessorKey: "ikiranguzo",
    header: "Ikiranguzo",
    cell: ({ row }) => {
      const ikiranguzo = row.getValue("ikiranguzo") as number;
      return (
        <p className="text-blue-900/90 font-bold">
          {ikiranguzo.toLocaleString()} Rwf
        </p>
      );
    },
  },
  {
    accessorKey: "ndanguyeZingahe",
    header: "Naranguye",
    cell: ({ row }) => {
      const naranguye = row.getValue("ndanguyeZingahe") as number;
      return <p className="text-blue-900/90 font-bold">{naranguye}</p>;
    },
  },
  {
    accessorKey: "uzishyuraAngahe",
    header: "Ideni mwishyura",
    cell: ({ row }) => {
      const uzishyuraAngahe = row.getValue("uzishyuraAngahe") as number;
      return <p>{uzishyuraAngahe.toLocaleString()} Rwf</p>;
    },
  },

  {
    accessorKey: "inyungu",
    header: "Inyungu ",
    cell: ({ row }) => {
      const inyungu = row.getValue("inyungu") as number;
      return <p className="text-left">{inyungu.toLocaleString()} Rwf</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Nideni",
    cell: ({ row }) => {
      const status = row.getValue("status") as boolean;
      return (
        <Badge
          className={cn(
            status === true
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          )}
        >
          {status === true ? "Nideni" : "Narishyuye"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "_id",
    header: "",
    cell: ({ row }) => {
      const rowId = row.getValue("_id") as Id<"product">;
      console.log(rowId);

      return (
        <ActionComponents id={rowId}>
          <MoreVertical className="h-4 w-4" />
        </ActionComponents>
      );
    },
  },
];

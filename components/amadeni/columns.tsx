"use client";

import { Id } from "@/convex/_generated/dataModel";
import { formatReadableDate } from "@/lib/utils";
import { Client, PurchaseType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";

import React from "react";
import DisplayBadge from "../DisplayBadge";
import { MoreVertical } from "lucide-react";
import ActionComponents from "../ActionComponents";

function displayBadge() {}

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "_id",
    header: "",
    cell: () => null,
  },
  {
    accessorKey: "_creationTime",
    header: "Tariki",
    cell: ({ row }) => {
      const tariki = row.getValue("_creationTime") as number;
      return <p className="w-fit text-xs">{formatReadableDate(tariki)}</p>;
    },
  },

  {
    accessorKey: "name",
    header: "Izina ry'umu client",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;

      return <p className="text-left">{name === "" ? "Unkwown" : name} </p>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const phone = row.getValue("phone") as number;
      return <p className="text-left">{phone}</p>;
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
    accessorKey: "aratwaraZingahe",
    header: () => {
      return <p className="text-right">Yatwaye</p>;
    },

    cell: ({ row }) => {
      const total = row.getValue("aratwaraZingahe") as number;
      return <p className="text-right">{total}</p>;
    },
  },

  {
    accessorKey: "yishyuyeAngahe",
    header: () => {
      return <p className="text-right">Ideni</p>;
    },
    size: 20,
    cell: ({ row }) => {
      const total = row.getValue("yishyuyeAngahe") as number;

      return <DisplayBadge value={total} />;
    },
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => {
      const rowId = row.getValue("_id") as Id<"product">;
      return (
        <ActionComponents id={rowId}>
          <p className="text-right  flex justify-end ">
            <MoreVertical className="text-right cursor-pointer" />
          </p>
        </ActionComponents>
      );
    },
  },
];

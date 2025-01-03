"use client";

import { Id } from "@/convex/_generated/dataModel";
import { formatReadableDate } from "@/lib/utils";
import { Client } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

import React from "react";
import DisplayBadge from "../DisplayBadge";
import { MoreVertical } from "lucide-react";
import ActionComponents from "../ActionComponents";
import ShowUkonyigurishije from "../ShowUkonyigurishije";

function displayBadge() {}

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "_id",
    header: "",
    cell: () => null,
  },
  // {
  //   accessorKey: "_creationTime",
  //   header: "Tariki",
  //   cell: ({ row }) => {
  //     const tariki = row.getValue("_creationTime") as number;
  //     return <p className="w-fit text-xs">{formatReadableDate(tariki)}</p>;
  //   },
  // },

  {
    accessorKey: "name",
    header: "Izina ry'umu client",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;

      return (
        <p className="text-left text-nowrap">
          {name === "" ? "Unkwown" : name}{" "}
        </p>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const phone = row.getValue("phone") as number;
      return <p className="text-left text-nowrap">{phone}</p>;
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
    accessorKey: "productId",
    header: "ukonyigurisha",
    cell: ({ row }) => {
      const ukonyigurishaKuriDetail = row.getValue(
        "productId"
      ) as Id<"product">;
      return <ShowUkonyigurishije productId={ukonyigurishaKuriDetail} />;
    },
  },
  {
    accessorKey: "aratwaraZingahe",
    header: () => {
      return <p className="text-center">Yatwaye</p>;
    },

    cell: ({ row }) => {
      const total = row.getValue("aratwaraZingahe") as number;
      return <p className="text-center">{total}</p>;
    },
  },

  {
    accessorKey: "yishyuyeAngahe",
    header: () => {
      return <p className="text-center">Bishyuye</p>;
    },
    size: 20,
    cell: ({ row }) => {
      const total = row.getValue("yishyuyeAngahe") as number;
      const bishyuye = row.getValue("yishyuye") as boolean;
      return <DisplayBadge bishyuye={bishyuye} value={total} />;
    },
  },
  {
    accessorKey: "yishyuye",
    header: "",
    cell: ({ row }) => {
      const rowId = row.getValue("_id") as Id<"client">;
      const bishyuye = row.getValue("yishyuye") as boolean;
      return (
        <ActionComponents id={rowId} ibyashize={false} bishyuye={bishyuye}>
          <p className="text-right  flex justify-end ">
            <MoreVertical className="text-right cursor-pointer" />
          </p>
        </ActionComponents>
      );
    },
  },
];

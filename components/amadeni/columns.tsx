"use client";

import { Id } from "@/convex/_generated/dataModel";
import { formatReadableDate } from "@/lib/utils";
import { Client } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

import React from "react";
import DisplayBadge from "../DisplayBadge";
import { MoreVertical, PlusCircle } from "lucide-react";
import ActionComponents from "../ActionComponents";
import ShowUkonyigurishije from "../ShowUkonyigurishije";
import ShowBadge from "../ibyagurishijwe/ShowBadge";
import { ShowUkonyiranguza } from "../ibyagurishijwe/columns";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function ShowNibaYishyuyeIdeni({
  yishyuyeAngahe,
}: {
  productId: Id<"product">;
  yishyuyeAngahe: number;
}) {
  return (
    <p className="text-sm text-blue-700 text-center animate-pulse text-nowrap">
      {yishyuyeAngahe !== 0 ? (
        <span className="flex items-center !gap-0.5 text-nowrap">
          <PlusCircle className="h-4 w-4" />
          {yishyuyeAngahe.toLocaleString()} Rwf
        </span>
      ) : (
        0
      )}{" "}
    </p>
  );
}

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "_id",
    header: "",
    cell: ({ row }) => {
      return (
        <p className="text-sm dark:text-stone-400 text-stone-800">
          {row.index + 1}
        </p>
      );
    },
  },
  {
    accessorKey: "facture",
    header: "Itariki",
    cell: ({ row }) => {
      const date = row.getValue("_creationTime") as number;
      return (
        <p className="text-sm dark:text-stone-400 text-stone-800">
          {formatReadableDate(date)}
        </p>
      );
    },
  },
  {
    accessorKey: "name",
    header: () => {
      return <p className="text-nowrap">Izina ry'umu client</p>;
    },
    cell: ({ row }) => {
      const name = row.getValue("name") as string;

      return (
        <p className="text-left text-nowrap text-blue-500">
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
      return (
        <p className="text-left text-nowrap">{phone === 0 ? 0 : `+${phone}`}</p>
      );
    },
  },
  {
    accessorKey: "igicuruzwa",
    header: () => <p className="text-center">Igicuruzwa</p>,
    cell: ({ row }) => {
      const igicuruzwa = row.getValue("igicuruzwa") as string;
      return <p className="text-nowrap px-5 text-center">{igicuruzwa}</p>;
    },
  },
  {
    accessorKey: "productId",
    header: () => {
      return <p className="text-nowrap">Uko nyirangura</p>;
    },
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
    accessorKey: "_creationTime",
    header: () => {
      return <p className="text-center text-nowrap">Uko nyigurisha</p>;
    },

    cell: ({ row }) => {
      const productId = row.getValue("productId") as Id<"product">;
      return <ShowUkonyiranguza productId={productId} />;
    },
  },
  {
    accessorKey: "yishyuyezingahe",
    header: () => {
      return <p className="text-center text-nowrap">Amaze kw'ishyura</p>;
    },

    cell: ({ row }) => {
      const productId = row.getValue("productId") as Id<"product">;

      const amazeKwishyura = row.getValue("amazeKwishyura") as number;
      return (
        <ShowNibaYishyuyeIdeni
          productId={productId}
          yishyuyeAngahe={amazeKwishyura}
        />
      );
    },
  },
  {
    accessorKey: "yishyuyeAngahe",
    header: undefined,

    cell: undefined,
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
  {
    accessorKey: "amazeKwishyura",
    header: undefined,
    cell: ({ row }) => {
      return undefined;
    },
  },
];

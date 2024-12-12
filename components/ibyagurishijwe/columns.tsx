"use client";

import { Id } from "@/convex/_generated/dataModel";
import { cn, formatReadableDate } from "@/lib/utils";
import { Client } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { HandCoins } from "lucide-react";

function ShowUkonyiranguza({ productId }: { productId: Id<"product"> }) {
  const product = useQuery(api.product.getProductById, { id: productId });

  return (
    <p className="text-left">
      {product ? product.ukonyigurishaKuriDetail.toLocaleString() : 0} Rwf
    </p>
  );
}

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "_id",
    header: "",
    cell: () => null,
  },
  {
    accessorKey: "nideni",
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
    accessorKey: "igicuruzwa",
    header: "Igicuruzwa",
    cell: ({ row }) => {
      const igicuruzwa = row.getValue("igicuruzwa") as string;
      return <p>{igicuruzwa}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "Izina ry'umukiriya",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return <p className="text-blue-900/90 font-bold">{name}</p>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone y'umukiriya",
    cell: ({ row }) => {
      const phone = row.getValue("phone") as number;
      return <p>{phone}</p>;
    },
  },
  {
    accessorKey: "productId",
    header: "Uko nyiranguza",
    cell: ({ row }) => {
      const productId = row.getValue("productId") as Id<"product">;
      return <ShowUkonyiranguza productId={productId} />;
    },
  },
  {
    accessorKey: "aratwaraZingahe",
    header: "Yatwaye ",
    cell: ({ row }) => {
      const aratwaraZingahe = row.getValue("aratwaraZingahe") as number;
      return <p className="text-left">{aratwaraZingahe}</p>;
    },
  },
  {
    accessorKey: "yishyuyeAngahe",
    header: () => <p className="text-right">Ayo Arimo</p>,
    cell: ({ row }) => {
      const yishyuyeAngahe = row.getValue("yishyuyeAngahe") as number;
      const nideni = row.getValue("nideni") as boolean;
      return (
        <div className="flex gap-1 items-center  justify-end">
          <p
            className={cn(
              "text-left  font-semibold space-x-2",
              nideni ? "text-red-400" : "text-green-500"
            )}
          ></p>
          <Badge
            className={cn(
              " flex items-center  space-x-1 !text-[10px] !px-1",
              nideni
                ? "bg-red-500 hover:bg-red-700 cursor-pointer"
                : "bg-green-500 hover:bg-green-700 cursor-pointer"
            )}
          >
            {nideni
              ? `afite ideni : ${yishyuyeAngahe.toLocaleString()} Rwf`
              : `Yishyuye: ${yishyuyeAngahe.toLocaleString()} Rwf`}
            <HandCoins className="h-4 w-4 text-slate-300" />
          </Badge>
        </div>
      );
    },
  },
];

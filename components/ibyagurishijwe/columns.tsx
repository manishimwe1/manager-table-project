"use client";

import { Id } from "@/convex/_generated/dataModel";
import { cn, formatReadableDate } from "@/lib/utils";
import { Client } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AlertTriangleIcon, HandCoins } from "lucide-react";

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
    accessorKey: "igicuruzwa",
    header: "Igicuruzwa",
    cell: ({ row }) => {
      const igicuruzwa = row.getValue("igicuruzwa") as string;
      return <p className="text-nowrap capitalize">{igicuruzwa}</p>;
    },
  },
  {
    accessorKey: "aratwaraZingahe",
    header: "Yatwaye ",
    cell: ({ row }) => {
      const aratwaraZingahe = row.getValue("aratwaraZingahe") as number;
      return <p className="text-center">{aratwaraZingahe}</p>;
    },
  },
  {
    accessorKey: "name",
    header: () => <p className="text-nowrap ">Izina ry'umukiriya</p>,
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return <p className="text-blue-600/90 font-bold text-nowrap">{name}</p>;
    },
  },
  {
    accessorKey: "phone",
    header: () => <p className="text-nowrap ">Phone y'umukiriya</p>,
    cell: ({ row }) => {
      const phone = row.getValue("phone") as number;
      return <p>{phone}</p>;
    },
  },
  {
    accessorKey: "productId",
    header: () => <p className="text-nowrap ">Uko nyiranguza</p>,
    cell: ({ row }) => {
      const productId = row.getValue("productId") as Id<"product">;
      return <ShowUkonyiranguza productId={productId} />;
    },
  },

  {
    accessorKey: "yishyuye",
    header: "",
    cell: () => null,
  },
  {
    accessorKey: "yishyuyeAngahe",
    header: undefined,
    cell: ({ row }) => {
      const yishyuyeAngahe = row.getValue("yishyuyeAngahe") as number;
      const yishyuye = row.getValue("yishyuye") as boolean;
      return (
        <div className="flex gap-1 items-center  justify-end text-nowrap">
          {yishyuye ? (
            <Badge
              className={cn(
                " flex items-center  space-x-1 !text-[10px] !px-1 bg-green-500 hover:bg-green-700 cursor-pointer !gap-1 text-green-950 font-semibold"
              )}
            >
              <HandCoins className="h-4 w-4 text-slate-300" />
              Yishyuye: {yishyuyeAngahe.toLocaleString()} Rwf
            </Badge>
          ) : (
            <Badge className="flex items-center !text-[10px] !px-1 bg-red-500 hover:bg-red-700 cursor-pointer !gap-1 text-red-950">
              <AlertTriangleIcon className="h-4 w-4 text-slate-300 " />
              afite ideni: {yishyuyeAngahe.toLocaleString()} Rwf
            </Badge>
          )}
        </div>
      );
    },
  },
];

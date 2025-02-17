"use client";

import { Id } from "@/convex/_generated/dataModel";
import { cn, formatReadableDate } from "@/lib/utils";
import { Client, NdanguyeGute } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MoreVertical } from "lucide-react";
import ActionComponents from "../ActionComponents";
import ShowBadge from "./ShowBadge";

export function ShowUkonyiranguza({ productId }: { productId: Id<"product"> }) {
  const product = useQuery(api.product.getProductById, { id: productId });
  console.log(productId);

  return (
    <p className="text-center">
      {product ? product.ukonyigurishaKuriDetail.toLocaleString() : 0} Rwf
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
    accessorKey: "name",
    header: () => <p className="text-nowrap text-left">Izina ry'umukiriya</p>,
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return (
        <p className="text-blue-600/90 font-bold text-nowrap text-left">
          {name}
        </p>
      );
    },
  },

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
    header: () => <p className="text-center">Yatwaye</p>,
    cell: ({ row }) => {
      const aratwaraZingahe = row.getValue("aratwaraZingahe") as number;
      return <p className="text-center">{aratwaraZingahe}</p>;
    },
  },

  {
    accessorKey: "phone",
    header: () => <p className="text-nowrap text-center">Phone y'umukiriya</p>,
    cell: ({ row }) => {
      const phone = row.getValue("phone") as number;
      return <p className="text-center">{phone === 0 ? 0 : `0${phone}`}</p>;
    },
  },
  {
    accessorKey: "productId",
    header: () => <p className="text-nowrap text-center">Uko nyigurishije</p>,
    cell: ({ row }) => {
      const ukoNyigurisha = row.getValue("ukoNyigurisha") as number;
      return (
        <p className="text-center">{ukoNyigurisha.toLocaleString()} Rwf</p>
      );
    },
  },

  {
    accessorKey: "ukoNyigurisha",
    header: () => <p className="text-nowrap text-center"> Ayishyurwa</p>,
    cell: ({ row }) => {
      const ukonyigurisha = row.getValue("ukoNyigurisha") as number;
      const atwayeZingahe = row.getValue("aratwaraZingahe") as number;
      const total = ukonyigurisha * atwayeZingahe;
      return <p className="text-center">{total.toLocaleString()} Rwf</p>;
    },
  },
  {
    accessorKey: "yishyuye",
    header: "",
    cell: () => null,
  },
  {
    accessorKey: "yishyuyeAngahe",
    header: () => <p className="text-nowrap text-center">Yariyishyuye</p>,
    cell: ({ row }) => {
      const yishyuyeAngahe = row.getValue("yishyuyeAngahe") as number;
      const productId = row.getValue("productId") as Id<"product">;
      const yatwaye = row.getValue("aratwaraZingahe") as number;
      const amazeKwishyura = row.getValue("amazeKwishyura") as number;
      const yarishyuye = row.getValue("yishyuye") as boolean;
      const ukonyigurisha = row.getValue("ukoNyigurisha") as number;
      return (
        <ShowBadge
          yarishyuye={yarishyuye}
          amazeKwishyura={amazeKwishyura}
          productId={productId}
          yatwaye={yatwaye}
          ukonyigurisha={ukonyigurisha}
        />
      );
    },
  },
  {
    accessorKey: "amazeKwishyura",
    header: "",
    cell: () => null,
  },
  {
    accessorKey: "_creationTime",
    header: undefined,
    cell: ({ row }) => {
      const id = row.getValue("_id") as Id<"client">;
      const bishyuye = row.getValue("yishyuye") as boolean;
      return (
        <ActionComponents id={id} bishyuye={bishyuye}>
          <MoreVertical />
        </ActionComponents>
      );
    },
  },
];

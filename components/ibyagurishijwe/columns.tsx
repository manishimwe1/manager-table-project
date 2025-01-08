"use client";

import { Id } from "@/convex/_generated/dataModel";
import { cn, formatReadableDate } from "@/lib/utils";
import { Client, NdanguyeGute } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AlertTriangleIcon, HandCoins, MoreVertical } from "lucide-react";
import ActionComponents from "../ActionComponents";
import ShowBadge from "./ShowBadge";

export function ShowUkonyiranguza({ productId }: { productId: Id<"product"> }) {
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
    header: () => <p className="text-nowrap text-center">Izina ry'umukiriya</p>,
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return (
        <p className="text-blue-600/90 font-bold text-nowrap text-center">
          {name}
        </p>
      );
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
    header: () => <p className="text-nowrap ">Uko nyigurisha</p>,
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
      const productId = row.getValue("productId") as Id<"product">;
      const yatwaye = row.getValue("aratwaraZingahe") as number;
      const amazeKwishyura = row.getValue("amazeKwishyura") as number;
      const yarishyuye = row.getValue("yishyuye") as boolean;
      return (
        <ShowBadge
          yishyuyeAngahe={yishyuyeAngahe}
          yarishyuye={yarishyuye}
          amazeKwishyura={amazeKwishyura}
          productId={productId}
          yatwaye={yatwaye}
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
    accessorKey: "_id",
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

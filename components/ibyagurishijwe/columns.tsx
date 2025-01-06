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

function ShowUkonyiranguza({ productId }: { productId: Id<"product"> }) {
  const product = useQuery(api.product.getProductById, { id: productId });

  return (
    <p className="text-left">
      {product ? product.ukonyigurishaKuriDetail.toLocaleString() : 0} Rwf
    </p>
  );
}
function ShowBadge({
  productId,
  yishyuyeAngahe,
}: {
  productId: Id<"product">;
  yishyuyeAngahe: number;
}) {
  const product = useQuery(api.product.getProductById, { id: productId });
  console.log(product, "product");
  const ndanguyeGute = product?.ndanguyeGute as string;
  const uzishyuraAngahe = product?.uzishyuraAngahe as number;
  return (
    <div className="text-right">
      {" "}
      <Badge
        className={cn(
          "cursor-pointer text-stone-900 shadow-sm shadow-black/15 text-nowrap",
          ndanguyeGute === "nishyuyeCash" &&
            " bg-green-600 hover:bg-green-500 text-black -rotate-2 shadow-sm shadow-green-500",
          ndanguyeGute === "mfasheIdeni" &&
            " bg-red-600 hover:bg-red-500 text-black rotate-2 shadow-sm shadow-red-500",
          ndanguyeGute === "nishyuyeMake" &&
            " bg-blue-600 hover:bg-blue-500 text- shadow-sm shadow-blue-500"
        )}
      >
        {ndanguyeGute === "nishyuyeCash" && (
          <span className="text-nowrap">
            Nishyuye {yishyuyeAngahe.toLocaleString()} Rwf
          </span>
        )}

        {ndanguyeGute === "mfasheIdeni" && (
          <span className="text-nowrap">
            hasigaye {yishyuyeAngahe.toLocaleString()} Rwf
          </span>
        )}
        {ndanguyeGute === "nishyuyeMake" && (
          <span className="text-nowrap">
            Nsigajemo {uzishyuraAngahe.toLocaleString()} Rwf
          </span>
        )}
      </Badge>
    </div>
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
      return (
        <ShowBadge productId={productId} yishyuyeAngahe={yishyuyeAngahe} />
      );
    },
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

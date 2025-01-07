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
import ShowBadge from "../ibyagurishijwe/ShowBadge";
import { ShowUkonyiranguza } from "../ibyagurishijwe/columns";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function ShowNibaYishyuyeIdeni({
  productId,
  yishyuyeAngahe,
}: {
  productId: Id<"product">;
  yishyuyeAngahe: number;
}) {
  const product = useQuery(api.product.getProductById, { id: productId });
  return (
    <>
      {yishyuyeAngahe !== 0 ? (
        <p className="text-sm text-blue-700 text-center animate-pulse">
          +{yishyuyeAngahe.toLocaleString()} Rwf
        </p>
      ) : null}
    </>
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
    header: "Izina ry'umu client",
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
      return <p className="text-left text-nowrap">0{phone}</p>;
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
    accessorKey: "yishyuyeAngahe",
    header: () => {
      return <p className="text-center">Azishura</p>;
    },
    cell: ({ row }) => {
      const yishyuyeAngahe = row.getValue("yishyuyeAngahe") as number;
      const productId = row.getValue("productId") as Id<"product">;
      const yatwaye = row.getValue("aratwaraZingahe") as number;
      return (
        <ShowBadge
          productId={productId}
          yishyuyeAngahe={yishyuyeAngahe}
          yatwaye={yatwaye}
        />
      );
    },
  },
  {
    accessorKey: "yishyuyezingahe",
    header: () => {
      return <p className="text-center text-nowrap">Amaze kw'ishyura</p>;
    },

    cell: ({ row }) => {
      const productId = row.getValue("productId") as Id<"product">;
      const yishyuyeAngahe = row.getValue("yishyuyeAngahe") as number;
      return (
        <ShowNibaYishyuyeIdeni
          productId={productId}
          yishyuyeAngahe={yishyuyeAngahe}
        />
      );
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

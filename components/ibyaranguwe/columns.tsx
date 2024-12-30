"use client";

import { Id } from "@/convex/_generated/dataModel";
import { ProductType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

import React from "react";
import DisplayBadge from "../DisplayBadge";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "_id",
    header: "",
    cell: () => null,
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
    accessorKey: "ndanguyeZingahe",
    header: "Naranguye",
    cell: ({ row }) => {
      const productType = row.getValue("ibyoUranguyeType") as string;
      const ndanguyeZingahe = row.getValue("ndanguyeZingahe") as number;

      return (
        <p>
          {productType === "Ikesi x 12" && (
            <span className="text-[12px] mr-1">ikesi </span>
          )}
          {productType === "Ikesi x 20" && (
            <span className="text-[12px] mr-1">ikesi </span>
          )}

          {ndanguyeZingahe === 0 ? (
            <span className="text-red-500 animate-pulse">Byashize</span>
          ) : (
            ndanguyeZingahe
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "byoseHamwe",
    header: undefined,
    cell: () => undefined,
  },
  {
    accessorKey: "ingano",
    header: " hasigaye",
    cell: ({ row }) => {
      const ingano = row.getValue("ingano") as number;
      const byoseHamwe = row.getValue("byoseHamwe") as number;
      const productType = row.getValue("ibyoUranguyeType") as string;
      return (
        <p className=" text-nowrap">
          {productType === "Ikesi x 12" && (
            <span className="text-[12px] mr-1">amacupa </span>
          )}
          {productType === "Ikesi x 20" && (
            <span className="text-[12px] mr-1">amacupa </span>
          )}

          {byoseHamwe}
        </p>
      );
    },
  },
  {
    accessorKey: "ikiranguzo",
    header: "Ikiranguzo",
    cell: ({ row }) => {
      const ikiranguzo = row.getValue("ikiranguzo") as number;
      const productType = row.getValue("ibyoUranguyeType") as string;
      return (
        <p className="text-nowrap">
          {ikiranguzo.toLocaleString()} Rwf{" "}
          {productType === "Ikesi x 12" && (
            <span className="text-[12px] mr-1">Kw'ikesi </span>
          )}
          {productType === "Ikesi x 20" && (
            <span className="text-[12px] mr-1">Kw'ikesi </span>
          )}
        </p>
      );
    },
  },

  {
    accessorKey: "ukonyigurishaKuriDetail",
    header: "Uko Nyigurisha",
    cell: ({ row }) => {
      const iden = row.getValue("ukonyigurishaKuriDetail") as number;
      const productType = row.getValue("ibyoUranguyeType") as string;
      return (
        <p className="text-nowrap">
          {iden.toLocaleString()} Rwf{" "}
          {productType === "Ikesi x 12" && (
            <span className="text-[12px] mr-1">Kw'icupa </span>
          )}
          {productType === "Ikesi x 20" && (
            <span className="text-[12px] mr-1">Kw'icupa </span>
          )}
        </p>
      );
    },
  },

  {
    accessorKey: "uzishyuraAngahe",
    header: () => {
      return <p className="text-nowrap">Ideni mfite</p>;
    },
    cell: ({ row }) => {
      const iden = row.getValue("uzishyuraAngahe") as number;
      return <DisplayBadge value={iden} bishyuye={iden === 0 ? true : false} />;
    },
  },
  {
    accessorKey: "ibyoUranguyeType",

    header: () => {
      return <p className="text-nowrap">Ayo maze Gucuruza</p>;
    },
    cell: ({ row }) => {
      const naranguye = row.getValue("ndanguyeZingahe") as number;
      const nsigaje = row.getValue("ingano") as number;
      const ukonyigurishaKuriDetail = row.getValue(
        "ukonyigurishaKuriDetail"
      ) as number;
      const ayoMazeKunguka = (naranguye - nsigaje) * ukonyigurishaKuriDetail;
      return (
        <p className="text-center">{ayoMazeKunguka.toLocaleString()} Rwf</p>
      );
    },
  },
  {
    accessorKey: "inyungu",
    header: () => {
      return <p className="text-right text-nowrap">Inyungu Niteze byashize</p>;
    },

    cell: ({ row }) => {
      const id = row.getValue("_id") as Id<"product">;

      const total = row.getValue("inyungu") as number;
      return <DisplayBadge value={total} bishyuye={true} />;
    },
  },
];

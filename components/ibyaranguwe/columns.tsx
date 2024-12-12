"use client";

import { Id } from "@/convex/_generated/dataModel";
import { formatReadableDate } from "@/lib/utils";
import { ProductType, PurchaseType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";

import React from "react";
import DisplayBadge from "../DisplayBadge";
import { ArrowDownNarrowWide } from "lucide-react";

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
      return <p>{igicuruzwa}</p>;
    },
  },
  {
    accessorKey: "ibyoUranguyeType",
    header: undefined,
    cell: () => undefined,
  },
  {
    accessorKey: "ndanguyeZingahe",
    header: "Naranguye",
    cell: ({ row }) => {
      const productType = row.getValue("ibyoUranguyeType") as string;
      const ndanguyeZingahe = row.getValue("ndanguyeZingahe") as number;
      return (
        <>
          {productType === "Ikesi x 12" || "Ikesi x 20" ? (
            <p>
              <span className="text-[12px] mr-1">ikesi </span>
              {ndanguyeZingahe}
            </p>
          ) : (
            ndanguyeZingahe
          )}
        </>
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
      const naranguye = row.getValue("ndanguyeZingahe") as number;
      const productType = row.getValue("ibyoUranguyeType") as string;
      return (
        <>
          {productType === "Ikesi x 12" || "Ikesi x 20" ? (
            <p>
              <span className="text-[12px] mr-1">amacupa</span>
              {byoseHamwe}
            </p>
          ) : (
            ingano
          )}
        </>
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
        <>
          {productType === "Ikesi x 12" || "Ikesi x 20" ? (
            <p className="text-left text-nowrap">
              {ikiranguzo.toLocaleString()} Rwf{" "}
              <span className="text-[11px] mr-1">Kw'ikesi</span>
            </p>
          ) : (
            <span>{ikiranguzo.toLocaleString()} Rwf</span>
          )}
        </>
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
        <>
          {productType === "Ikesi x 12" || "Ikesi x 20" ? (
            <p className="text-left text-nowrap">
              {iden.toLocaleString()} Rwf{" "}
              <span className="text-[11px] mr-1">Kw'icupa</span>
            </p>
          ) : (
            <span>{iden.toLocaleString()} Rwf</span>
          )}
        </>
      );
    },
  },

  {
    accessorKey: "uzishyuraAngahe",
    header: () => {
      return <p className="text-nowrap">Ideni mfite</p>;
    },
    cell: ({ row }) => {
      const iden = row.getValue("uzishyuraAngahe") as string;
      return <DisplayBadge value={iden} bishyuye={false} />;
    },
  },
  {
    accessorKey: "status",

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

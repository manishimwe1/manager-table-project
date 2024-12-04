"use client";

import { Id } from "@/convex/_generated/dataModel";
import { formatReadableDate } from "@/lib/utils";
import { PurchaseType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";

import React from "react";
import DisplayBadge from "../DisplayBadge";
import { ArrowDownNarrowWide } from "lucide-react";

export const columns: ColumnDef<PurchaseType>[] = [
  {
    accessorKey: "_id",
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
    accessorKey: "ndanguyeZingahe",
    header: "Naranguye",
    cell: ({ row }) => {
      const ndanguyeZingahe = row.getValue("ndanguyeZingahe") as number;
      return <p>{ndanguyeZingahe}</p>;
    },
  },
  {
    accessorKey: "ingano",
    header: " Stock hasigaye",
    cell: ({ row }) => {
      const ingano = row.getValue("ingano") as number;
      const naranguye = row.getValue("ndanguyeZingahe") as number;
      return (
        <p className="flex gap-0.5 items-center">
          {ingano}
          {ingano < naranguye && (
            <span>
              <ArrowDownNarrowWide className="h-3 w-4 text-red-400" />
            </span>
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "ikiranguzo",
    header: "Ikiranguzo",
    cell: ({ row }) => {
      const iden = row.getValue("ikiranguzo") as number;
      return <p className="text-left">{iden.toLocaleString()} Rwf</p>;
    },
  },

  {
    accessorKey: "ukonyigurisha",
    header: "Uko Nyigurisha",
    cell: ({ row }) => {
      const iden = row.getValue("ukonyigurisha") as number;
      return <p className="text-left">{iden.toLocaleString()} Rwf</p>;
    },
  },

  {
    accessorKey: "uzishyuraAngahe",
    header: "Ideni mfite",
    cell: ({ row }) => {
      const iden = row.getValue("uzishyuraAngahe") as string;
      return <p className="text-left">{iden.toLocaleString()} Rwf</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Ayo maze Gucuruza",
    cell: ({ row }) => {
      const naranguye = row.getValue("ndanguyeZingahe") as number;
      const nsigaje = row.getValue("ingano") as number;
      const ukonyigurisha = row.getValue("ukonyigurisha") as number;
      const ayoMazeKunguka = (naranguye - nsigaje) * ukonyigurisha;
      return <p className="text-left">{ayoMazeKunguka.toLocaleString()} Rwf</p>;
    },
  },
  {
    accessorKey: "inyungu",
    header: () => {
      return <p className="text-right">Inyungu Niteze</p>;
    },

    cell: ({ row }) => {
      const id = row.getValue("_id") as Id<"product">;

      const total = row.getValue("inyungu") as number;
      return <DisplayBadge value={total} />;
    },
  },
];

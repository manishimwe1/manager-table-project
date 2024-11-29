"use client";

import { Id } from "@/convex/_generated/dataModel";
import { formatReadableDate } from "@/lib/utils";
import { PurchaseType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";

import React from "react";
import DisplayBadge from "../DisplayBadge";

function displayBadge() {}

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
    accessorKey: "ingano",
    header: "Muri Stock",
    cell: ({ row }) => {
      const ingano = row.getValue("ingano") as number;
      return <p>{ingano}</p>;
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
    header: () => {
      return <p className="text-right">Inyungu</p>;
    },
    size: 20,
    cell: ({ row }) => {
      const id = row.getValue("_id") as Id<"product">;
      const ukonyigurisha = row.getValue("ukonyigurisha") as number;
      const ingano = row.getValue("ingano") as number;
      const uzishyuraAngahe = row.getValue("uzishyuraAngahe") as number;
      const total = ukonyigurisha * ingano - uzishyuraAngahe;
      return <DisplayBadge value={total} />;
    },
  },
];

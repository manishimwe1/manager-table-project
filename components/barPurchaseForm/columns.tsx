"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Id } from "@/convex/_generated/dataModel";
import SellingButton from "../SellingButton";
import TakeInputValue from "../TakeInputValue";
import { TableRowType } from "@/types";
import { Loader2 } from "lucide-react";
import NumberFlow, { Format } from "@number-flow/react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const columns: ColumnDef<TableRowType>[] = [
  // {
  //   accessorKey: "_id",
  //   header: "",
  //   cell: () => {
  //     null;
  //   }, // Hidden column for internal use
  // },
  // {
  //   accessorKey: "_creationTime",
  //   header: "",
  //   cell: () => null, // Hidden column for internal use
  // },
  {
    accessorKey: "igicuruzwa",
    header: () => <p className="w-28 text-nowrap">Igicuruzwa</p>,
    cell: ({ row }) => {
      const igicuruzwa = row.getValue("igicuruzwa") as string;
      return (
        <Input
          placeholder="shiramo igicuruzwa"
          className="dark:bg-stone-900 dark:text-gray-200 placeholder:text-xs  text-sm !px-1"
        />
      );
    },
  },
  {
    accessorKey: "ingano",
    header: () => <p className=" text-nowrap">Ikarito / Ibiro</p>,
    cell: ({ row }) => {
      const ingano = row.getValue("ingano") as number;
      return (
        <Input
          placeholder="shiramo ingano"
          className="dark:bg-stone-900 dark:text-gray-200 placeholder:text-xs  text-sm !px-1"
        />
      );
    },
  },
  {
    accessorKey: "ikiranguzo",
    header: () => <p className="w-20 text-wrap">Ikiranguzo cya kimwe</p>,
    cell: ({ row }) => {
      const ingano = row.getValue("ingano") as number;
      return (
        <Input
          placeholder="shiramo ikiranguzo"
          className="dark:bg-stone-900 dark:text-gray-200 placeholder:text-xs  text-sm !px-1"
        />
      );
    },
  },
  {
    accessorKey: "uzishyuraAngahe",
    header: () => <p className="">Ikiranguzo byose hamwe</p>,
    cell: ({ row }) => {
      const ingano = row.getValue("ingano") as number;
      return (
        <Input
          placeholder="shiramo ikiranguzo"
          className="dark:bg-stone-900 dark:text-gray-200 placeholder:text-xs  text-sm !px-1"
        />
      );
    },
  },
  {
    accessorKey: "ukonyigurisha",
    header: "Uko Nyigurisha",
    cell: ({ row }) => {
      const format: Format = {
        notation: "compact",
        compactDisplay: "short",
        roundingMode: "trunc",
      };
      const ukonyigurisha = row.getValue("ukonyigurisha") as number;
      return (
        <Input
          placeholder="shiramo ikiranguzo"
          className="dark:bg-stone-900 dark:text-gray-200 placeholder:text-xs  text-sm !px-1"
        />
      );
    },
  },
  {
    accessorKey: "customerName",
    header: "Avamo byose byashize",
    cell: ({ row }) => {
      const ukonyigurisha = row.getValue("ukonyigurisha") as number;
      return (
        <Input
          placeholder="shiramo ikiranguzo"
          className="dark:bg-stone-900 dark:text-gray-200 placeholder:text-xs  text-sm !px-1"
        />
      );
    },
  },
  {
    accessorKey: "status",
    header: "",
    cell: ({ row }) => {
      const ukonyigurisha = row.getValue("ukonyigurisha") as number;
      return <Button className="bg-green-600 text-gray-200">Ongera</Button>;
    },
  },
];

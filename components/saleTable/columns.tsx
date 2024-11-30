"use client";

import { api } from "@/convex/_generated/api";
import { ColumnDef } from "@tanstack/react-table";
import { useMutation } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import AddCustomerName from "../addCustomerName";
import SellingButton from "../SellingButton";
import TakeInputValue from "../TakeInputValue";
import { TableRowType } from "@/types";
import { Loader2 } from "lucide-react";

export const columns: ColumnDef<TableRowType>[] = [
  {
    accessorKey: "_id",
    header: "",
    cell: () => null, // Hidden column for internal use
  },
  {
    accessorKey: "_creationTime",
    header: "",
    cell: () => null, // Hidden column for internal use
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
  },
  {
    accessorKey: "ukonyigurisha",
    header: "Uko Nyigurisha",
  },
  {
    accessorKey: "customerName",
    header: "Izina ry'umukiriya",
    cell: ({ row }) => {
      const rowId = row.getValue("_id") as Id<"product">;
      return <TakeInputValue value={"name"} />;
    },
  },
  {
    accessorKey: "customerPhone",
    header: "Phone / TIN",
    cell: ({ row }) => {
      const rowId = row.getValue("_id") as Id<"product">;
      return <TakeInputValue value={"phone"} />;
    },
  },
  {
    accessorKey: "arashaka",
    header: "Aratwara z'ingahe",
    cell: ({ row }) => {
      const id = row.getValue("_id") as Id<"product">;
      return <TakeInputValue value={"arashaka"} />;
    },
  },
  {
    accessorKey: "yishyuyeAngahe",
    header: "Yishyuye Angahe",
    cell: ({ row }) => {
      const ukonyigurisha = row.getValue("ukonyigurisha") as number;
      console.log(ukonyigurisha);
      const id = row.getValue("_id") as Id<"product">;
      return ukonyigurisha ? (
        <TakeInputValue value={"sale"} ukonyigurisha={ukonyigurisha} id={id} />
      ) : (
        <Loader2 className="animate-spin h-2 w-2" />
      );
    },
  },
  {
    accessorKey: "status",
    header: "Arishyuye",
    cell: ({ row }) => {
      const id = row.getValue("_id") as Id<"product">;

      return <SellingButton id={id} />;
    },
  },
];

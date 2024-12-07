"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Id } from "@/convex/_generated/dataModel";
import SellingButton from "../SellingButton";
import TakeInputValue from "../TakeInputValue";
import { TableRowType } from "@/types";
import { Loader2 } from "lucide-react";
import NumberFlow, { Format } from "@number-flow/react";

export const columns: ColumnDef<TableRowType>[] = [
  {
    accessorKey: "_id",
    header: "",
    cell: () => {
      null;
    }, // Hidden column for internal use
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
    cell: ({ row }) => {
      const format: Format = {
        notation: "compact",
        compactDisplay: "short",
        roundingMode: "trunc",
      };
      const ukonyigurisha = row.getValue("ukonyigurisha") as number;
      return <p>{ukonyigurisha.toLocaleString()} Rwf</p>;
    },
  },
  {
    accessorKey: "customerName",
    header: "Izina ry'umukiriya",
    cell: ({ row, table }) => {
      const ukonyigurisha = row.getValue("ukonyigurisha") as number;
      const rowId = row.getValue("_id") as Id<"product">;
      return (
        <TakeInputValue
          value={"name"}
          ukonyigurisha={ukonyigurisha}
          id={rowId}
          activeRow={row}
        />
      );
    },
  },
  {
    accessorKey: "customerPhone",
    header: "Phone / TIN",
    cell: ({ row }) => {
      const ukonyigurisha = row.getValue("ukonyigurisha") as number;
      const rowId = row.getValue("_id") as Id<"product">;
      return (
        <TakeInputValue
          activeRow={row}
          value={"phone"}
          ukonyigurisha={ukonyigurisha}
          id={rowId}
        />
      );
    },
  },
  {
    accessorKey: "arashaka",
    header: "Aratwara z'ingahe",
    cell: ({ row }) => {
      const ukonyigurisha = row.getValue("ukonyigurisha") as number;
      const id = row.getValue("_id") as Id<"product">;

      return (
        <TakeInputValue
          activeRow={row}
          value={"arashaka"}
          ukonyigurisha={ukonyigurisha}
          id={id}
        />
      );
    },
  },
  {
    accessorKey: "yishyuyeAngahe",
    header: "Arishyura Angahe",
    cell: ({ row }) => {
      const ukonyigurisha = row.getValue("ukonyigurisha") as number;
      const id = row.getValue("_id") as Id<"product">;
      return ukonyigurisha ? (
        <TakeInputValue
          activeRow={row}
          value={"sale"}
          ukonyigurisha={ukonyigurisha}
          id={id}
        />
      ) : (
        <Loader2 className="animate-spin h-2 w-2" />
      );
    },
  },
  {
    accessorKey: "status",
    header: "Yishyuye",
    cell: ({ row }) => {
      const id = row.getValue("_id") as Id<"product">;
      const stock = row.getValue("ingano") as number;
      return <SellingButton id={id} activeRow={row} stock={stock} />;
    },
  },
];

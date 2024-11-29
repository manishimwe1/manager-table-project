"use client";

import { api } from "@/convex/_generated/api";
import { ColumnDef } from "@tanstack/react-table";
import { useMutation } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import AddCustomerName from "../addCustomerName";
import SellingButton from "../SellingButton";
import TakeInputValue from "../TakeInputValue";
import { TableRowType } from "@/types";

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
      return <AddCustomerName rowId={rowId} />;
    },
  },
  {
    accessorKey: "arashaka",
    header: "Aratwara z'ingahe",
    cell: ({ row }) => {
      const id = row.getValue("_id") as Id<"product">;
      const arashaka = row.getValue("arashaka") as string;

      // const updateValue = useMutation(api.product.updateField); // Adjust API call as needed

      const handleUpdate = (value: string) => {
        // updateValue({ id, field: "arashaka", value });
      };

      return (
        <TakeInputValue yishyuyeAngahe={arashaka} setYishyuye={handleUpdate} />
      );
    },
  },
  {
    accessorKey: "yishyuyeAngahe",
    header: "Yishyuye Angahe",
    cell: ({ row }) => {
      const id = row.getValue("_id") as Id<"product">;
      const yishyuyeAngahe = row.getValue("yishyuyeAngahe") as string;

      const updateValue = useMutation(api.product.updateField);

      const handleUpdate = (value: string) => {
        updateValue({ id, field: "yishyuyeAngahe", value });
      };

      return (
        <TakeInputValue value={yishyuyeAngahe} onValueChange={handleUpdate} />
      );
    },
  },
  {
    accessorKey: "status",
    header: "Arishyuye",
    cell: ({ row }) => {
      const id = row.getValue("_id") as Id<"product">;
      const igicuruzwa = row.getValue("igicuruzwa") as string;
      const ingano = row.getValue("ingano") as number;
      const yishyuyeAngahe = row.getValue("yishyuyeAngahe") as string;

      return (
        <SellingButton
          id={id}
          igicuruzwa={igicuruzwa}
          ingano={ingano}
          yishyuyeAngahe={yishyuyeAngahe}
        />
      );
    },
  },
];

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Id } from "@/convex/_generated/dataModel";
import TakeInputValue from "../TakeInputValue";
import { TableRowType } from "@/types";

export const columns: ColumnDef<TableRowType>[] = [
  {
    accessorKey: "_id",
    header: "",
    cell: () => {
      null;
    }, // Hidden column for internal use
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
    accessorKey: "byoseHamwe",
    header: undefined,
    cell: () => undefined,
  },
  {
    accessorKey: "ingano",
    header: () => {
      return <p className="text-nowrap">Muri Stock</p>;
    },
    cell: ({ row }) => {
      const byoseHamwe = row.getValue("byoseHamwe") as number;
      const productType = row.getValue("ibyoUranguyeType") as string;
      return (
        <p className="text-nowrap">
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
    accessorKey: "ibyoUranguyeType",
    header: undefined,
    cell: () => undefined,
  },
  {
    accessorKey: "ikiranguzo",
    header: "Ikiranguzo ",
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
    header: "Uko Ngurisha",
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
    accessorKey: "arashaka",
    header: () => <p className="text-nowrap">Aratwara z'ingahe</p>,
    cell: ({ row }) => {
      const ukonyigurishaKuriDetail = row.getValue(
        "ukonyigurishaKuriDetail"
      ) as number;
      const id = row.getValue("_id") as Id<"product">;
      const byoseHamwe = row.getValue("byoseHamwe") as number;
      const productType = row.getValue("ibyoUranguyeType") as string;
      const igicuruzwa = row.getValue("igicuruzwa") as string;
      const stock = row.getValue("ingano") as number;
      return (
        <TakeInputValue
          byoseHamwe={byoseHamwe}
          productType={productType}
          className="w-[90px] text-nowrap"
          activeRow={row}
          ukonyigurishaKuriDetail={ukonyigurishaKuriDetail}
          id={id}
          ingano={stock}
          igicuruzwa={igicuruzwa}
        />
      );
    },
  },
];

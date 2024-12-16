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
  // {
  //   accessorKey: "customerName",
  //   header: "Izina ry'umukiriya",
  //   cell: ({ row, table }) => {
  //     const ukonyigurishaKuriDetail = row.getValue(
  //       "ukonyigurishaKuriDetail"
  //     ) as number;
  //     const rowId = row.getValue("_id") as Id<"product">;
  //     return (
  //       <TakeInputValue
  //         className="w-[120px] text-nowrap"
  //         value={"name"}
  //         ukonyigurishaKuriDetail={ukonyigurishaKuriDetail}
  //         id={rowId}
  //         activeRow={row}
  //       />
  //     );
  //   },
  // },
  // {
  //   accessorKey: "customerPhone",
  //   header: "Phone / TIN",
  //   cell: ({ row }) => {
  //     const ukonyigurishaKuriDetail = row.getValue(
  //       "ukonyigurishaKuriDetail"
  //     ) as number;
  //     const rowId = row.getValue("_id") as Id<"product">;
  //     return (
  //       <TakeInputValue
  //         className="w-[120px] text-nowrap"
  //         activeRow={row}
  //         value={"phone"}
  //         ukonyigurishaKuriDetail={ukonyigurishaKuriDetail}
  //         id={rowId}
  //       />
  //     );
  //   },
  // },
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
          className="w-[90px] text-nowrap"
          activeRow={row}
          value={"arashaka"}
          byoseHamwe={byoseHamwe}
          productType={productType}
          ingano={stock}
          ukonyigurishaKuriDetail={ukonyigurishaKuriDetail}
          id={id}
          igicuruzwa={igicuruzwa}
        />
      );
    },
  },
  // {
  //   accessorKey: "yishyuyeAngahe",
  //   header: () => <p className="text-nowrap">Yishyuye Angahe</p>,
  //   cell: ({ row }) => {
  //     const ukonyigurishaKuriDetail = row.getValue(
  //       "ukonyigurishaKuriDetail"
  //     ) as number;
  //     const id = row.getValue("_id") as Id<"product">;
  //     const igicuruzwa = row.getValue("igicuruzwa") as string;
  //     return ukonyigurishaKuriDetail ? (
  //       <TakeInputValue
  //         igicuruzwa={igicuruzwa}
  //         className="w-[90px] text-nowrap"
  //         activeRow={row}
  //         value={"sale"}
  //         ukonyigurishaKuriDetail={ukonyigurishaKuriDetail}
  //         id={id}
  //       />
  //     ) : (
  //       <Loader2 className="animate-spin h-2 w-2" />
  //     );
  //   },
  // },
  // {
  //   accessorKey: "status",
  //   header: "Arashyuye",
  //   cell: ({ row }) => {
  //     const byoseHamwe = row.getValue("byoseHamwe") as number;
  //     const productType = row.getValue("ibyoUranguyeType") as string;
  //     const id = row.getValue("_id") as Id<"product">;
  //     const stock = row.getValue("ingano") as number;
  //     return (
  //       <SaveDataToStore
  //         id={id}
  //         activeRow={row}
  //         stock={stock}
  //         productType={productType}
  //         byoseHamwe={byoseHamwe}
  //       />
  //     );
  //   },
  // },
];

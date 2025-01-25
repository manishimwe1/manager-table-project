"use client";

import { cn } from "@/lib/utils";
import { ProductType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";

import { Id } from "@/convex/_generated/dataModel";
import ActionElement from "../ibyaranguwe/ActionElement";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "_id",
    header: "",
    cell: ({ row }) => {
      <p className="text-sm dark:text-stone-400 text-stone-800">
        {row.index + 1}
      </p>;
    },
  },
  {
    accessorKey: "igicuruzwa",
    header: () => <p className="text-left">Igicuruzwa</p>,
    cell: ({ row }) => {
      const igicuruzwa = row.getValue("igicuruzwa") as string;
      return <p className="text-nowrap text-left">{igicuruzwa}</p>;
    },
  },
  {
    accessorKey: "ikiranguzo",
    header: "Ikiranguzo",
    cell: ({ row }) => {
      const ikiranguzo = row.getValue("ikiranguzo") as number;
      return (
        <p className="text-blue-900/90 font-bold text-nowrap">
          {ikiranguzo.toLocaleString()} Rwf
        </p>
      );
    },
  },

  {
    accessorKey: "ndanguyeZingahe",
    header: () => <p className="text-center"> Naranguye</p>,
    cell: ({ row }) => {
      const naranguye = row.getValue("ndanguyeZingahe") as number;
      return (
        <p className="text-blue-900/90 font-bold text-center">{naranguye}</p>
      );
    },
  },
  {
    accessorKey: "ukonyigurishaKuriDetail",
    header: undefined,
    cell: ({ row }) => {
      return undefined;
    },
  },
  {
    accessorKey: "ingano",
    header: () => <p className="text-center">Ayo nacuruje</p>,
    cell: ({ row }) => {
      const ingano = row.getValue("ndanguyeZingahe") as number;
      const ukongurisha = row.getValue("ukonyigurishaKuriDetail") as number;
      const total = ingano * ukongurisha;
      return (
        <p className="text-blue-900/90 font-bold text-center">
          {total.toLocaleString()} rwf
        </p>
      );
    },
  },

  {
    accessorKey: "ndanguyeGute",
    header: () => <p className="text-right text-nowrap">Naranguye gute</p>,
    cell: ({ row }) => {
      const ndanguyeGute = row.getValue("ndanguyeGute") as
        | "nishyuyeCash"
        | "mfasheIdeni"
        | "nishyuyeMake";
      const amaount = row.getValue("uzishyuraAngahe") as number;
      return (
        <div className="text-right">
          {ndanguyeGute === "nishyuyeCash" && (
            <Badge
              className={cn(
                "!text-center text-nowrap bg-[#859F3D] hover:bg-[#859F3D]"
              )}
            >
              {" "}
              Nishyuye cash
            </Badge>
          )}
          {ndanguyeGute === "nishyuyeMake" && (
            <Badge
              className={cn(
                "!text-center text-nowrap bg-[#3d789f] hover:bg-[#3d789f]"
              )}
            >
              {" "}
              Nishyuye make {amaount.toLocaleString()} rwf
            </Badge>
          )}
          {ndanguyeGute === "mfasheIdeni" && (
            <Badge
              className={cn(
                "!text-center text-nowrap bg-[#FFAAAA] hover:bg-[#FFAAAA]"
              )}
            >
              {" "}
              ufite ideni {amaount.toLocaleString()} rwf
            </Badge>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "uzishyuraAngahe",
    header: undefined,
    cell: ({ row }) => {
      const id = row.getValue("_id") as Id<"product">;
      const ndanguyeGute = row.getValue("ndanguyeGute") as
        | "nishyuyeCash"
        | "mfasheIdeni"
        | "nishyuyeMake";

      return (
        <ActionElement id={id} ndanguyeGute={ndanguyeGute} showIngaru={true} />
      );
    },
  },
];

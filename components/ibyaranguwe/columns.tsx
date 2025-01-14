"use client";

import { Id } from "@/convex/_generated/dataModel";
import { ProductType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

import React from "react";
import DisplayBadge from "../DisplayBadge";
import ActionComponents from "../ActionComponents";
import ActionElement from "./ActionElement";

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
    header: "Igicuruzwa",
    cell: ({ row }) => {
      const igicuruzwa = row.getValue("igicuruzwa") as string;
      return <p className="text-nowrap">{igicuruzwa}</p>;
    },
  },
  {
    accessorKey: "ingano",
    header: " hasigaye",
    cell: ({ row }) => {
      const ingano = row.getValue("ingano") as number;
      const byoseHamwe = row.getValue("byoseHamwe") as number;
      const productType = row.getValue("ibyoUranguyeType") as string;
      return (
        <p className=" text-nowrap text-center">
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
    accessorKey: "ndanguyeZingahe",
    header: "Naranguye",
    cell: ({ row }) => {
      const productType = row.getValue("ibyoUranguyeType") as string;
      const ndanguyeZingahe = row.getValue("ndanguyeZingahe") as number;

      return (
        <p className="text-center">
          {productType === "Ikesi x 12" && (
            <span className="text-[12px] mr-1">ikesi </span>
          )}
          {productType === "Ikesi x 20" && (
            <span className="text-[12px] mr-1">ikesi </span>
          )}

          {ndanguyeZingahe === 0 ? (
            <span className="text-red-500 animate-pulse">Byashize</span>
          ) : (
            ndanguyeZingahe
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "byoseHamwe",
    header: undefined,
    cell: () => undefined,
  },
  {
    accessorKey: "ndanguyeGute",
    header: undefined,
    cell: () => undefined,
  },

  {
    accessorKey: "ikiranguzo",
    header: "Ikiranguzo",
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
    header: () => {
      return <p className="text-nowrap text-center">Uko Nyigurisha</p>;
    },
    cell: ({ row }) => {
      const iden = row.getValue("ukonyigurishaKuriDetail") as number;
      const productType = row.getValue("ibyoUranguyeType") as string;
      return (
        <p className="text-nowrap text-center">
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
    accessorKey: "inganoYizoNishyuye",
    header: () => {
      return <p className="text-nowrap text-right">Ndangura nishyuye</p>;
    },
    cell: ({ row }) => {
      const inganoYizoNishyuye = row.getValue("inganoYizoNishyuye") as number;
      const wishyuyeAngahe = row.getValue("wishyuyeAngahe") as number;
      const ndanguyeGute = row.getValue("ndanguyeGute") as string;
      return (
        <p className="text-nowrap text-center">
          {ndanguyeGute === "mfasheIdeni" ? (
            <span className="text-red-500">Nafashe ideni</span>
          ) : ndanguyeGute === "nishyuyeCash" ? (
            <span className="text-green-500">Nishyuye Cash</span>
          ) : (
            <span className="text-blue-500 text-xs">
              {inganoYizoNishyuye} zihagaze {wishyuyeAngahe.toLocaleString()}{" "}
              Rwf
            </span>
          )}
        </p>
      );
    },
  },

  {
    accessorKey: "uzishyuraAngahe",
    header: () => {
      return <p className="text-nowrap  text-center">Ideni mfite</p>;
    },
    cell: ({ row }) => {
      const iden = row.getValue("uzishyuraAngahe") as number;
      const ndanguyeGute = row.getValue("ndanguyeGute") as string;
      const wishyuyeAngahe = row.getValue("wishyuyeAngahe") as number;
      const uzishyuraAngahe = row.getValue("uzishyuraAngahe") as number;

      return (
        <DisplayBadge
          value={ndanguyeGute === "mfasheIdeni" ? iden : wishyuyeAngahe}
          ndanguyeGute={ndanguyeGute}
          uzishyuraAngahe={uzishyuraAngahe}
        />
      );
    },
  },
  {
    accessorKey: "ibyoUranguyeType",

    header: () => {
      return <p className="text-nowrap">Ayo maze Gucuruza</p>;
    },
    cell: ({ row }) => {
      const naranguye = row.getValue("ndanguyeZingahe") as number;
      const nsigaje = row.getValue("ingano") as number;
      const ukonyigurishaKuriDetail = row.getValue(
        "ukonyigurishaKuriDetail"
      ) as number;
      const productType = row.getValue("ibyoUranguyeType") as string;

      const wishyuyeAngahe = row.getValue("") as number;
      const ndanguyeGute = row.getValue("ndanguyeGute") as string;
      const ikiranguzo = row.getValue("ikiranguzo") as number;
      const ayoMazeKunguka = (naranguye - nsigaje) * ukonyigurishaKuriDetail;
      return <p className="text-center">{ayoMazeKunguka.toLocaleString()} </p>;
    },
  },
  {
    accessorKey: "wishyuyeAngahe",
    header: undefined,
    cell: ({ row }) => {
      const id = row.getValue("_id") as Id<"product">;
      const ndanguyeGute = row.getValue("ndanguyeGute") as
        | "nishyuyeCash"
        | "mfasheIdeni"
        | "nishyuyeMake";
      return <ActionElement id={id} ndanguyeGute={ndanguyeGute} />;
    },
  },
];

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Send, X } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import Form from "next/form";
import { useShowEditBoxStore } from "@/lib/store/zustand";
import { ProductType } from "@/types";
import { formatReadableDate } from "@/lib/utils";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

function EditCell({
  igicuruzwa,
  id,
  field,
}: {
  igicuruzwa: string;
  id: Id<"product">;
  field: string;
}) {
  const [newIgicuruzwa, setNewIgicuruzwa] = useState("");
  const { showEditBox, activeProductId, activeField, setShowEditBox } =
    useShowEditBoxStore();

  const updateIgicuruzwa = useMutation(api.product.updateProduct);

  const handleUpdate = () => {
    if (newIgicuruzwa === "" || newIgicuruzwa === igicuruzwa)
      return setShowEditBox(id, null);
    const updatePayload = {
      id,
      fields: {
        [field]: newIgicuruzwa,
      },
    };

    // Call the mutation with the updated payload
    updateIgicuruzwa(updatePayload);

    // Close the edit box after updating
    setShowEditBox(id, null);
  };

  return (
    <div
      className="h-full cursor-pointer relative"
      onDoubleClick={() => setShowEditBox(id, field)}
    >
      {igicuruzwa}
      {activeProductId === id && activeField === field && showEditBox && (
        <div className="bg-violet-50 z-50 absolute top-0 left-0 text-black w-full !h-10">
          <Form
            action={handleUpdate}
            className="relative flex items-center justify-between"
          >
            <Input
              autoFocus
              value={newIgicuruzwa ? newIgicuruzwa : igicuruzwa}
              onChange={(e) => setNewIgicuruzwa(e.target.value)}
            />
            <button
              type="submit"
              className="bg-green-300 hover:bg-secondary-foreground"
            >
              <Send className="absolute cursor-pointer right-2 bottom-0 h-4 w-4  text-black" />
            </button>
          </Form>
          <button className="border border-black">
            <X
              className="absolute cursor-pointer right-0.5 -top-2 text-red-300 h-4 w-4"
              onClick={() => setShowEditBox(id, null)}
            />
          </button>
        </div>
      )}
    </div>
  );
}

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "_id",
    header: () => {},
    cell: ({ row }) => null,
  },
  {
    accessorKey: "igicuruzwa",
    header: "Igicuruzwa",
    cell: ({ row }) => {
      const igicuruzwa = row.getValue("igicuruzwa") as string;
      return (
        <EditCell
          igicuruzwa={igicuruzwa}
          id={row.getValue("_id")}
          field="igicuruzwa"
        />
      );
    },
  },
  {
    accessorKey: "ingano",
    header: "Ingano",
    cell: ({ row }) => {
      const ingano = row.getValue("ingano") as number;
      return (
        <EditCell
          igicuruzwa={ingano.toString()}
          id={row.getValue("_id")}
          field="ingano"
        />
      );
    },
  },
  {
    accessorKey: "ikiranguzo",
    header: "Ikiranguzo",
    cell: ({ row }) => {
      const ikiranguzo = row.getValue("ikiranguzo") as number;
      return (
        <EditCell
          igicuruzwa={ikiranguzo.toString()}
          id={row.getValue("_id")}
          field="ikiranguzo"
        />
      );
    },
  },
  {
    accessorKey: "_creationTime",
    header: "Itariki",
    cell: ({ row }) => {
      const date = row.getValue("_creationTime") as number;
      return (
        <p className="text-xs text-nowrap text-muted-foreground">
          {formatReadableDate(date)}
        </p>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

"use client";

import { useShowEditBoxStore } from "@/lib/store/zustand";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "./DataTable";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ProductType } from "@/types";
import { Loader2 } from "lucide-react";

const DataComponents = ({ dataByDate }: { dataByDate: ProductType }) => {
  return (
    <div className="container mx-auto py-3 h-full">
      {dataByDate ? (
        <DataTable columns={columns} data={dataByDate} />
      ) : (
        <Loader2 className="animate-spin" />
      )}
    </div>
  );
};

export default DataComponents;

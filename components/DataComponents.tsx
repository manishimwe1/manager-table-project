"use client";

import React from "react";
import { ProductType } from "@/types";
import { Loader2 } from "lucide-react";
import { DataTable } from "./saleTable/DataTable";
import { columns } from "./saleTable/columns";

const DataComponents = ({ dataByDate }: { dataByDate: ProductType }) => {
  return (
    <div className="container mx-auto py-3 h-full">
      {dataByDate ? (
        <DataTable columns={columns} data={dataByDate || []} />
      ) : (
        <Loader2 className="animate-spin" />
      )}
    </div>
  );
};

export default DataComponents;

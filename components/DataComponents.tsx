"use client";

import { useShowEditBoxStore } from "@/lib/store/zustand";
import React from "react";
import { columns, Payment } from "./columns";
import { DataTable } from "./DataTable";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ProductType } from "@/types";
import { Loader2 } from "lucide-react";

const DataComponents = () => {
  const data: ProductType = useQuery(api.product.getProduct);
  const resetShowEditBox = useShowEditBoxStore(
    (state) => state.resetShowEditBox
  );
  return (
    <div className="container mx-auto py-10 h-screen">
      {data ? (
        <DataTable columns={columns} data={data} />
      ) : (
        <Loader2 className="animate-spin" />
      )}
    </div>
  );
};

export default DataComponents;

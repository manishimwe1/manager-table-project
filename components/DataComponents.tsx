"use client";

import React, { useState } from "react";
import { ProductType, TableRowType } from "@/types";
import { Loader2 } from "lucide-react";
import { DataTable } from "./saleTable/DataTable";
import { columns } from "./saleTable/columns";
import { RowSelectionState } from "@tanstack/react-table";

const DataComponents = ({
  dataByDate,
}: {
  dataByDate: TableRowType[] | undefined;
}) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  return (
    <div className="container mx-auto py-3 h-full">
      {dataByDate ? (
        <div>
          <DataTable columns={columns} data={dataByDate || []} />

          {Object.keys(rowSelection).length > 0 && (
            <div className="mt-4">
              <p>Selected Rows: {Object.keys(rowSelection).length}</p>
            </div>
          )}
        </div>
      ) : (
        <Loader2 className="animate-spin" />
      )}
    </div>
  );
};

export default DataComponents;

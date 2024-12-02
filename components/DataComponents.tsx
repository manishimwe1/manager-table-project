"use client";

import React, { useState } from "react";
import { ProductType } from "@/types";
import { Loader2 } from "lucide-react";
import { DataTable } from "./saleTable/DataTable";
import { columns } from "./saleTable/columns";
import { RowSelectionState } from "@tanstack/react-table";

const DataComponents = ({ dataByDate }: { dataByDate: ProductType }) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  return (
    <div className="container mx-auto py-3 h-full">
      {dataByDate ? (
        <div>
          <DataTable
            columns={columns}
            data={dataByDate || []}
            rowSelection={rowSelection}
            onRowSelectionChange={setRowSelection}
          />
          {/* You can add a component to display or use selected rows here */}
          {Object.keys(rowSelection).length > 0 && (
            <div className="mt-4">
              {/* Example of how you might use selected rows */}
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

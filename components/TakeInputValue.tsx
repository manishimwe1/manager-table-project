import React, { useState, useCallback, useEffect } from "react";
import { Input } from "./ui/input";
import { useClientInfoStore } from "@/lib/store/zustand";
import { Id } from "@/convex/_generated/dataModel";
import { TableRowType } from "@/types";
import { Row } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

const TakeInputValue = ({
  ukonyigurishaKuriDetail,
  activeRow,
  ingano,
  className,
  byoseHamwe,
  productType,
  id,
  igicuruzwa,
}: {
  ukonyigurishaKuriDetail: number;
  id: Id<"product">;
  ingano?: number;
  activeRow: Row<TableRowType>;
  className: string;
  byoseHamwe?: number;
  productType?: string;
  igicuruzwa: string;
}) => {
  const [inputValue, setInputValue] = useState<string | number>(""); // User-entered value
  const [calculatedValue, setCalculatedValue] = useState<number>(0); // Computed value for display

  const { addProduct, updateProduct, productData } = useClientInfoStore();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      activeRow.toggleSelected(true);

      // Dynamically calculate total for "arashaka"
      const numericValue = Number(newValue);
      const total = numericValue * ukonyigurishaKuriDetail;
      setCalculatedValue(total);
    },
    [activeRow, ukonyigurishaKuriDetail]
  );

  const handleBlur = useCallback(() => {
    if (ukonyigurishaKuriDetail && byoseHamwe && productType && ingano) {
      const numericValue = Number(inputValue);
      const total = numericValue * ukonyigurishaKuriDetail;

      const existingProduct = productData.find((product) => product.id === id);

      if (existingProduct) {
        updateProduct(id, {
          id,
          byoseHamwe,
          productType,
          ingano,
          aratwaraZingahe: numericValue,
          yishyuyeAngahe: total,
        });
      } else {
        addProduct({
          id,
          byoseHamwe,
          productType,
          ingano,
          aratwaraZingahe: numericValue,
          yishyuyeAngahe: total,
          igicuruzwa,
          ukonyigurishaKuriDetail,
        });
      }

      setCalculatedValue(total);
    }
  }, [
    inputValue,
    ukonyigurishaKuriDetail,
    byoseHamwe,
    productType,
    ingano,
    id,
    productData,
    addProduct,
    updateProduct,
  ]);

  // Log `calculatedValue` whenever it updates
  useEffect(() => {
    console.log(productData, "productData in input value");
  }, [productData]);

  return (
    <Input
      className={cn(
        " px-1 placeholder:text-xs border-stone-900 dark:border-stone-500",
        className
      )}
      type="number"
      value={inputValue} // Dynamically determine value
      required={true}
      onChange={handleInputChange}
      onBlur={handleBlur}
      min={0}
    />
  );
};

export default React.memo(TakeInputValue);

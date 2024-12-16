import React, { useState, useCallback, useEffect } from "react";
import { Input } from "./ui/input";
import { useClientInfoStore } from "@/lib/store/zustand";
import { Id } from "@/convex/_generated/dataModel";
import { TableRowType } from "@/types";
import { Row } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

const TakeInputValue = ({
  value,
  ukonyigurishaKuriDetail,
  activeRow,
  ingano,
  className,
  byoseHamwe,
  productType,
  id,
  igicuruzwa,
}: {
  value?: "arashaka" | "sale";
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

      if (value === "arashaka") {
        activeRow.toggleSelected(true);

        // Dynamically calculate total for "arashaka"
        const numericValue = Number(newValue);
        const total = numericValue * ukonyigurishaKuriDetail;
        setCalculatedValue(total);
      }
    },
    [value, activeRow, ukonyigurishaKuriDetail]
  );

  const handleBlur = useCallback(() => {
    if (
      value === "arashaka" &&
      ukonyigurishaKuriDetail &&
      byoseHamwe &&
      productType &&
      ingano
    ) {
      const numericValue = Number(inputValue);
      const total = numericValue * ukonyigurishaKuriDetail;

      // Check if the product already exists in the store
      const existingProduct = productData.find((product) => product.id === id);

      if (existingProduct) {
        // Update the existing product
        updateProduct(id, {
          aratwaraZingahe: numericValue,
          yishyuyeAngahe: total,
        });
      } else {
        // Add a new product
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

      // Update calculatedValue for display
      setCalculatedValue(total);
    }
  }, [
    value,
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
    console.log(calculatedValue, "calculatedValue");
  }, [calculatedValue]);

  // Ensure React.memo doesn't block re-renders
  const computedValue = value === "sale" ? calculatedValue : inputValue;

  return (
    <Input
      disabled={value === "sale"} // Disable input for "sale"
      className={cn(
        " px-1 placeholder:text-xs border-stone-900 dark:border-stone-500",
        className
      )}
      type="number"
      value={computedValue} // Dynamically determine value
      required={value === "arashaka"}
      onChange={value === "sale" ? undefined : handleInputChange}
      onBlur={value === "arashaka" ? handleBlur : undefined}
      min={0}
      max={value === "arashaka" && ingano ? ingano : undefined}
    />
  );
};

export default React.memo(TakeInputValue);

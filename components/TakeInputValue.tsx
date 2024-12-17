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
  ingano: number;
  activeRow: Row<TableRowType>;
  className: string;
  byoseHamwe: number;
  productType: string;
  igicuruzwa: string;
}) => {
  const [inputValue, setInputValue] = useState<string | number>(""); // Local state for input value
  const [calculatedValue, setCalculatedValue] = useState<number>(0); // Computed value for display

  const { addProduct, updateProduct, productData } = useClientInfoStore();

  // Pre-fill input value if product already exists
  useEffect(() => {
    const existingProduct = productData.find((product) => product.id === id);
    if (existingProduct) {
      setInputValue(existingProduct.aratwaraZingahe || ""); // Pre-fill aratwaraZingahe value
    }
  }, [id, productData]);

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      activeRow.toggleSelected(true);

      const numericValue = Number(newValue);
      const total = numericValue * ukonyigurishaKuriDetail;
      setCalculatedValue(total);
    },
    [activeRow, ukonyigurishaKuriDetail]
  );

  // Handle input blur (save or update product)
  const handleBlur = useCallback(() => {
    if (!ukonyigurishaKuriDetail || !byoseHamwe || !productType || !ingano) {
      console.warn("Missing required product details", {
        ukonyigurishaKuriDetail,
        byoseHamwe,
        productType,
        ingano,
      });
      return;
    }

    const numericValue = Number(inputValue);
    const total = numericValue * ukonyigurishaKuriDetail;

    const existingProduct = productData.find((product) => product.id === id);

    if (existingProduct) {
      // Update the existing product
      updateProduct(id, {
        aratwaraZingahe: numericValue,
        yishyuyeAngahe: total,
      });
    } else {
      // Add a new product with activeRow info
      addProduct({
        id,
        byoseHamwe,
        productType,
        ingano,
        aratwaraZingahe: numericValue,
        yishyuyeAngahe: total,
        igicuruzwa,
        ukonyigurishaKuriDetail,
        activeRow: activeRow, // Add activeRow to productData
      });
    }
    setCalculatedValue(total);
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
    activeRow,
  ]);

  return (
    <Input
      className={cn(
        "px-1 placeholder:text-xs border-stone-900 dark:border-stone-500",
        className
      )}
      type="number"
      value={inputValue}
      required
      onChange={handleInputChange}
      onBlur={handleBlur}
      min={0}
    />
  );
};

export default React.memo(TakeInputValue);

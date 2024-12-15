import React, { useState } from "react";
import { Input } from "./ui/input";
import { useClientInfoStore } from "@/lib/store/zustand";
import { Id } from "@/convex/_generated/dataModel";
import { ProductType, TableRowType } from "@/types";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Row } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { set } from "zod";

const TakeInputValue = ({
  value,
  ukonyigurishaKuriDetail,
  activeRow,
  stock,
  className,
  byoseHamwe,
  productType,
  id,
}: {
  value?: "arashaka" | "sale";
  ukonyigurishaKuriDetail: number;
  id: Id<"product">;
  stock?: number;
  activeRow: Row<TableRowType>;
  className: string;
  byoseHamwe?: number;
  productType?: string;
}) => {
  // Local states for managing inputs

  const [inputValue, setInputValue] = useState<string | number>("");
  const [calculatedValue, setCalculatedValue] = useState<number>(0);

  // Zustand store actions
  const {
    setAratwaraZingahe,
    setYishyuyeAngahe,
    yishyuyeAngahe,
    isSubmiting,
    setisSubmiting,
    addToStoreId,
    setproductType,
    setByoseHamwe,
    setStock,
  } = useClientInfoStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    switch (value) {
      case "arashaka": // Quantity requested
        setInputValue(Number(newValue));
        if (ukonyigurishaKuriDetail && activeRow.getIsSelected()) {
          const total = Number(newValue) * ukonyigurishaKuriDetail;

          setCalculatedValue(total);
          setYishyuyeAngahe(total);
          setAratwaraZingahe(Number(newValue));
          addToStoreId(id); // Add product ID to storeId array
          setproductType(productType as string);
          setByoseHamwe(byoseHamwe as number);
          setStock(stock as number);
        }
        break;

      case "sale": // Sale amount (calculated based on quantity * unit price)
        setInputValue(calculatedValue);
        break;

      default: // Generic input handling
        setInputValue(newValue);
        setAratwaraZingahe(Number(newValue));
        break;
    }
  };

  return (
    <Input
      disabled={value === "sale" ? true : false}
      className={cn(
        " px-1 placeholder:text-xs border-stone-900 dark:border-stone-500",
        className
      )}
      type={"number"}
      value={
        value === "sale" && activeRow.getIsSelected()
          ? yishyuyeAngahe
          : isSubmiting
            ? ""
            : inputValue
      }
      required={value === "arashaka" ? true : false}
      onChange={
        value === "sale"
          ? (v) => setInputValue(calculatedValue)
          : (v) => setInputValue(v.target.value)
      }
      onBlur={handleInputChange}
      onFocus={() => {
        activeRow.toggleSelected(true);
        if (isSubmiting) {
          setInputValue(0);
          setisSubmiting(false);
        }
      }}
      min={0}
      max={value === "arashaka" && stock ? stock : undefined}
    />
  );
};

export default TakeInputValue;

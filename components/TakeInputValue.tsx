import React, { useState } from "react";
import { Input } from "./ui/input";
import { useClientInfoStore } from "@/lib/store/zustand";
import { Id } from "@/convex/_generated/dataModel";
import { ProductType, TableRowType } from "@/types";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Row } from "@tanstack/react-table";

const TakeInputValue = ({
  value,
  ukonyigurisha,
  activeRow,
  stock,
}: {
  value?: "arashaka" | "sale" | "name" | "phone"; // Indicates the type of input field
  ukonyigurisha: number; // Unit price for calculation
  id: Id<"product">;
  stock?: number;
  activeRow: Row<TableRowType>;
}) => {
  // Local states for managing inputs

  const [inputValue, setInputValue] = useState<string | number>("");
  const [calculatedValue, setCalculatedValue] = useState<number>(0);

  // Zustand store actions
  const {
    setAratwaraZingahe,
    setYishyuyeAngahe,
    yishyuyeAngahe,
    setName,
    setPhone,
    isSubmiting,
    setisSubmiting,
  } = useClientInfoStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    switch (value) {
      case "arashaka": // Quantity requested
        setInputValue(Number(newValue));
        if (ukonyigurisha && activeRow.getIsSelected()) {
          const total = Number(newValue) * ukonyigurisha;

          setCalculatedValue(total);
          setYishyuyeAngahe(total);
          setAratwaraZingahe(Number(newValue));
        }
        break;

      case "sale": // Sale amount (calculated based on quantity * unit price)
        setInputValue(calculatedValue);

        break;

      case "name": // Client's name
        setInputValue(newValue);
        setName(newValue);
        break;

      case "phone": // Client's phone or TIN
        setInputValue(newValue);
        setPhone(Number(newValue));
        break;

      default: // Generic input handling
        setInputValue(newValue);
        setAratwaraZingahe(Number(newValue));
        break;
    }
  };
  console.log(isSubmiting);

  return (
    <Input
      disabled={value === "sale" ? true : false}
      className="w-[120px] px-1 placeholder:text-xs"
      type={value === "name" ? "text" : "number"}
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
          setInputValue(value === "name" ? "" : value === "phone" ? 0 : 0);
          setisSubmiting(false);
        }
      }}
      placeholder={
        value === "name"
          ? "Izina"
          : value === "phone"
            ? "Phone / TIN"
            : value === "sale"
              ? String(calculatedValue)
              : ""
      }
      max={value === "arashaka" && stock ? stock : undefined}
    />
  );
};

export default TakeInputValue;

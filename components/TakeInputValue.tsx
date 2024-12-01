import React, { useState } from "react";
import { Input } from "./ui/input";
import { useClientInfoStore } from "@/lib/store/zustand";
import { Id } from "@/convex/_generated/dataModel";
import { ProductType } from "@/types";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const TakeInputValue = ({
  value,
  ukonyigurisha,
  id,
}: {
  value?: string; // Indicates the type of input field
  ukonyigurisha: number; // Unit price for calculation
  id?: Id<"product">; // Product ID
}) => {
  // Local states for managing inputs
  const [inputValue, setInputValue] = useState<string | number>("");
  const [calculatedValue, setCalculatedValue] = useState<number>(0);

  // Zustand store actions
  const {
    setAratwaraZingahe,
    setYishyuyeAngahe,
    yishyuyeAngahe,
    name,
    setName,
    setPhone,
  } = useClientInfoStore();

  const data: ProductType = useQuery(api.product.getProduct);

  const activeProduct = data?.find((item) => item._id === id);

  console.log(activeProduct);

  // Handle changes based on input type
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    switch (value) {
      case "arashaka": // Quantity requested
        setInputValue(Number(newValue));
        if (ukonyigurisha && activeProduct?._id === id) {
          const total = Number(newValue) * ukonyigurisha;

          setCalculatedValue(total);
          setYishyuyeAngahe(total);
          setAratwaraZingahe(Number(newValue));
          console.log(total, id, ukonyigurisha, "..........");
        }
        break;

      case "sale": // Sale amount (calculated based on quantity * unit price)
        setInputValue(calculatedValue);

        break;

      case "name": // Client's name
        console.log("here", ukonyigurisha, newValue);
        setInputValue(newValue);
        setName(newValue);
        break;

      case "phone": // Client's phone or TIN
        setInputValue(newValue);
        setPhone(Number(newValue));
        console.log("here", ukonyigurisha, Number(newValue));
        break;

      default: // Generic input handling
        setInputValue(newValue);
        setAratwaraZingahe(Number(newValue));
        break;
    }
  };
  console.log(yishyuyeAngahe, inputValue);

  return (
    <Input
      disabled={value === "sale" ? true : false}
      className="w-[120px] px-1 placeholder:text-xs"
      type={value === "name" ? "text" : "number"}
      value={value === "sale" && name === "" ? yishyuyeAngahe : inputValue}
      onChange={
        value === "sale"
          ? (v) => setInputValue(calculatedValue)
          : (v) => setInputValue(v.target.value)
      }
      onBlur={handleInputChange}
      placeholder={
        value === "name"
          ? "Izina"
          : value === "phone"
            ? "Phone / TIN"
            : value === "sale"
              ? String(calculatedValue)
              : ""
      }
    />
  );
};

export default TakeInputValue;

import React, { useState } from "react";
import { Input } from "./ui/input";
import { useClientInfoStore } from "@/lib/store/zustand";
import { calculateTotal } from "@/lib/utils";
import { Id } from "@/convex/_generated/dataModel";

const TakeInputValue = ({
  value,
  ukonyigurisha,
  id,
}: {
  value?: string;
  ukonyigurisha?: number;
  id?: Id<"product">;
}) => {
  const [inputValue, setInputValue] = useState<string | number>();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState<number>(0);
  const [yishyue, setyishyue] = useState<number>(0);
  const [ukoigura, setUkoigura] = useState<number>(0);
  const { setAratwaraZingahe, setYishyuyeAngahe, yishyuyeAngahe } =
    useClientInfoStore();
  const clientName = useClientInfoStore((state) => state.setName);
  const clientPhone = useClientInfoStore((state) => state.setPhone);
  console.log("here", yishyue, ukonyigurisha);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (value === "arashaka" && ukonyigurisha) {
      setUkoigura(ukonyigurisha);
      setInputValue(newValue);
      console.log("here on ashaka", yishyue, ukonyigurisha);
    } else if (value === "name") {
      clientName(newValue);
      setInputValue(newValue);
    } else if (value === "phone") {
      clientPhone(phone);
      setInputValue(newValue);
    } else {
      setAratwaraZingahe(Number(newValue));
      setInputValue(newValue);
    }
  };

  function calculateYishyuyeAngahe(ukonyigurisha: number) {
    console.log("here///////////////////", yishyue, ukonyigurisha);

    if (ukonyigurisha) {
      const calculatedValue = Number(inputValue) * ukonyigurisha;

      setyishyue(calculatedValue);
    }
  }

  return (
    <Input
      className="w-[100px] px-1"
      type={value === "name" ? "text" : "number"}
      value={value === "sale" ? yishyue : inputValue}
      onChange={handleInputChange}
      onBlur={() => {
        value === "arashaka"
          ? calculateYishyuyeAngahe(ukonyigurisha!)
          : undefined;
      }}
    />
  );
};

export default TakeInputValue;

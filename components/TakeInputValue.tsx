import React, { useState } from "react";
import { Input } from "./ui/input";
import { useClientInfoStore } from "@/lib/store/zustand";

const TakeInputValue = ({
  value,
  ukonyigurisha,
}: {
  value?: string;
  ukonyigurisha?: number;
}) => {
  const [yishyuyeAngahe, setYishyuye] = useState<string>("");
  const { setAratwaraZingahe, setYishyuyeAngahe } = useClientInfoStore();

  return (
    <Input
      className="w-[100px] px-1"
      type="number"
      value={
        value === "sale" && ukonyigurisha && yishyuyeAngahe
          ? Number(yishyuyeAngahe) * ukonyigurisha
          : yishyuyeAngahe
      }
      onChange={(v) => {
        if (value === "sale") {
          setYishyuye(v.target.value);
          setYishyuyeAngahe(Number(v.target.value));
        } else {
          setYishyuye(v.target.value);

          setAratwaraZingahe(Number(v.target.value));
        }
      }}
    />
  );
};

export default TakeInputValue;

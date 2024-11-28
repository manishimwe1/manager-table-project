import React from "react";
import { Input } from "./ui/input";

const TakeInputValue = ({
  setYishyuye,
  yishyuyeAngahe,
}: {
  setYishyuye: (value: string) => void;
  yishyuyeAngahe: string;
}) => {
  return (
    <Input
      className="w-[100px] px-1"
      type="number"
      value={yishyuyeAngahe}
      onChange={(v) => setYishyuye(v.target.value)}
    />
  );
};

export default TakeInputValue;

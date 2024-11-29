import React from "react";
import { Badge } from "./ui/badge";

const DisplayBadge = ({ value }: { value: string | number }) => {
  return (
    <div className="text-right">
      {" "}
      <Badge className="bg-green-400 hover:bg-green-600 cursor-pointer text-stone-900 shadow-sm shadow-black/15">
        {value.toLocaleString()} Rwf
      </Badge>
    </div>
  );
};

export default DisplayBadge;

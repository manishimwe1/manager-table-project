import React from "react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

const DisplayBadge = ({
  value,
  bishyuye,
}: {
  value: string | number;
  bishyuye?: boolean;
}) => {
  return (
    <div className="text-center">
      {" "}
      <Badge
        className={cn(
          "cursor-pointer text-stone-900 shadow-sm shadow-black/15 text-nowrap",
          bishyuye
            ? " bg-green-600 hover:bg-green-500 text-black"
            : "bg-red-600 hover:bg-red-500"
        )}
      >
        {value.toLocaleString()} Rwf
      </Badge>
    </div>
  );
};

export default DisplayBadge;

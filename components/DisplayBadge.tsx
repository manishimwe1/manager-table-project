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
          "cursor-pointer text-stone-900 shadow-sm shadow-black/15 ",
          bishyuye
            ? "bg-red-400 hover:bg-red-600 "
            : "bg-green-400 hover:bg-green-600 "
        )}
      >
        {value.toLocaleString()} Rwf
      </Badge>
    </div>
  );
};

export default DisplayBadge;

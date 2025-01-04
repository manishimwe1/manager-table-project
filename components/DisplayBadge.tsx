import React from "react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

const DisplayBadge = ({
  value,
  bishyuye,
  ndanguyeGute,
}: {
  value: string | number;
  bishyuye?: boolean;
  ndanguyeGute: string;
}) => {
  return (
    <div className="text-right">
      {" "}
      <Badge
        className={cn(
          "cursor-pointer text-stone-900 shadow-sm shadow-black/15 text-nowrap",
          bishyuye
            ? " bg-green-600 hover:bg-green-500 text-black"
            : "bg-red-600 hover:bg-red-500"
        )}
      >
        {ndanguyeGute === "nishyuyeCash" && (
          <span className="text-nowrap">
            Nishyuye {value.toLocaleString()} Rwf
          </span>
        )}

        {ndanguyeGute === "mfasheIdeni" && (
          <span className="text-nowrap">
            hasigaye {value.toLocaleString()} Rwf
          </span>
        )}
        {ndanguyeGute === "nishyuyeMake" && (
          <span className="text-nowrap">
            hasigaye {value.toLocaleString()} Rwf
          </span>
        )}
      </Badge>
    </div>
  );
};

export default DisplayBadge;

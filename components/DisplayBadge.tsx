import React from "react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

const DisplayBadge = ({
  value,
  ndanguyeGute,
  uzishyuraAngahe,
}: {
  value: string | number;
  ndanguyeGute: string;
  uzishyuraAngahe: number;
}) => {
  return (
    <div className="text-right">
      <Badge
        className={cn(
          "cursor-pointer text-gray-950 shadow-sm shadow-black/15 text-nowrap",
          ndanguyeGute === "nishyuyeCash" &&
            " bg-[#859F3D] hover:bg-[#859F3D]   shadow-sm shadow-[#859F3D]",
          ndanguyeGute === "mfasheIdeni" &&
            " bg-[#FFAAAA] hover:bg-[#FFAAAA]  shadow-sm shadow-[#FFAAAA]",
          ndanguyeGute === "nishyuyeMake" &&
            " bg-blue-600 hover:bg-blue-500 text-gray-200 text- shadow-sm shadow-blue-500"
        )}
      >
        {ndanguyeGute === "nishyuyeCash" && (
          <span className="text-nowrap">Nishyuye cash</span>
        )}

        {ndanguyeGute === "mfasheIdeni" && (
          <span className="text-nowrap">
            mfite ideni rya {value.toLocaleString()} Rwf
          </span>
        )}
        {ndanguyeGute === "nishyuyeMake" && (
          <span className="text-nowrap">
            Nsigajemo ideni rya {uzishyuraAngahe.toLocaleString()} Rwf
          </span>
        )}
      </Badge>
    </div>
  );
};

export default DisplayBadge;

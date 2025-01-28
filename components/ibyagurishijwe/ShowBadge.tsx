import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { useEffect, useMemo } from "react";

export default function ShowBadge({
  productId,
  yatwaye,
  yarishyuye,
  amazeKwishyura,
  yishyuyeAngahe,
}: {
  productId: Id<"product">;
  yarishyuye?: boolean;
  yatwaye: number;
  amazeKwishyura: number;
  yishyuyeAngahe?: number;
}) {
  const product = useQuery(api.product.getProductById, { id: productId });

  const ukonyigurishaKuriDetail = product?.ukonyigurishaKuriDetail as number;

  return (
    <div className="text-center">
      {" "}
      {yarishyuye ? (
        <Badge
          className={cn(
            "cursor-pointer text-stone-900 shadow-sm text-nowrap bg-[#859F3D] hover:bg-[#859F3D] shadow-[#859F3D]"
          )}
        >
          <span className="text-nowrap">Yishyuye cash</span>
        </Badge>
      ) : (
        <Badge
          className={cn(
            "cursor-pointer text-stone-900 shadow-sm text-nowrap bg-[#FFAAAA] hover:bg-[#FFAAAA] shadow-[#FFAAAA]"
          )}
        >
          <span className="text-nowrap">
            Afite ideni{" "}
            {amazeKwishyura === 0
              ? (ukonyigurishaKuriDetail * yatwaye).toLocaleString()
              : (
                  ukonyigurishaKuriDetail * yatwaye -
                  amazeKwishyura
                ).toLocaleString()}{" "}
            Rwf
          </span>
        </Badge>
      )}
    </div>
  );
}

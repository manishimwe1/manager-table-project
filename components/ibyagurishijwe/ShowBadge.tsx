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
    <div className="text-right">
      {" "}
      {yarishyuye ? (
        <Badge
          className={cn(
            "cursor-pointer text-stone-900 shadow-sm text-nowrap bg-green-600 hover:bg-green-500  shadow-green-500"
          )}
        >
          <span className="text-nowrap">
            Yishyuye {yishyuyeAngahe ? yishyuyeAngahe.toLocaleString() : 0} Rwf
          </span>
        </Badge>
      ) : (
        <Badge
          className={cn(
            "cursor-pointer text-stone-900 shadow-sm text-nowrap bg-red-600 hover:bg-red-500  shadow-red-500"
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

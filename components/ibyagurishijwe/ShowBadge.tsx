import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

export default function ShowBadge({
  productId,
  yishyuyeAngahe,
  yatwaye,
}: {
  productId: Id<"product">;
  yishyuyeAngahe: number;
  yatwaye: number;
}) {
  const product = useQuery(api.product.getProductById, { id: productId });
  console.log(product, "product");
  const ukonyigurishaKuriDetail = product?.ukonyigurishaKuriDetail as number;
  return (
    <div className="text-right">
      {" "}
      <Badge
        className={cn(
          "cursor-pointer text-stone-900 shadow-sm text-nowrap bg-red-600 hover:bg-red-500  rotate-2 shadow-red-500"
        )}
      >
        <span className="text-nowrap">
          Afite ideni{" "}
          {yishyuyeAngahe === 0
            ? ukonyigurishaKuriDetail * yatwaye
            : yishyuyeAngahe}{" "}
          Rwf
        </span>
      </Badge>
    </div>
  );
}

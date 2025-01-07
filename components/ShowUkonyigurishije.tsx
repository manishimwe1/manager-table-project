"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

const ShowUkonyigurishije = ({ productId }: { productId: Id<"product"> }) => {
  const product = useQuery(api.product.getProductById, { id: productId });

  if (!product) return;
  return <p className="text-nowrap">{product.ikiranguzo ?? 0} Rwf</p>;
};

export default ShowUkonyigurishije;

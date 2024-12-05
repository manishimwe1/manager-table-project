"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

const ShowUkonyigurishije = ({ productId }: { productId: Id<"product"> }) => {
  const product = useQuery(api.product.getProductById, { id: productId });

  if (!product) return;
  return <p>{product.ikiranguzo}</p>;
};

export default ShowUkonyigurishije;

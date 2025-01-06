import React from "react";
import { AlertDialogTitle } from "../ui/alert-dialog";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const AlertHearder = ({ id }: { id: Id<"product"> }) => {
  const updatePayedProduct = useMutation(api.product.updateProduct);
  const product = useQuery(api.product.getProductById, { id: id });
  console.log(product, "product");

  return (
    <div>
      <AlertDialogTitle className="text-gray-400 text-sm">
        Hey ✋, wari wishyuye{" "}
        <span className="text-lg text-blue-700 font-bold underline underline-offset-4">
          {product?.inganoYizoNishyuye} {product?.igicuruzwa}
        </span>{" "}
        urangura.
      </AlertDialogTitle>
    </div>
  );
};

export default AlertHearder;

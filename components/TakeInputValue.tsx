import React, { useState, useCallback, useEffect } from "react";
import { Input } from "./ui/input";
import { useClientInfoStore } from "@/lib/store/zustand";
import { Id } from "@/convex/_generated/dataModel";
import { TableRowType } from "@/types";
import { Row } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

const TakeInputValue = ({
  ukonyigurishaKuriDetail,
  activeRow,
  ingano,
  className,
  byoseHamwe,
  productType,
  id,
  igicuruzwa,
  customerName, // Add this new prop
}: {
  ukonyigurishaKuriDetail: number;
  id: Id<"product">;
  ingano: number;
  activeRow: Row<TableRowType>;
  className: string;
  byoseHamwe: number;
  productType: string;
  igicuruzwa: string;
  customerName: string; // Add this new prop type
}) => {
  const session = useSession();
  const userId = session.data?.user;
  const { toast } = useToast();
  const user = useQuery(api.user.getUserIndb, { email: userId?.email || "" });
  const [localInputValue, setLocalInputValue] = useState<string>("");
  const [localCalculatedValue, setLocalCalculatedValue] = useState<number>(0);

  const { name, factureNumber, updateProduct, productData } =
    useClientInfoStore();

  const addDraftPurchase = useMutation(api.draftPurchace.createPurchase);
  const getDraftPurchases = useQuery(api.draftPurchace.getDraftPurchase, {
    name: customerName, // Use customerName instead of global name
    factureNumber: factureNumber,
  });

  // Modified to use customerName in the check
  const findExistingDraft = useCallback(() => {
    if (!getDraftPurchases || !igicuruzwa || !id) return null;

    return getDraftPurchases.find(
      (product) =>
        product.igicuruzwa === igicuruzwa &&
        product.productId === id &&
        product.name === customerName // Add this check
    );
  }, [getDraftPurchases, igicuruzwa, id, customerName]);

  useEffect(() => {
    const existingProduct =
      getDraftPurchases?.find(
        (product) =>
          product.igicuruzwa === igicuruzwa &&
          product.productId === id &&
          product.name === customerName // Add this check
      ) || null;

    if (existingProduct?.aratwaraZingahe != null) {
      setLocalInputValue(existingProduct.aratwaraZingahe.toString());
      setLocalCalculatedValue(
        existingProduct.aratwaraZingahe * ukonyigurishaKuriDetail
      );
    } else {
      setLocalInputValue("");
      setLocalCalculatedValue(0);
    }
  }, [
    getDraftPurchases,
    igicuruzwa,
    id,
    ukonyigurishaKuriDetail,
    customerName,
  ]);
  // Add customerName dependency

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      if (Number(newValue) < 0 || isNaN(Number(newValue))) {
        return;
      }

      setLocalInputValue(newValue);
      activeRow.toggleSelected(true);

      const numericValue = Number(newValue);
      const total = numericValue * ukonyigurishaKuriDetail;
      setLocalCalculatedValue(total);
    },
    [activeRow, ukonyigurishaKuriDetail]
  );

  const handleBlur = useCallback(() => {
    if (!localInputValue.trim()) {
      setLocalInputValue("");
      return;
    }

    if (
      !ukonyigurishaKuriDetail ||
      !byoseHamwe ||
      !productType ||
      !ingano ||
      !customerName // Check customerName instead of name
    ) {
      toast({
        description: "Missing required product details",
        variant: "destructive",
      });
      return;
    }

    const numericValue = Number(localInputValue);
    const total = numericValue * ukonyigurishaKuriDetail;

    const existingProduct = productData.find(
      (product) => product.id === id && name === customerName // Add customer check
    );

    if (existingProduct) {
      updateProduct(id, {
        aratwaraZingahe: numericValue,
        yishyuyeAngahe: total,
      });
    } else {
      const purchaseNumber = Math.floor(Math.random() * 1000000000);
      addDraftPurchase({
        purchaseNumber,
        name: customerName ?? "", // Use customerName here
        factureNumber,
        productId: id,
        byoseHamwe,
        productType,
        ingano,
        aratwaraZingahe: numericValue,
        yishyuyeAngahe: total,
        igicuruzwa,
        ukonyigurishaKuriDetail,
        userId: user?._id as Id<"user">,
      });
    }
  }, [
    localInputValue,
    ukonyigurishaKuriDetail,
    byoseHamwe,
    productType,
    ingano,
    id,
    productData,
    addDraftPurchase,
    updateProduct,
    user?._id,
    customerName, // Replace name with customerName
    factureNumber,
    igicuruzwa,
    toast,
  ]);

  return (
    <Input
      className={cn(
        "px-1 placeholder:text-xs border-stone-900 dark:border-stone-500",
        className
      )}
      type="number"
      value={localInputValue}
      onChange={handleInputChange}
      onBlur={handleBlur}
      min={0}
      placeholder="0"
    />
  );
};

export default React.memo(TakeInputValue);

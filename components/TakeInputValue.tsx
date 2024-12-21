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
}: {
  ukonyigurishaKuriDetail: number;
  id: Id<"product">;
  ingano: number;
  activeRow: Row<TableRowType>;
  className: string;
  byoseHamwe: number;
  productType: string;
  igicuruzwa: string;
}) => {
  const session = useSession();
  const userId = session.data?.user;
  const { toast } = useToast();
  // Fetch all queries (hooks must always be called)
  const user = useQuery(api.user.getUserIndb, { email: userId?.email || "" });
  const [inputValue, setInputValue] = useState<string | number>(""); // Local state for input value
  const [calculatedValue, setCalculatedValue] = useState<number>(0); // Computed value for display

  const { name, factureNumber, updateProduct, productData } =
    useClientInfoStore();

  const addDraftPurchase = useMutation(api.draftPurchace.createPurchase);
  const getDraftPurchases = useQuery(api.draftPurchace.getDraftPurchase, {
    name: name,
    factureNumber: factureNumber,
  });
  console.log(getDraftPurchases);

  // Pre-fill input value if product already exists
  useEffect(() => {
    const existingProduct = productData.find((product) => product.id === id);
    if (existingProduct) {
      setInputValue(existingProduct.aratwaraZingahe || ""); // Pre-fill aratwaraZingahe value
    }
  }, [id, productData]);

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      activeRow.toggleSelected(true);

      const numericValue = Number(newValue);
      const total = numericValue * ukonyigurishaKuriDetail;
      setCalculatedValue(total);
    },
    [activeRow, ukonyigurishaKuriDetail]
  );

  // Handle input blur (save or update product)
  const handleBlur = useCallback(() => {
    if (
      !ukonyigurishaKuriDetail ||
      !byoseHamwe ||
      !productType ||
      !ingano ||
      !name
    ) {
      toast({
        description: `Missing required product details ${ukonyigurishaKuriDetail},
        ${byoseHamwe},
        ${productType},
        ${ingano},
      }`,
        variant: "destructive",
      });
      return;
    }

    const numericValue = Number(inputValue);
    const total = numericValue * ukonyigurishaKuriDetail;

    const existingProduct = productData.find((product) => product.id === id);

    if (existingProduct) {
      // Update the existing product
      updateProduct(id, {
        aratwaraZingahe: numericValue,
        yishyuyeAngahe: total,
      });
      setInputValue("");
    } else {
      // Add a new product with activeRow info
      const purchaseNumber = Math.floor(Math.random() * 1000000000);
      addDraftPurchase({
        purchaseNumber,
        name,
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
      setInputValue("");
    }
    setCalculatedValue(total);
  }, [
    inputValue,
    ukonyigurishaKuriDetail,
    byoseHamwe,
    productType,
    ingano,
    id,
    productData,
    addDraftPurchase,
    updateProduct,
    user,
  ]);

  return (
    <Input
      className={cn(
        "px-1 placeholder:text-xs border-stone-900 dark:border-stone-500",
        className
      )}
      type="number"
      value={inputValue}
      required
      onChange={handleInputChange}
      onBlur={handleBlur}
      min={0}
    />
  );
};

export default React.memo(TakeInputValue);

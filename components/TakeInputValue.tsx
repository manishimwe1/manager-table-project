import React, {
  useState,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { Input } from "./ui/input";
import { useClientInfoStore } from "@/lib/store/zustand";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

const TakeInputValue = ({
  setActiveRow,
  productType,
  id,
  ukonyigurishaKuriDetail,
  byoseHamwe,
  ingano,
  igicuruzwa,
  draftPurchase,
  draftId,
}: {
  id: Id<"product">;
  setActiveRow: Dispatch<SetStateAction<boolean>>;
  productType: string;
  ukonyigurishaKuriDetail: number;
  byoseHamwe: number;
  ingano: number;
  igicuruzwa: string;
  draftPurchase?: { aratwaraZingahe: number } | null; // Pass draftPurchase individually
  draftId: Id<"draftPurchase"> | null;
}) => {
  const session = useSession();
  const userId = session.data?.user;
  const { toast } = useToast();
  const user = useQuery(api.user.getUserIndb, { email: userId?.email || "" });

  const [localInputValue, setLocalInputValue] = useState<string>(
    draftPurchase?.aratwaraZingahe?.toString() || ""
  );
  const [localCalculatedValue, setLocalCalculatedValue] = useState<number>(
    draftPurchase ? draftPurchase.aratwaraZingahe * ukonyigurishaKuriDetail : 0
  );

  const { name, factureNumber, updateProduct, productData, isSubmitting } =
    useClientInfoStore();

  const addDraftPurchase = useMutation(api.draftPurchace.createPurchase);
  const draftPurchased = useQuery(api.draftPurchace.getDraftPurchase, {
    name, // Use customerName instead of global name
    factureNumber: factureNumber,
  });
  const updateDraftPurchase = useMutation(
    api.draftPurchace.updateDraftPurchase
  );
  useEffect(() => {
    if (isSubmitting === true) {
      setLocalInputValue("");
    }
  }, [isSubmitting]);
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      if (Number(newValue) < 0 || isNaN(Number(newValue))) {
        return;
      }

      setLocalInputValue(newValue);
      setActiveRow(true);

      const numericValue = Number(newValue);
      const total = numericValue * ukonyigurishaKuriDetail;
      setLocalCalculatedValue(total);
    },
    [setActiveRow, ukonyigurishaKuriDetail]
  );

  const handleBlur = useCallback(() => {
    if (!ukonyigurishaKuriDetail || !name) {
      toast({
        description: "Missing required product details",
        variant: "destructive",
      });
      return;
    }

    const total = Number(localInputValue) * ukonyigurishaKuriDetail;

    const fields = {
      aratwaraZingahe: Number(localInputValue),
      yishyuyeAngahe: total,
    };

    // if (draftPurchased) {
    // updateDraftPurchase({
    //   id: id,
    //   fields,
    // });
    // } else {
    const purchaseNumber = Math.floor(Math.random() * 1000000000);
    addDraftPurchase({
      purchaseNumber,
      name: name ?? "",
      factureNumber,
      productId: id,
      byoseHamwe,
      productType,
      ingano,
      aratwaraZingahe: Number(localInputValue),
      yishyuyeAngahe: total,
      igicuruzwa,
      ukonyigurishaKuriDetail,
      userId: user?._id as Id<"user">,
    });
  }, [
    localInputValue,
    ukonyigurishaKuriDetail,
    name,
    addDraftPurchase,
    updateProduct,
    productData,
    id,
    factureNumber,
    byoseHamwe,
    productType,
    ingano,
    igicuruzwa,
    user?._id,
    toast,
  ]);

  return (
    <Input
      className={cn(
        "px-1 placeholder:text-xs border-stone-900 dark:border-stone-500"
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

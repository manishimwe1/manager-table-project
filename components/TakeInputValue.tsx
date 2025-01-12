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
import { ProductType } from "@/types";
import { Plus } from "lucide-react";

const TakeInputValue = ({
  setActiveRow,
  productType,
  id,
  ukonyigurishaKuriDetail,
  byoseHamwe,
  ingano,
  igicuruzwa,
  draftPurchase,
  loading,
  data,
}: {
  id: Id<"product">;
  setActiveRow: Dispatch<SetStateAction<boolean>>;
  productType: string;
  ukonyigurishaKuriDetail: number;
  data: ProductType[] | undefined;
  byoseHamwe: number;
  ingano: number;
  igicuruzwa: string;
  draftPurchase?: { aratwaraZingahe: number } | null;
  loading: boolean;
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

  const {
    name,
    factureNumber,
    updateProduct,
    productData,
    isSubmitting,
    addProduct,
    removeProduct,
  } = useClientInfoStore();

  const MAX_VALUE =
    productType === "Ikesi x 20" || productType === "Ikesi x 12"
      ? data?.find((product) => product._id === id)?.byoseHamwe
      : data?.find((product) => product._id === id)?.ingano;

  useEffect(() => {
    if (loading === true) {
      setLocalInputValue("");
      setLocalCalculatedValue(0);
    }
  }, [loading]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      setLocalInputValue(newValue);
      setLocalCalculatedValue(Number(newValue) * ukonyigurishaKuriDetail);
      setActiveRow(true);
    },
    [setActiveRow, ukonyigurishaKuriDetail, name, toast]
  );

  const handleBlur = useCallback(() => {
    if (
      !ukonyigurishaKuriDetail ||
      name === "" ||
      Number(localInputValue) <= 0
    ) {
      toast({
        description: "Shyiramo izina ry'umukiriya cg atwaye zingahe",
        variant: "destructive",
      });
      setLocalInputValue("");
      productData.find((product) => {
        if (product.productId === id) {
          removeProduct(product.productId);
        }
      });
      return;
    }
    if (MAX_VALUE) {
      if (Number(localInputValue) > MAX_VALUE) {
        toast({
          description: " Ooops!!... ibyo atwaye biruta ibiri muri stock ",
          variant: "destructive",
        });
        setLocalInputValue("");
        productData.find((product) => {
          if (product.productId === id) {
            removeProduct(product.productId);
          }
        });
        return;
      }
    }
    const total = Number(localInputValue) * ukonyigurishaKuriDetail;

    const fields = {
      aratwaraZingahe: Number(localInputValue),
      yishyuyeAngahe: total,
    };

    const existingProduct = productData.find(
      (product) => product.productId === id
    );

    if (existingProduct) {
      console.log("existingProduct", existingProduct);

      updateProduct(id, fields);
    }
    addProduct({
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
    addProduct,
    id,
    byoseHamwe,
    productType,
    ingano,
    igicuruzwa,
    user?._id,
    toast,
  ]);

  return (
    <div
      className={cn(
        "px-1 placeholder:text-xs border-stone-900 dark:border-stone-500 w-[100px] overflow-hidden flex items-center justify-between border rounded-md relative"
      )}
    >
      <Input
        className={cn(
          "px-1 focus-visible:border-none focus:ring-0 focus:outline-none w flex-1 border-none focus-visible:ring-0"
        )}
        type="number"
        value={localInputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        min={0}
        max={MAX_VALUE}
        placeholder="0"
      />
      <Plus className="h-5 w-5 absolute right-1.5 top-[50%] translate-y-[-50%] hover:scale-110 cursor-pointer border dark:bg-stone-700 rounded-md" />
    </div>
  );
};

export default React.memo(TakeInputValue);

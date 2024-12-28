"use client";
import { api } from "@/convex/_generated/api";
import { useClientInfoStore } from "@/lib/store/zustand";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import MemoizedScrollArea from "@/components/SellingItemComp";
import { Id } from "@/convex/_generated/dataModel";

const SellingButton = ({
  name,
  factureNumber,
  loading,
  setLoading,
  setIsOpen,
  isOpen,
}: {
  name: string;
  factureNumber: number;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const { productData, removeProduct, phone, setName } = useClientInfoStore();
  const { toast } = useToast();
  const session = useSession();
  const userId = session.data?.user;

  if (!userId) return null;

  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  const user = useQuery(api.user.getUserIndb, { email: userId?.email! });
  const newClient = useMutation(api.clientName.createClient);
  const draftPurchases = useQuery(api.draftPurchace.getDraftPurchase, {
    name,
    factureNumber,
  });
  const draftPurchaseForMe = useQuery(api.draftPurchace.getDraftPurchaseForMe, {
    userId: user?._id as Id<"user">,
  });

  console.log(productData, "productData");
  const handleSales = async (value: string) => {
    try {
      if (name === "")
        return toast({
          title: "Shyirano izina ry'umukiriya",
          variant: "destructive",
        });

      if (productData.length === 0) {
        return toast({
          title: "Garagaza ibya atwaye",
          variant: "destructive",
        });
      }

      setLoading(true);

      const facture = Math.floor(Math.random() * 1000000);
      for (const product of productData) {
        await newClient({
          name,
          facture,
          userId: user?._id as Id<"user">,
          productId: product.productId,
          productType: product.productType,
          phone: phone,
          aratwaraZingahe: product.aratwaraZingahe,
          yishyuyeAngahe: product.yishyuyeAngahe,
          yishyuye: value === "Yego" ? true : false,
        });
      }

      toast({
        title: `Ugurishije kuri ${name}`,
        variant: "success",
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error processing sale:", error);
      toast({
        title: "Error occurred while processing sale",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full flex items-center justify-center gap-2 flex-col">
      <div className="h-[200px] w-full lg:w-full rounded-md dark:!bg-stone-950 !shadow-md shadow-stone-950s p-4 flex items-center justify-between">
        <div className="flex items-start flex-col gap-2 w-full h-full ">
          <p className="dark:text-gray-500">
            Name:
            <span className="dark:text-gray-300 text-lg text-stone-900 capitalize">
              {name}
            </span>
          </p>
          <p className="dark:text-gray-500">
            Phone:
            <span className="dark:text-gray-300 text-lg text-stone-900 capitalize">
              {factureNumber}
            </span>
          </p>
          {isOpen ? (
            <form className="flex w-full h-full justify-end place-items-end ">
              <Button
                disabled={loading}
                type="button"
                onClick={() => {
                  handleSales("Yego");
                }}
                className="boder-customer border-t-2 !border-blue-500 hover:!text-blue-600 hover:dark:!bg-stone-950 transition-all duration-200 ease-in-out hover:!shadow-blue-500/50"
              >
                <span>Arishyuye</span>
              </Button>
              <Button
                disabled={loading}
                type="button"
                onClick={() => handleSales("Oya")}
                className="boder-customer border-t-2 !border-red-500 hover:!text-red-600 hover:dark:!bg-stone-950 transition-all duration-200 ease-in-out hover:!shadow-red-500/50"
              >
                <span>Afashe ideni</span>
              </Button>
            </form>
          ) : (
            <div className="w-full h-full flex justify-end items-end">
              <div
                className="mt-4 w-fit h-fit p-2 text-stone-950 border-t-2 border-gray-200 bg-gray-100 shadow-md rounded-lg dark:bg-stone-900 dark:text-gray-200 cursor-pointer text-nowrap "
                onClick={() => {
                  setName("");
                  setLoading(false);
                  setIsOpen(true);
                  productData.forEach((product) =>
                    removeProduct(product.productId)
                  );
                }}
              >
                Ongera Umukiriya
              </div>
            </div>
          )}
        </div>
        <MemoizedScrollArea factureNumber={factureNumber} loading={loading} />
      </div>
    </div>
  );
};

export default SellingButton;

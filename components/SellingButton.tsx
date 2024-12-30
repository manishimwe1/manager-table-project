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
  loading,
  setLoading,
  setIsOpen,
  isOpen,
}: {
  name: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const { productData, phone, setName } = useClientInfoStore();
  const { toast } = useToast();
  const session = useSession();
  const userId = session.data?.user;

  if (!userId) return null;

  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  const user = useQuery(api.user.getUserIndb, { email: userId?.email! });
  const newClient = useMutation(api.clientName.createClient);

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

      if (value === "Oya") {
        if (phone === 0)
          return toast({
            title: "Shyirano phone y'umukiriya kubera atwaye ideni",
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
      {productData.length > 0 ? (
        <div className=" h-full w-full rounded-md dark:!bg-stone-950 !shadow-md shadow-stone-950s lg:p-4 p-2 flex items-center justify-between  flex-col-reverse lg:flex-row">
          <MemoizedScrollArea
            loading={loading}
            productData={productData}
            handleSales={handleSales}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            setLoading={setLoading}
          />
        </div>
      ) : null}
    </div>
  );
};

export default SellingButton;

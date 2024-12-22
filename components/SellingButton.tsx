"use client";
import { api } from "@/convex/_generated/api";
import { useClientInfoStore } from "@/lib/store/zustand";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { ScrollArea } from "./ui/scroll-area";

// Define props interface

const SellingButton = ({
  name,
  factureNumber,
}: {
  name: string;
  factureNumber: number;
}) => {
  const router = useRouter();
  const [ideni, setIdeni] = useState<"Yego" | "Oya" | undefined>();
  const [loading, setLoading] = useState(false);

  const { setReset, productData, setIsSubmitting } = useClientInfoStore();
  const session = useSession();
  const userId = session.data?.user;
  if (!userId) return;
  const { toast } = useToast();

  const user = useQuery(api.user.getUserIndb, { email: userId?.email! });

  const newClient = useMutation(api.clientName.createClient);
  const draftPurchases = useQuery(api.draftPurchace.getDraftPurchase, {
    name, // Use customerName instead of global name
    factureNumber: factureNumber,
  });
  console.log("DraftPurchasessellng", { factureNumber, name });
  const handleSales = (value: string) => {
    productData.forEach((product) => {
      const inStock =
        product.productType === "Ikesi x 20" ||
        product.productType === "Ikesi x 12"
          ? product.byoseHamwe
          : product.ingano;

      if (product.aratwaraZingahe > inStock) {
        setIsSubmitting(true);
        setLoading(false);
        return toast({
          title: "Ushyizemo ibicuruzwa byinshi kuruta ibiri muri stock",
          variant: "destructive",
        });
      }

      if (value === "Yego" && product.aratwaraZingahe) {
        setIdeni("Yego");
        newClient({
          productId: product.id,
          userId: user?._id!,
          name,
          phone: factureNumber ?? 0,
          aratwaraZingahe: product.aratwaraZingahe,
          yishyuyeAngahe: product.yishyuyeAngahe,
          nideni: false,
          productType: product.productType,
        });
        setLoading(false);
        // activeRow.toggleSelected(false);
        toast({
          title: `Ugurishije kuri ${name ?? "unknown"}`,
          variant: "success",
        });
      } else if (
        value === "Oya" &&
        product.aratwaraZingahe &&
        name !== "" &&
        factureNumber !== 0
      ) {
        setIdeni("Oya");

        newClient({
          userId: user?._id!,
          productId: product.id,
          name,
          phone: factureNumber,
          aratwaraZingahe: product.aratwaraZingahe,
          yishyuyeAngahe: product.yishyuyeAngahe,
          nideni: true,
          productType: product.productType,
        });
        setLoading(false);
        // activeRow.toggleSelected(false);
        toast({
          title: `Ugurishije kuri ${name ?? "unknown"}`,
          variant: "success",
        });
      } else {
        setIsSubmitting(true);
        setLoading(false);
        toast({
          title:
            "Garagaza ibyo atwaye cg Izina na Telephone by' umukiriya kubera afashe ideni",
          variant: "destructive",
        });
        return;
      }
    });

    productData.forEach((product) => {
      product.activeRow.toggleSelected(false);
    });
    setReset();
  };

  return (
    <div className="w-full flex items-center justify-center gap-2 flex-col">
      <div className="h-[200px] w-full lg:w-full rounded-md   dark:!bg-stone-950 !shadow-md shadow-stone-950s p-4 flex flex-col lg:flex-row items-center justify-between ">
        <div className="flex items-start flex-col gap-2 w-full  h-full">
          <p>
            Name:
            <span className="dark:text-gray-400 text-lg text-stone-900 capitalize">
              {name}
            </span>
          </p>
          <p>
            Phone:
            <span className="dark:text-gray-400 text-lg text-stone-900 capitalize">
              {name}
            </span>
          </p>
        </div>
        <ScrollArea className="h-[184px] w-full rounded-md px-2ed  lg:p-4 border dark:border-stone-900">
          {draftPurchases ? (
            draftPurchases.map((purchase) => (
              <div className="flex w-full gap-4 py-2" key={purchase._id}>
                <div className="flex gap-2 w-full ">
                  <p key={purchase._id}>{purchase.igicuruzwa}</p>
                  <p>{purchase.aratwaraZingahe}</p>
                </div>
                <p>{purchase.yishyuyeAngahe}</p>
              </div>
            ))
          ) : (
            <Loader2 className="animate-spin h-2 w-2" />
          )}
        </ScrollArea>
      </div>

      <div className="flex items-center gap-2 justify-between md:justify-around w-full">
        <form className="flex">
          <Button
            disabled={loading}
            type="button"
            onClick={() => {
              handleSales("Yego");
            }}
            className="boder-customer border-t-2 !border-blue-500 hover:!text-blue-600 hover:dark:!bg-stone-950 transition-all duration-200 ease-in-out hover:!shadow-blue-500/50"
          >
            {loading ? (
              <Loader2 className="animate-spin h-2 w-2" />
            ) : (
              <span>Arishyuye</span>
            )}
          </Button>
          <Button
            disabled={loading}
            type="button"
            onClick={() => handleSales("Oya")}
            className="boder-customer border-t-2 !border-red-500 hover:!text-red-600 hover:dark:!bg-stone-950 transition-all duration-200 ease-in-out hover:!shadow-red-500/50"
          >
            {loading ? (
              <Loader2 className="animate-spin h-2 w-2" />
            ) : (
              <span>Afashe ideni</span>
            )}
          </Button>
        </form>
        <div className="flex justify-end">
          <Button
            disabled={loading}
            type="button"
            onClick={() => {
              handleSales("Yego");
            }}
            className="boder-customer border-t-2 !border-gray-500 hover:!text-gray-50 hover:dark:!bg-stone-950 transition-all duration-200 ease-in-out hover:!shadow-gray-500/50"
          >
            {loading ? (
              <Loader2 className="animate-spin h-2 w-2" />
            ) : (
              <span>Sohora Factire</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SellingButton;

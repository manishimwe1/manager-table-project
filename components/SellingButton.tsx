"use client";
import { api } from "@/convex/_generated/api";
import { useClientInfoStore } from "@/lib/store/zustand";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { ScrollArea } from "./ui/scroll-area";
import MemoizedScrollArea from "@/components/SellingItemComp";
import { Id } from "@/convex/_generated/dataModel";
import { DraftPurchaseType } from "@/types";
interface CustomerInfo {
  name: string;
  factureNumber: number;
  drafts?: any[];
}

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
  const [customerData, setCustomerData] = useState<CustomerInfo[]>([]);
  const [draftPurchaceForClient, setDraftPurchaceForClient] = useState<
    DraftPurchaseType[] | undefined
  >();
  const prevPropsRef = useRef({ name: "", factureNumber: 0 });

  const { setReset, productData, setIsSubmitting } = useClientInfoStore();
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
  // Effect to accumulate customer data
  useEffect(() => {
    const draftPurchaceForClient = draftPurchaseForMe?.filter(
      (purchase) =>
        purchase.factureNumber === factureNumber && purchase.name === name
    );

    if (draftPurchaceForClient) {
      setDraftPurchaceForClient(draftPurchaceForClient);
    }
    const prevProps = prevPropsRef.current;

    console.log(
      "Current Draft Purchases For client_____:",
      draftPurchaceForClient
    );
    // Only update if props have changed
    if (name !== prevProps.name || factureNumber !== prevProps.factureNumber) {
      if (draftPurchases) {
        setCustomerData((prev) => {
          // Check if this customer already exists
          const existingIndex = prev.findIndex(
            (c) => c.name === name && c.factureNumber === factureNumber
          );

          if (existingIndex === -1) {
            // Add new customer while keeping all previous ones
            return [
              ...prev,
              {
                name,
                factureNumber,
                drafts: draftPurchases,
              },
            ];
          } else {
            // Update existing customer's drafts while keeping others
            return prev.map((customer, index) =>
              index === existingIndex
                ? { ...customer, drafts: draftPurchases }
                : customer
            );
          }
        });
      }

      // Update previous props reference
      prevPropsRef.current = { name, factureNumber };
    }
  }, [name, factureNumber, draftPurchases]);

  // Debug logging
  useEffect(() => {
    console.log("All Customer Data:", customerData);
    console.log("Current Props:", { name, factureNumber });
    console.log("Current Draft Purchases:", draftPurchases);
    console.log("Current Draft Purchases For me:", draftPurchaseForMe);
  }, [customerData, name, factureNumber, draftPurchases]);

  const getCurrentCustomer = () => {
    return customerData.find(
      (customer) =>
        customer.name === name && customer.factureNumber === factureNumber
    );
  };

  // Rest of the component remains the same, just update the handleSales function:
  const handleSales = async (value: string) => {
    setLoading(true);
    try {
      let hasError = false;

      for (const product of productData) {
        const inStock =
          product.productType === "Ikesi x 20" ||
          product.productType === "Ikesi x 12"
            ? product.byoseHamwe
            : product.ingano;

        if (product.aratwaraZingahe > inStock) {
          setIsSubmitting(true);
          toast({
            title: "Ushyizemo ibicuruzwa byinshi kuruta ibiri muri stock",
            variant: "destructive",
          });
          hasError = true;
          break;
        }
      }

      if (hasError) {
        setLoading(false);
        return;
      }

      // Process sales for each product
      for (const product of productData) {
        if (product.aratwaraZingahe) {
          const isCredit = value === "Oya";
          await newClient({
            userId: user?._id!,
            productId: product.id,
            name,
            phone: factureNumber,
            aratwaraZingahe: product.aratwaraZingahe,
            yishyuyeAngahe: product.yishyuyeAngahe,
            nideni: isCredit,
            productType: product.productType,
          });

          product.activeRow.toggleSelected(false);
        }
      }

      // Remove only the current customer after successful sale
      setCustomerData((prev) =>
        prev.filter(
          (customer) =>
            customer.name !== name || customer.factureNumber !== factureNumber
        )
      );

      setIdeni(value as "Yego" | "Oya");
      toast({
        title: `Ugurishije kuri ${name}`,
        variant: "success",
      });
      setReset();
    } catch (error) {
      console.error("Error processing sale:", error);
      toast({
        title: "Error occurred while processing sale",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const currentCustomer = getCurrentCustomer();

  // Rest of the JSX remains the same...
  return (
    <div className="w-full flex items-center justify-center gap-2 flex-col">
      <div className="h-[200px] w-full lg:w-full rounded-md dark:!bg-stone-950 !shadow-md shadow-stone-950s p-4 flex items-center justify-between">
        <div className="flex items-start flex-col gap-2 w-full h-full">
          <p>
            Facture Number:
            <span className="dark:text-gray-400 text-lg text-stone-900 capitalize">
              {currentCustomer?.factureNumber || factureNumber}
            </span>
          </p>
          <p>
            Name:
            <span className="dark:text-gray-400 text-lg text-stone-900 capitalize">
              {currentCustomer?.name || name}
            </span>
          </p>
          <p>
            Phone:
            <span className="dark:text-gray-400 text-lg text-stone-900 capitalize">
              {currentCustomer?.factureNumber || factureNumber}
            </span>
          </p>
        </div>
        <MemoizedScrollArea draftPurchase={draftPurchaceForClient} />
      </div>

      <div className="flex items-center gap-2 justify-between md:justify-around w-full">
        <form className="flex">
          <Button
            disabled={loading}
            type="button"
            onClick={() => handleSales("Yego")}
            className="boder-customer border-t-2 !border-blue-500 hover:!text-blue-600 hover:dark:!bg-stone-950 transition-all duration-200 ease-in-out hover:!shadow-blue-500/50"
          >
            {loading ? (
              <Loader2 className="animate-spin h-4 w-4" />
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
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              <span>Afashe ideni</span>
            )}
          </Button>
        </form>
        <div className="flex justify-end">
          <Button
            disabled={loading}
            type="button"
            onClick={() => handleSales("Yego")}
            className="boder-customer border-t-2 !border-gray-500 hover:!text-gray-50 hover:dark:!bg-stone-950 transition-all duration-200 ease-in-out hover:!shadow-gray-500/50"
          >
            {loading ? (
              <Loader2 className="animate-spin h-4 w-4" />
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

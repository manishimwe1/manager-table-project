import { DraftPurchaseType } from "@/types";
import { ArrowUp01, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useClientInfoStore } from "@/lib/store/zustand";
import { ScrollArea } from "./ui/scroll-area";

interface SellingItemCompProps {
  factureNumber: number;
  loading: boolean;
}

const SellingItemComp = ({ factureNumber, loading }: SellingItemCompProps) => {
  const { draftPurchaseByClient, isSubmitting, resetClientData } =
    useClientInfoStore();
  const clientPurchases = draftPurchaseByClient[factureNumber] || [];

  useEffect(() => {
    if (isSubmitting === true) {
      resetClientData();
    }
    console.log(isSubmitting, "isSubmitting here!!");
  }, [isSubmitting]);
  console.log(isSubmitting, "isSubmitting here!!out");
  const total = clientPurchases.reduce((acc, purchase) => {
    // Check if yishyuyeAngahe exists and is a number
    const amount =
      typeof purchase.yishyuyeAngahe === "number" ? purchase.yishyuyeAngahe : 0;

    return acc + amount;
  }, 0);

  return (
    <div className="h-[180px] w-full   rounded-md flex flex-col dark:text-gray-200 ">
      <ScrollArea className="h-[250px] w-full">
        {clientPurchases.length === 0 ? (
          <div className="flex items-center justify-center h-full mt-4">
            <Loader2 className="animate-spin h-6 w-6" />
            <p>Gurasha ikintu...</p>
          </div>
        ) : (
          clientPurchases.map((purchase, index) => (
            <ScrollArea
              key={`${purchase.productId}+${index}`}
              className="!flex items-center !justify-between p-2 border-b w-full boder-customer dark:bg-stone-900/60 dark:!border-stone-700 border-t-2  "
            >
              <div className="flex gap-2 justify-between py-1 lg:py-2">
                <div className="flex items-start gap-4 ">
                  <p className="text-sm">{index + 1}.</p>
                  <p className="capitalize text-sm">{purchase.igicuruzwa}</p>
                  <p className="text-sm">{purchase.aratwaraZingahe}</p>
                </div>
                <p className="text-sm">{purchase.yishyuyeAngahe}</p>
              </div>
            </ScrollArea>
          ))
        )}
      </ScrollArea>
      <div className="flex justify-end items-center">
        <p>
          Total:{" "}
          <span className="text-lg text-blue-500 font-bold">
            {total.toLocaleString()}
          </span>{" "}
          Rwf
        </p>
        <Button
          disabled={loading}
          type="button"
          // onClick={() => handleSales("Yego")}
          className="boder-customer border-t-2 border-stone-900 dark:!border-gray-500 hover:!text-stone-700 hover:dark:!bg-stone-950 transition-all duration-200 ease-in-out hover:!bg-slate-50 hover:!shadow-gray-500/50 dark:!bg-stone-950"
        >
          {loading ? (
            <Loader2 className="animate-spin h-4 w-4" />
          ) : clientPurchases?.length === 0 ? (
            <span className="flex items-center">
              Gurisha{" "}
              <ArrowUp01 className="h-4 w-4 text-blue-500 animate-pulse" />
            </span>
          ) : (
            <span>Sohora Factire</span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SellingItemComp;

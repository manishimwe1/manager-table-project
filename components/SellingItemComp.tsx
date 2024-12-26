import { DraftPurchaseType } from "@/types";
import { ArrowUp01, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useClientInfoStore } from "@/lib/store/zustand";
import { ScrollArea } from "./ui/scroll-area";

interface SellingItemCompProps {
  factureNumber: number;
  loading: boolean;
}

const SellingItemComp = ({ factureNumber, loading }: SellingItemCompProps) => {
  const { draftPurchaseByClient } = useClientInfoStore();
  const clientPurchases = draftPurchaseByClient[factureNumber] || [];

  return (
    <div className="h-full w-full dark:bg-stone-900 rounded-md flex flex-col dark:text-gray-200 ">
      <ScrollArea className="h-[180px] w-full">
        {clientPurchases.length === 0 ? (
          <div className="flex items-center justify-center h-full mt-4">
            <Loader2 className="animate-spin h-6 w-6" />
            <p>Gurasha ikintu...</p>
          </div>
        ) : (
          clientPurchases.map((purchase, index) => (
            <ScrollArea
              key={`${purchase.productId}+${index}`}
              className="!flex items-center !justify-between p-2 border-b w-full  "
            >
              <div className="flex gap-2 justify-between">
                <p>{purchase.igicuruzwa}</p>
                <p>{purchase.aratwaraZingahe}</p>
                <p className="">{purchase.yishyuyeAngahe}</p>
              </div>
            </ScrollArea>
          ))
        )}
      </ScrollArea>
      <div className="flex justify-end">
        <Button
          disabled={loading}
          type="button"
          // onClick={() => handleSales("Yego")}
          className="boder-customer border-t-2 !border-gray-500 hover:!text-gray-50 hover:dark:!bg-stone-950 transition-all duration-200 ease-in-out hover:!shadow-gray-500/50 dark:!bg-stone-950"
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

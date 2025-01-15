import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ProductInfo, useClientInfoStore } from "@/lib/store/zustand";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";

interface SellingItemCompProps {
  loading: boolean;
  productData: ProductInfo[];
  handleSales: (value: string) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SellingItemComp = ({
  loading,
  handleSales,
  setLoading,
  setIsOpen,
  isOpen,
}: SellingItemCompProps) => {
  const {
    isSubmitting,
    resetClientData,
    productData,
    name,
    setName,
    setPhone,
    removeProduct,
  } = useClientInfoStore();

  useEffect(() => {
    if (loading === true) {
      resetClientData();
    }
  }, [isSubmitting]);
  const total = productData.reduce((acc, purchase) => {
    const amount =
      typeof purchase.yishyuyeAngahe === "number" ? purchase.yishyuyeAngahe : 0;

    return acc + amount;
  }, 0);

  return (
    <div className="max-h-[210px] h-full w-full   rounded-md flex flex-col dark:text-gray-200 !gap-2">
      {productData.length !== 0 && (
        <div className="flex items-center justify-between">
          <h2 className="flex items-start h-fit">
            Umukiriya: <span>{name}</span>
          </h2>
          <Button
            disabled={!loading}
            type="button"
            asChild
            // onClick={() => handleSales("Yego")}
            className="boder-customer border-l-2 border-stone-900 dark:!border-gray-500 hover:!text-stone-400 hover:dark:!bg-stone-900 transition-all duration-200 ease-in-out hover:!bg-slate-50 hover:!shadow-gray-500/50 dark:!bg-stone-900 disabled:cursor-not-allowed"
          >
            <Link href={``}>
              <span>Sohora Factire</span>
            </Link>
          </Button>
        </div>
      )}
      <ScrollArea className="h-[200px] w-full">
        {productData.length === 0 ? (
          <div className="flex items-center justify-center h-full mt-4">
            <p className="text-sm font-semibold text-stone-500">
              Gurisha ikintu...
            </p>
          </div>
        ) : (
          <>
            {productData.map((purchase, index) => (
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
            ))}
          </>
        )}
      </ScrollArea>
      <div className="flex justify-between items-center">
        <div className="flex items-center  gap-2 w-full h-full">
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
            <div className="w-full h-full flex justify-end items-center">
              <div
                className="mt-4 w-fit h-fit p-2 text-stone-950 border-t-2 border-gray-200 bg-gray-100 shadow-md rounded-lg dark:bg-stone-900 dark:text-gray-200 cursor-pointer text-nowrap text-sm "
                onClick={() => {
                  setName("");
                  setPhone(0);
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
        {productData?.length !== 0 && (
          <p className="text-nowrap">
            Total:{" "}
            <span className="text-lg text-blue-500 font-bold">
              {total.toLocaleString()}
            </span>{" "}
            Rwf
          </p>
        )}
      </div>
    </div>
  );
};

export default SellingItemComp;

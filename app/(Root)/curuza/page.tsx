"use client";

import CollapsibleComponents from "@/components/collapsibleComponents";
import DataTable from "@/components/DataTable";
import HeaderSection from "@/components/HeaderSection";
import Ibyagurishijwe from "@/components/Ibyagurishijwe";
import SellingButton from "@/components/SellingButton";
import SkeletonLoader from "@/components/SkeletonLoader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useToast } from "@/hooks/use-toast";
import { useClientInfoStore } from "@/lib/store/zustand";
import { formatToday, getTranslatedDay, groupByDateInSaled } from "@/lib/utils";
import { ProductType } from "@/types";
import { useQuery } from "convex/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { FocusEvent, useEffect, useState } from "react";

// Start with empty array instead of undefined data
const SalesPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const session = useSession();
  const { toast } = useToast();

  const {
    setName,
    name,
    setFactureNumber,
    factureNumber,
    clientData,
    addClientData,
    removeProduct,
    productData,
    isSubmitting,
  } = useClientInfoStore();
  const [nameInput, setNameInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const userId = session.data?.user;

  // Queries
  const user = useQuery(api.user.getUserIndb, {
    email: userId?.email || "",
  });

  const data: ProductType[] | undefined = useQuery(api.product.getProduct, {
    userId: user?._id as Id<"user">,
  });

  // Redirect unauthenticated users
  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/login");
    }
  }, [session.status, router]);
  useEffect(() => {
    if (data && data.length > 0) {
      addClientData(data);
    }
    if (isSubmitting === true) {
      setNameInput("");
    }
  }, [data, addClientData, isSubmitting]);

  console.log(productData, "productData");

  // Early return for loading and error states

  const handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    if (e.target.value === "") {
      toast({
        description: "Ooops!!... Ntazi ry'umukiriya washyizimo",
        variant: "destructive",
      });
      return;
    }
    setName(e.target.value);
    setFactureNumber(1);
    setNameInput("");
    setLoading(false);
    setIsOpen(true);

    productData.forEach((product) => removeProduct(product.productId));
  };
  return (
    <section className="flex flex-col w-full h-full lg:pl-0">
      {/* <HeaderSection
        title={`Urutonde rw'ibicuruzwa  ${getTranslatedDay(formatToday())}`}
        className="cursor-pointer"
      /> */}
      <div className="w-full h-fit  flex items-center justify-between gap-4">
        <div className="flex items-center w-full  justify-center h-full">
          <CollapsibleComponents
            title="Reba abakiriya buyumunsi"
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          >
            <div className="w-full h-full">
              {<Ibyagurishijwe userId={user?._id} />}
            </div>
          </CollapsibleComponents>
        </div>
      </div>

      {clientData.length === 0 ? (
        <div className="h-[200px] w-full px-1 lg:px-2 space-y-2">
          <div className="flex gap-1">
            <Skeleton className="h-[30px] w-[100px] rounded-md" />
            <Skeleton className="h-[30px] w-full" />
          </div>
          <Skeleton className="h-[200px] w-full" />
        </div>
      ) : (
        <div className="h-full w-full rounded-lg overflow-hidden px-1 lg:px-3 flex flex-col gap-4">
          <div className="flex items-center gap-4 w-full lg:w-1/2 px-2 lg:px-3">
            <Label
              className="text-stone-950 text-sm lg:text-lg border-r-2 px-3 py-1 border-gray-200 bg-gray-100 shadow-md shadow-white dark:shadow-black/70 rounded-lg dark:bg-stone-900 cursor-pointer dark:text-gray-200"
              htmlFor={`name`}
            >
              Umukiriya
            </Label>
            <Input
              id={`name`}
              className="w-full flex-1 bg-transparent border dark:border-stone-700 lg:border-2 outline-none focus:outline-none focus-visible:ring-2 placeholder:text-xs px-2 dark:text-gray-200"
              value={nameInput === "" ? name : nameInput}
              onChange={(e) => {
                setNameInput(e.target.value);
                setName(e.target.value);
              }}
              placeholder="Shyiramo umukiriya"
              onBlur={handleBlur}
            />
            {isOpen ? (
              <div className="w-fit h-fit boder-customer border-b-2 p-1 px-2 cursor-pointer">
                <ChevronDown
                  onClick={() => setIsOpen(false)}
                  className="h-4 w-4 text-gray-500 "
                />
              </div>
            ) : (
              <div className="w-fit h-fit boder-customer border-b-2 p-1 px-2 cursor-pointer">
                <ChevronUp
                  onClick={() => setIsOpen(true)}
                  className="h-4 w-4 text-gray-500 "
                />
              </div>
            )}
          </div>
          {isOpen && (
            <DataTable
              loading={loading}
              setLoading={setLoading}
              name={nameInput}
              factureNumber={factureNumber}
              data={data}
            />
          )}

          <SellingButton
            factureNumber={factureNumber}
            name={name}
            key={factureNumber}
            setLoading={setLoading}
            loading={loading}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          />
        </div>
      )}
    </section>
  );
};

export default SalesPage;

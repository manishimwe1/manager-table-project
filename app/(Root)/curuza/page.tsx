"use client";

import DataTable from "@/components/DataTable";
import Ibyagurishijwe from "@/components/Ibyagurishijwe";
import SellingButton from "@/components/SellingButton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useToast } from "@/hooks/use-toast";
import { useClientInfoStore } from "@/lib/store/zustand";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types";
import { useQuery } from "convex/react";
import { ChevronDown, ChevronsDownUp, ChevronUp, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FocusEvent, useEffect, useMemo, useState } from "react";

// Start with empty array instead of undefined data
const SalesPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const session = useSession();
  const { toast } = useToast();

  const {
    setName,
    name,
    setPhone,
    factureNumber,
    clientData,
    addClientData,
    removeProduct,
    productData,
    isSubmitting,
    phone,
  } = useClientInfoStore();
  const [nameInput, setNameInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const userId = session.data?.user;

  // Queries
  const user = useQuery(api.user.getUserIndb, {
    email: userId?.email || "",
  });

  const data: ProductType[] | undefined = useQuery(api.product.getProduct, {
    userId: user?._id as Id<"user">,
  });

  const client = useQuery(api.clientName.getClietFromDB, {
    userId: user?._id as Id<"user">,
  });

  const filteredData = useMemo(() => {
    if (!searchValue) return [];
    return client?.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, client]);
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

  const timeoutId = setTimeout(() => {
    setSearchValue("");
    clearTimeout(timeoutId);
  }, 5000);
  const handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    if (e.target.value === "") {
      toast({
        description: "Ooops!!... Ntazi ry'umukiriya washyizimo",
        variant: "destructive",
      });
      return;
    }
    setName(e.target.value);
    setPhone(phone);
    setNameInput("");
    setLoading(false);
    setIsOpen(true);
    setIsListOpen(false);

    productData.forEach((product) => removeProduct(product.productId));
  };
  return (
    <section className="flex flex-col w-full h-full lg:pl-0 space-y-4 md:space-y-8">
      <div className="w-full h-fit  flex items-center justify-between gap-4">
        <div className="flex items-center w-full  justify-center h-full ">
          <Collapsible
            open={isListOpen}
            onOpenChange={(e) => {
              setIsListOpen(e);
              setIsOpen(false);
            }}
            className="w-full"
          >
            <CollapsibleTrigger
              className={cn(
                "flex items-center justify-between w-full text-lg text-balance border-b-2 border-blue-200 dark:border-stone-700 shadow-sm text-gray-800 dark:text-gray-200 shadow-background py-2 px-3 rounded-xl bg-background  dark:shadow-black/70"
              )}
            >
              Reba abakiriya buyumunsi
              <ChevronsDownUp
                className={cn(
                  "text-gray-800 dark:text-gray-200 transition-transform"
                )}
              />
            </CollapsibleTrigger>
            {isListOpen && (
              <CollapsibleContent className="flex flex-col rounded-lg mt-4">
                <div className="w-full h-full">
                  {<Ibyagurishijwe userId={user?._id} />}
                </div>
              </CollapsibleContent>
            )}
          </Collapsible>
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
        <div className="h-full w-full rounded-lg overflow-hidden px-1 lg:px-3 flex flex-col gap-4 lg:gap-10">
          <div className="flex items-center lg:flex-row justify-between w-full px-2 lg:px-3">
            <div className="flex flex-col lg:flex-row justify-between w-full  gap-2 lg:gap-10">
              <div className="flex items-center gap-4 w-full ">
                <Label
                  className="text-stone-950 text-sm lg:text-lg border-r-2 px-3 py-1 border-gray-200 bg-gray-100 shadow-md shadow-white dark:shadow-black/70 rounded-lg dark:bg-stone-900 cursor-pointer dark:text-gray-200"
                  htmlFor={`name`}
                >
                  Umukiriya
                </Label>
                <Input
                  id={`name`}
                  className="w-full flex-1 bg-transparent border dark:border-stone-700 lg:border-2 outline-none focus:outline-none focus-visible:ring-2 placeholder:text-xs px-2 dark:text-gray-200 relative"
                  value={nameInput === "" ? name : nameInput}
                  onChange={(e) => {
                    setNameInput(e.target.value);
                    setName(e.target.value);
                    setSearchValue(e.target.value);
                  }}
                  placeholder="Shyiramo umukiriya"
                  onBlur={handleBlur}
                />
              </div>
              <div className="flex items-center gap-4 w-full">
                <Label
                  className="text-stone-950 text-sm lg:text-lg border-r-2 px-3 py-1 border-gray-200 bg-gray-100 shadow-md shadow-white dark:shadow-black/70 rounded-lg dark:bg-stone-900 cursor-pointer dark:text-gray-200"
                  htmlFor={`phone`}
                >
                  phone
                </Label>
                <Input
                  id={`phone`}
                  type="number"
                  className="w-full flex-1 bg-transparent border dark:border-stone-700 lg:border-2 outline-none focus:outline-none focus-visible:ring-2 placeholder:text-xs px-2 dark:text-gray-200"
                  value={phoneInput}
                  onChange={(e) => {
                    setPhoneInput(e.target.value);
                  }}
                  onBlur={() => {
                    console.log(phoneInput.length);

                    if (phoneInput.length <= 10) {
                      toast({
                        title: `Ushyizemo imibare ${phoneInput.length} kandi yakabaye 10`,
                        variant: "destructive",
                      });
                      return;
                    }
                    setPhone(Number(`25${phoneInput}`));
                  }}
                  placeholder="Shyiramo telephone"
                />
              </div>
            </div>
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
                  onClick={() => {
                    if (!name) return;
                    setIsOpen(true);
                  }}
                  className="h-4 w-4 text-gray-500 "
                />
              </div>
            )}
          </div>
          {filteredData?.length !== 0 && (
            <div className=" h-full w-full lg:w-[800px] mx-auto -mt-6 shadow-md shadow-blue-300 rounded-md">
              {filteredData?.map(
                (data) =>
                  data.phone !== 0 && (
                    <div
                      key={data._id}
                      className=" w-full lg:w-[800px] mx-auto hover:bg-gray-200 cursor-pointer flex justify-between p-2 px-4 items-start"
                      onClick={() => {
                        setName(data.name);
                        setNameInput(data.name);
                        setPhoneInput(data.phone.toString());
                        setPhone(data.phone);
                        setSearchValue("");
                      }}
                    >
                      <p>{data.name}</p>
                      <p>{data.phone}</p>
                    </div>
                  )
              )}
            </div>
          )}
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

"use client";

import AddSereveye from "@/components/AddSereveye";
import CollapsibleComponents from "@/components/collapsibleComponents";
import DataTable from "@/components/DataTable";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import HeaderSection from "@/components/HeaderSection";
import SkeletonLoader from "@/components/SkeletonLoader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useToast } from "@/hooks/use-toast";
import { useClientInfoStore } from "@/lib/store/zustand";
import { formatToday, getTranslatedDay } from "@/lib/utils";
import { ProductType } from "@/types";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface ClientInfoItem {
  id: number;
  data: ProductType[] | undefined;
}

type ClientInfo = ClientInfoItem[];

// Start with empty array instead of undefined data
const SalesPage: React.FC = () => {
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
    draftPurchaseByClient,
  } = useClientInfoStore();
  const [nameInput, setNameInput] = useState("");

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
  }, [data, addClientData]);

  console.log(clientData, "clientData");

  // Early return for loading and error states
  if (session.status === "loading") {
    return <SkeletonLoader />;
  }

  console.log(draftPurchaseByClient[factureNumber], "draft");

  // Render the page

  return (
    <section className="flex flex-col w-full h-full lg:pl-0">
      {/* {renderCollapsible(
        `Urutonde rw'ibicuruzwa ${getTranslatedDay(formatToday())}`,
        data
      )} */}
      <HeaderSection
        title={`Urutonde rw'ibicuruzwa  ${getTranslatedDay(formatToday())}`}
        className="cursor-pointer"
      />
      <div className="w-full h-fit border flex items-center justify-end">
        <div
          className="mt-4 w-fit h-fit p-2 text-stone-950 border-t-2 border-gray-200 bg-gray-100 shadow-md rounded-lg dark:bg-stone-900 dark:text-gray-200 cursor-pointer"
          onClick={() => {
            console.log(data, "SATEDATA");
            console.log(clientData, "clientData");
            if (data && data.length > 0) {
              addClientData(data);
            }
          }}
        >
          Ongera Umukiriya
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
        clientData.map((info) => (
          <div
            className="h-full w-full rounded-lg overflow-hidden px-1 lg:px-3 flex flex-col gap-4"
            key={info.id}
          >
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
                value={
                  draftPurchaseByClient[factureNumber]
                    ? draftPurchaseByClient[factureNumber][0].name
                    : nameInput
                }
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Shyiramo umukiriya"
                onBlur={(e) => {
                  if (e.target.value === "") {
                    toast({
                      description: "Ooops!!... Ntazi ry'umukiriya washyizimo",
                      variant: "destructive",
                    });
                    return;
                  }
                  setName(e.target.value);
                  setFactureNumber(info.id);
                }}
              />
            </div>
            <DataTable
              name={nameInput}
              factureNumber={info.id}
              data={info.data}
            />
          </div>
        ))
      )}
    </section>
  );
};

export default SalesPage;

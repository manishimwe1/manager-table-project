"use client";
import HeaderSection from "@/components/HeaderSection";
import { PurchaseForm } from "@/components/purchaseForm";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BarPurchaseForm from "@/components/BarPurchaseForm";

const RanguraPage = () => {
  return (
    <Suspense fallback={<Loader2 />}>
      <RanguraComponents />
    </Suspense>
  );
};

export default RanguraPage;

const RanguraComponents = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") as Id<"product">;

  const product =
    query !== null ? useQuery(api.product.getProductById, { id: query }) : null;
  const [isOpen, setIsOpen] = useState(true);
  return (
    <section className="w-full overflow-hidden min-h-screen ">
      <div className="w-full h-full flex gap-2 flex-col lg:flex-row lg:gap-4">
        <div className="w-full h-full flex flex-col">
          <HeaderSection title="Ogera ibicuruzwa muri Stock" />
          <div className="w-full  flex items-center justify-center">
            <Tabs defaultValue="account" className="w-full text-center">
              <TabsList>
                <TabsTrigger value="boutique">Kuri Boutique</TabsTrigger>
                <TabsTrigger value="bar">Kuri Bar</TabsTrigger>
              </TabsList>
              <TabsContent value="boutique" className="w-full text-left">
                <div className="w-full ">
                  <PurchaseForm
                    product={product}
                    setOpen={setIsOpen}
                    className="flex flex-col w-full h-fit"
                  />
                </div>
              </TabsContent>
              <TabsContent value="bar">
                <div className="w-full text-left">
                  <BarPurchaseForm />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        {/* <div className=" w-full bg-background p-2 lg:p-4 rounded-md shadow-md shadow-black/10 dark:shadow-gray-400/10 h-full">
          <CollapsibleItem className="flex w-full h-full" />
        </div> */}
      </div>
    </section>
  );
};

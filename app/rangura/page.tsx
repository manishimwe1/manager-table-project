"use client";

import CollapsibleItem from "@/components/CollapsibleItem";
import HeaderSection from "@/components/HeaderSection";
import { PurchaseForm } from "@/components/purchaseForm";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

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
  console.log(query, "!!!!!!!!!!!!!1");

  const product =
    query !== null ? useQuery(api.product.getProductById, { id: query }) : null;
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="w-full overflow-hidden min-h-screen ">
      <div className="w-full h-full flex flec gap-2 flex-col lg:flex-row lg:gap-4">
        <div className="w-full lg:w-[60%] h-full flex flex-col">
          <HeaderSection title="Ogera ibicuruzwa muri Stock" />
          <div className="w-full ">
            <PurchaseForm
              product={product}
              setOpen={setIsOpen}
              className="flex flex-col w-full h-fit"
            />
          </div>
        </div>
        <div className=" w-full bg-slate-50 p-2 lg:p-4 rounded-md shadow-md shadow-black/10">
          <CollapsibleItem className="flex w-full h-full" />
        </div>
      </div>
    </div>
  );
};

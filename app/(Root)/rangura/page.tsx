"use client";
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

  const product =
    query !== null ? useQuery(api.product.getProductById, { id: query }) : null;
  const [isOpen, setIsOpen] = useState(true);
  return (
    <section className="w-full overflow-hidden min-h-screen ">
      <div className="w-full h-full flex gap-2 lg:gap-4">
        <div className="w-full h-full flex flex-col">
          <HeaderSection
            title="Ogera ibicuruzwa muri Stock"
            className="flex items-center justify-center w-full"
          />
          <div className="w-full  flex items-center justify-center ">
            <div className="w-full flex items-center justify-center">
              <PurchaseForm
                product={product}
                setOpen={setIsOpen}
                className="flex flex-col w-full h-fit"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

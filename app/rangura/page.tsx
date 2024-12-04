"use client";

import CollapsibleItem from "@/components/CollapsibleItem";
import { PurchaseForm } from "@/components/purchaseForm";
import { useState } from "react";

const RanguraPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="w-full overflow-hidden min-h-screen">
      <h1 className="lg:text-2xl mb-4 text-lg font-semibold">
        Ogera ibicuruzwa muri Stock
      </h1>
      <div className="w-full h-full flex gap-2 flex-col lg:flex-row">
        <div className="w-full lg:w-[50%]">
          <PurchaseForm
            setOpen={setIsOpen}
            className="flex flex-col w-full h-fit"
          />
        </div>
        <div className=" w-full">
          <CollapsibleItem className="flex w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default RanguraPage;

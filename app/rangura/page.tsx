"use client";

import CollapsibleItem from "@/components/CollapsibleItem";
import HeaderSection from "@/components/HeaderSection";
import { PurchaseForm } from "@/components/purchaseForm";
import { useState } from "react";

const RanguraPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="w-full overflow-hidden min-h-screen ">
      <div className="w-full h-full flex flec gap-2 flex-col lg:flex-row lg:gap-4">
        <div className="w-full lg:w-[60%] h-full flex flex-col">
          <HeaderSection title="Ogera ibicuruzwa muri Stock" />
          <div className="w-full ">
            <PurchaseForm
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

export default RanguraPage;

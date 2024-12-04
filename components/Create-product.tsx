"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { PurchaseForm } from "./purchaseForm";

function CreateProduct() {
  const [Open, setOpen] = useState(false);
  return (
    <div className="flex justify-start items-start">
      <Dialog open={Open} onOpenChange={() => setOpen(!Open)}>
        <DialogTrigger className="!flex px-4 py-2 border rounded-md items-center gap-1 bg-blue-500 shadow shadow-blue-500 text-white">
          <Plus className="h-4 w-4" />
          <span className="flex text-nowrap">Ogera Igicuruzwa</span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <div>
              <PurchaseForm setOpen={setOpen} />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateProduct;

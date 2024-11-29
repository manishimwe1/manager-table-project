"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useClientInfoStore } from "@/lib/store/zustand";
import { Purchase } from "@/types";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// Define props interface
interface SellingButtonProps {
  id: Id<"product">;
}

const SellingButton: React.FC<SellingButtonProps> = ({ id }) => {
  const router = useRouter();
  const [ideni, setIdeni] = useState<"Yego" | "Oya" | undefined>();
  const newClient = useMutation(api.clientName.createClient);
  const { name, phone, aratwaraZingahe, yishyuyeAngahe } = useClientInfoStore();
  const handleSales = (value: string) => {
    if (value === "Yego") {
      setIdeni("Yego");

      newClient({
        id: id,
        name,
        phone,
        aratwaraZingahe,
        yishyuyeAngahe,
        nideni: false,
      });
    } else if (value === "Oya") {
      setIdeni("Oya");

      newClient({
        id: id,
        name,
        phone,
        aratwaraZingahe,
        yishyuyeAngahe,
        nideni: true,
      });
    } else {
      console.log("Garagaza niba yishyuye❤");
    }

    router.refresh();
  };

  return (
    <form className="flex space-x-2">
      <button
        type="button"
        onClick={() => {
          handleSales("Yego");
        }}
        className="bg-blue-500 text-white px-2 py-1 rounded"
      >
        Yego
      </button>
      <button
        type="button"
        onClick={() => handleSales("Oya")}
        className="bg-red-400 text-white px-2 py-1 rounded"
      >
        Oya
      </button>
      <button
        hidden
        type="submit"
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default SellingButton;

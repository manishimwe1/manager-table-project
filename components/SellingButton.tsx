"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useClientInfoStore } from "@/lib/store/zustand";
import { Purchase, TableRowType } from "@/types";
import { Row } from "@tanstack/react-table";
import { useMutation, useQuery } from "convex/react";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import SkeletonLoader from "./SkeletonLoader";

// Define props interface
interface SellingButtonProps {
  id: Id<"product">;
  activeRow: Row<TableRowType>;
  stock?: number;
}

const SellingButton: React.FC<SellingButtonProps> = ({
  id,
  activeRow,
  stock,
}) => {
  const router = useRouter();
  const [ideni, setIdeni] = useState<"Yego" | "Oya" | undefined>();
  const [loading, setLoading] = useState(false);
  const newClient = useMutation(api.clientName.createClient);
  const {
    name,
    phone,
    aratwaraZingahe,
    yishyuyeAngahe,
    setisSubmiting,
    setReset,
  } = useClientInfoStore();
  const session = useSession();
  const userId = session.data?.user;
  if (!userId) return;
  const { toast } = useToast();

  const user = useQuery(api.user.getUserIndb, { email: userId?.email! });
  const productId = useQuery(api.product.getProductById, { id: id });

  const handleSales = (value: string) => {
    setLoading(!loading);
    const inStock = stock ? stock : 0;
    if (aratwaraZingahe > inStock) {
      setisSubmiting(true);
      setLoading(false);
      return toast({
        title: "Ushyizemo ibicuruzwa byinshi kuruta ibiri muri stock",
        variant: "destructive",
      });
    }
    if (value === "Yego" && aratwaraZingahe) {
      setIdeni("Yego");
      newClient({
        productId: id,
        userId: user?._id!,
        name,
        phone: phone ?? 0,
        aratwaraZingahe,
        yishyuyeAngahe,
        nideni: false,
      });
      setisSubmiting(true);
      setLoading(false);
      activeRow.toggleSelected(false);
      toast({
        title: `Ugurishije  ${productId?.igicuruzwa} kuri ${name ?? "unknown"}`,
        variant: "success",
      });
    } else if (
      value === "Oya" &&
      aratwaraZingahe &&
      name !== "" &&
      phone !== 0
    ) {
      setIdeni("Oya");

      newClient({
        userId: user?._id!,
        productId: id,
        name,
        phone,
        aratwaraZingahe,
        yishyuyeAngahe,
        nideni: true,
      });
      setisSubmiting(true);
      setLoading(false);
      activeRow.toggleSelected(false);
      toast({
        title: `Ugurishije  ${productId?.igicuruzwa} kuri ${name}`,
        variant: "success",
      });
      router.refresh();
    } else {
      setisSubmiting(true);
      setLoading(false);
      toast({
        title: "Garagaza ibyo atwaye cg Izina na Telephone by' umukiriya",
        variant: "destructive",
      });
      return console.log();
    }
    setReset();
    console.log(name, phone, aratwaraZingahe);
  };

  return (
    <form className="flex space-x-2">
      <Button
        disabled={!activeRow.getIsSelected() || loading}
        type="button"
        onClick={() => {
          handleSales("Yego");
        }}
        className="bg-blue-500 disabled:bg-gray-500 transition-all duration-150 text-white px-2 py-1 rounded"
      >
        {loading ? (
          <Loader2 className="animate-spin h-2 w-2" />
        ) : (
          <span>Yego</span>
        )}
      </Button>
      <Button
        disabled={!activeRow.getIsSelected() || loading}
        type="button"
        onClick={() => handleSales("Oya")}
        className="bg-red-400 disabled:bg-gray-500 transition-all duration-150 text-white px-2 py-1 rounded"
      >
        {loading ? (
          <Loader2 className="animate-spin h-2 w-2" />
        ) : (
          <span>Oya</span>
        )}
      </Button>
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

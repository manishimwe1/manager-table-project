"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useClientInfoStore } from "@/lib/store/zustand";
import { Purchase, TableRowType } from "@/types";
import { Row } from "@tanstack/react-table";
import { useMutation, useQuery } from "convex/react";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import SkeletonLoader from "./SkeletonLoader";

// Define props interface

const SellingButton = () => {
  const router = useRouter();
  const [ideni, setIdeni] = useState<"Yego" | "Oya" | undefined>();
  const [loading, setLoading] = useState(false);

  const { name, phone, setReset, productData, setIsSubmitting } =
    useClientInfoStore();
  const session = useSession();
  const userId = session.data?.user;
  if (!userId) return;
  const { toast } = useToast();

  const user = useQuery(api.user.getUserIndb, { email: userId?.email! });

  const newClient = useMutation(api.clientName.createClient);

  const handleSales = (value: string) => {
    productData.forEach((product) => {
      const inStock =
        product.productType === "Ikesi x 20" ||
        product.productType === "Ikesi x 12"
          ? product.byoseHamwe
          : product.ingano;

      if (product.aratwaraZingahe > inStock) {
        setIsSubmitting(true);
        setLoading(false);
        return toast({
          title: "Ushyizemo ibicuruzwa byinshi kuruta ibiri muri stock",
          variant: "destructive",
        });
      }

      if (value === "Yego" && product.aratwaraZingahe) {
        setIdeni("Yego");
        newClient({
          productId: product.id,
          userId: user?._id!,
          name,
          phone: phone ?? 0,
          aratwaraZingahe: product.aratwaraZingahe,
          yishyuyeAngahe: product.yishyuyeAngahe,
          nideni: false,
          productType: product.productType,
        });
        setLoading(false);
        // activeRow.toggleSelected(false);
        toast({
          title: `Ugurishije kuri ${name ?? "unknown"}`,
          variant: "success",
        });
      } else if (
        value === "Oya" &&
        product.aratwaraZingahe &&
        name !== "" &&
        phone !== 0
      ) {
        setIdeni("Oya");

        newClient({
          userId: user?._id!,
          productId: product.id,
          name,
          phone,
          aratwaraZingahe: product.aratwaraZingahe,
          yishyuyeAngahe: product.yishyuyeAngahe,
          nideni: true,
          productType: product.productType,
        });
        setLoading(false);
        // activeRow.toggleSelected(false);
        toast({
          title: `Ugurishije kuri ${name ?? "unknown"}`,
          variant: "success",
        });
      } else {
        setIsSubmitting(true);
        setLoading(false);
        toast({
          title:
            "Garagaza ibyo atwaye cg Izina na Telephone by' umukiriya kubera afashe ideni",
          variant: "destructive",
        });
        return;
      }
    });

    productData.forEach((product) => {
      product.activeRow.toggleSelected(false);
    });
    setReset();
  };

  return (
    <form className="flex">
      <Button
        disabled={loading}
        type="button"
        onClick={() => {
          handleSales("Yego");
        }}
        className="bg-blue-500 disabled:bg-gray-500 transition-all duration-150 text-white px-2 py-1 rounded"
      >
        {loading ? (
          <Loader2 className="animate-spin h-2 w-2" />
        ) : (
          <span>Arishyuye</span>
        )}
      </Button>
      <Button
        disabled={loading}
        type="button"
        onClick={() => handleSales("Oya")}
        className="bg-red-400 disabled:bg-gray-500 transition-all duration-150 text-white px-2 py-1 rounded"
      >
        {loading ? (
          <Loader2 className="animate-spin h-2 w-2" />
        ) : (
          <span>Afashe ideni</span>
        )}
      </Button>
    </form>
  );
};

export default SellingButton;

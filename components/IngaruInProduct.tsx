"use client";

import { api } from "@/convex/_generated/api";
import { Id, Doc } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import useBusinessStore from "@/lib/store/zustand";
import { useRouter } from "next/navigation";
import { Client, ProductType } from "@/types";
import SkeletonLoader from "./SkeletonLoader";
import { ingaruSchema } from "@/lib/validations";
import { useToast } from "@/hooks/use-toast";
import { Undo2 } from "lucide-react";
function IngaruForm({
  product,
  setOpenDialog,
}: {
  product: Doc<"product">;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const updateProduct = useMutation(api.product.updateProduct);
  const updatClient = useMutation(api.clientName.updateClient);
  const createIngaru = useMutation(api.ingaruProduct.IngaruProduct);
  const form = useForm<z.infer<typeof ingaruSchema>>({
    resolver: zodResolver(ingaruSchema),
    defaultValues: {
      agaruyeZingahe: 0,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ingaruSchema>) {
    setLoading(true);
    if (!product) return;

    if (
      Number(form.getValues("agaruyeZingahe")) > 0 ||
      Number(form.getValues("agaruyeZingahe")) <= product.ndanguyeZingahe
    ) {
      form.setError("agaruyeZingahe", {
        message: "washyizemo byinshi kurusha ibyo waranguye.",
      });
      return toast({
        title: "Error",
        description: "Ushyizemo byinshi kurusha ibyo waranguye.",
        variant: "destructive",
      });
    }

    updateProduct({
      id: product._id,
      fields: {
        ingano: product.ingano + Number(values.agaruyeZingahe),
      },
    });

    createIngaru({
      ayoyariYishyuye: 0,
      factureNumber: 0,
      inganoYizoAgaruye: values.agaruyeZingahe,
      name: "unkown",
      phone: 0,
      productId: product._id,
      userId: product.userId as Id<"user">,
    });
    form.reset();
    setLoading(false);
    setOpenDialog(false);
  }

  return (
    <>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 text-left"
          >
            <p className="text-balance text-stone-700">
              hey {product?.igicuruzwa} igarutse muri stock cyivuye mu byashize
            </p>
            <div className="flex items-start">
              <FormField
                control={form.control}
                name="agaruyeZingahe"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Agaruye z'ingahe</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="text-sm"
                        placeholder="adapter"
                        autoFocus
                        min={1}
                        max={product?.ndanguyeZingahe}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full  flex justify-end">
              <Button
                type="submit"
                className="bg-blue-600 font-bold text-white hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "saving..." : "yibike"}
              </Button>
              <DialogClose className="" disabled={loading}>
                cancel
              </DialogClose>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}

const IngaruInProduct = ({ id }: { id: Id<"product"> }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const product = useQuery(api.product.getProductById, {
    id: id as Id<"product">,
  });
  return (
    <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
      <DialogTrigger className=" dark:hover:bg-stone-700 hover:bg-stone-200 w-full rounded-sm text-sm text-left">
        <span className="w-full !text-start !items-start flex justify-between p-4">
          Ingaru
          <Undo2 className="text-red-500 h-4 w-4" />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          {product && (
            <IngaruForm product={product} setOpenDialog={setOpenDialog} />
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default IngaruInProduct;

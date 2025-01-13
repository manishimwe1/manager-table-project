"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import React, { useState } from "react";
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

function IngaruForm({ client }: { client: Client | null | undefined }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const product = useQuery(api.product.getProductById, {
    id: client?.productId as Id<"product">,
  });
  const updateProduct = useMutation(api.product.updateProduct);
  const updatClient = useMutation(api.clientName.updateClient);

  const form = useForm<z.infer<typeof ingaruSchema>>({
    resolver: zodResolver(ingaruSchema),
    defaultValues: {
      agaruyeZingahe: 0,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ingaruSchema>) {
    setLoading(true);
    if (!client || !product) return;

    if (Number(form.getValues("agaruyeZingahe")) > client?.aratwaraZingahe) {
      form.setError("agaruyeZingahe", {
        message: "washyizemo byinshi kurusha ibyo yatwaye.",
      });
      return toast({
        title: "Error",
        description: "Ushyizemo byinshi kurusha ibyo yatwaye.",
        variant: "destructive",
      });
    }
    const returnedClientMoney =
      Number(values.agaruyeZingahe) * Number(product?.ukonyigurishaKuriDetail);
    updatClient({
      id: client._id,
      fields: {
        aratwaraZingahe: client.aratwaraZingahe - Number(values.agaruyeZingahe),
        yishyuyeAngahe: client.yishyuyeAngahe! - returnedClientMoney,
        amazeKwishyura: client?.yishyuye
          ? client?.amazeKwishyura! - returnedClientMoney
          : client.amazeKwishyura !== 0
            ? client?.amazeKwishyura! - returnedClientMoney
            : 0,
        yishyuyezingahe: client?.yishyuye
          ? client?.yishyuyezingahe! - Number(values.agaruyeZingahe)
          : 0,
      },
    });

    updateProduct({
      id: client.productId,
      fields: {
        inganoYizoNishyuye:
          product.inganoYizoNishyuye - Number(values.agaruyeZingahe),
        wishyuyeAngahe: product.wishyuyeAngahe - returnedClientMoney,
      },
    });
    form.reset();
    setLoading(false);
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
            <p className="text-balance text-stone-400">
              {client?.name} yari yatwaye {client?.igicuruzwa}{" "}
              {client?.aratwaraZingahe}
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
                        max={client?.aratwaraZingahe}
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
                {loading ? "saving..." : "yakire"}
              </Button>
              <Button
                type="submit"
                className=""
                disabled={loading}
                variant={"outline"}
              >
                cancel
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}

const IngaruProduct = ({ clientId }: { clientId: Id<"client"> }) => {
  const client = useQuery(api.clientName.getClientById, {
    id: clientId as Id<"client">,
  });

  console.log(client, "client");

  return (
    <Dialog>
      <DialogTrigger className=" dark:hover:bg-stone-700 hover:bg-stone-200 w-full rounded-sm text-sm text-left">
        <span className="w-full !text-start !items-start text-red-600 flex justify-start p-2">
          Ingaru
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <IngaruForm client={client} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default IngaruProduct;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Client } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { useToast } from "@/hooks/use-toast";
import SkeletonLoader from "../SkeletonLoader";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  hasigaye: z.coerce.number(),
  wishyuyeAngahe: z.coerce.number(),
});

const YishyuyeIdeni = ({
  id,
  setDialogOpen,
}: {
  id: Id<"client">;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();
  const product: Client | null | undefined = useQuery(
    api.clientName.getClientById,
    { id: id }
  );
  const productById = useQuery(api.product.getProductById, {
    id: product?.productId,
  });
  const updateClient = useMutation(api.clientName.updatePayedClient);

  if (!product || !productById)
    return (
      <Loader2 className="text-center h-5 w-5 text-stone-700 animate-spin" />
    );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasigaye: product?.aratwaraZingahe === 1 ? 1 : undefined,
      wishyuyeAngahe:
        productById?.ukonyigurishaKuriDetail * product?.aratwaraZingahe,
    },
  });
  console.log(product, "product");

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values);
    if (values.hasigaye > Number(product?.aratwaraZingahe)) {
      return toast({
        title: "Ushyuzemo byinshi kuruta ibyo yatwaye",
        description: "Mwongere mubikore",
        variant: "destructive",
      });
    } else if (values.wishyuyeAngahe > Number(product?.yishyuyeAngahe)) {
      return toast({
        title: "Ushyuzemo amafaranga menshi kuruta iyo agufitiye",
        description: "Mwongere mubikore",
        variant: "destructive",
      });
    }
    if (values.wishyuyeAngahe === Number(product?.yishyuyeAngahe)) {
      updateClient({ id: id });
    } else {
      const yishyuyeAngahe =
        Number(product?.yishyuyeAngahe) - values.wishyuyeAngahe;
      updateClient({ id: id, yishyuyeAngahe });
    }
  }

  //   let hasigaye = 0;
  //   if (product) {
  //     hasigaye = product.aratwaraZingahe - product.inganoYizoNishyuye;
  //   }

  if (product) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-x-3 flex items-center justify-center">
            <FormField
              control={form.control}
              name="hasigaye"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel className="text-left">
                    Hari hasigaye{" "}
                    <span className="text-lg text-red-700 font-bold">
                      {product?.aratwaraZingahe}{" "}
                    </span>
                    atarishyura
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-sm"
                      placeholder={`yatwaye ${product?.aratwaraZingahe} zitishyuwe`}
                      min={1}
                      max={product?.aratwaraZingahe}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="wishyuyeAngahe"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>
                    Hasigayemo
                    <span className="text-lg text-blue-500 font-bold">
                      {productById?.ukonyigurishaKuriDetail.toLocaleString()}
                    </span>{" "}
                    Rwf
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ugiye kwishyura angahe"
                      className="placeholder:text-xs"
                      {...field}
                      min={1}
                      max={product?.yishyuyeAngahe}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-end">
            <Button
              type="button"
              className="!text-sm"
              size={"sm"}
              variant={"outline"}
              onClick={() => setDialogOpen(false)}
            >
              cancel
            </Button>
            <Button
              type="submit"
              className="!text-sm bg-blue-700 text-gray-200"
            >
              Yishyuye
            </Button>
          </div>
        </form>
      </Form>
    );
  }
};

export default YishyuyeIdeni;

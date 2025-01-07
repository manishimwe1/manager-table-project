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
import { useSession } from "next-auth/react";

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
  const session = useSession();
  const product: Client | null | undefined = useQuery(
    api.clientName.getClientById,
    { id: id }
  );
  const productById = useQuery(api.product.getProductById, {
    id: product?.productId,
  });
  const updateClient = useMutation(api.clientName.updatePayedClient);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasigaye: 0,
      wishyuyeAngahe: 0,
    },
  });
  console.log(product, "product");

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values);
    if (!product || !productById) return;
    if (values.hasigaye > product.aratwaraZingahe) {
      form.setError("hasigaye", {
        type: "manual",
        message: "Ushyizemo byinshi  kuruta ibyo yatatwaye",
      });
      form.setFocus("hasigaye");
      return toast({
        title: "Ushyizemo byinshi  kuruta ibyo yatatwaye",
        description: "Mwongere mubikore",
        variant: "destructive",
      });
    }
    if (values.wishyuyeAngahe > Number(productById?.ukonyigurishaKuriDetail)) {
      const yarikwishyura =
        productById?.ukonyigurishaKuriDetail * product?.aratwaraZingahe;
      const restBalance = yarikwishyura - values.wishyuyeAngahe;

      updateClient({
        id: id,
        yishyuyeAngahe: yarikwishyura,
        ideniRishizemo: true,
      });

      toast({
        title: `hey✋ yishyuye menshi umugarurire ${restBalance} kubyo atwaye`,
        description: "ideni ryose rishizemo",
        variant: "success",
      });
      form.reset();
      setDialogOpen(false);
      return;
    } else if (
      values.wishyuyeAngahe < Number(productById?.ukonyigurishaKuriDetail)
    ) {
      const restBalance =
        Number(productById?.ukonyigurishaKuriDetail) - values.wishyuyeAngahe;
      console.log("product2");

      updateClient({
        id: id,
        yishyuyeAngahe: product.yishyuyeAngahe + values.wishyuyeAngahe,
        ideniRishizemo: false,
        yishyuyezingahe: 0,
      });
      toast({
        title: `Akwishyuye  make agusigayemo ${restBalance} iyo agufitiye",
        description: "Mwongere mubikore`,
        variant: "default",
      });
      form.reset();
      setDialogOpen(false);
      return;
    } else if (
      values.wishyuyeAngahe === Number(productById?.ukonyigurishaKuriDetail)
    ) {
      console.log("product3");

      // updateClient({ id: id });
      return toast({
        title: "Yishyuye bingana",
        description: "Mwongere mubikore",
        variant: "destructive",
      });
    } else {
      console.log("product4");

      // const yishyuyeAngahe =
      //   Number(product?.yishyuyeAngahe) - values.wishyuyeAngahe;
      // updateClient({ id: id, yishyuyeAngahe });
      return toast({
        title: "Ntibishyuye byinshi",
        description: "Mwongere mubikore",
        variant: "destructive",
      });
    }
  }

  //   let hasigaye = 0;
  //   if (product) {
  //     hasigaye = product.aratwaraZingahe - product.inganoYizoNishyuye;
  //   }

  if (product && productById) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <p className="text-sm text-balance">
              hey✋{" "}
              <span className="text-blue-500">
                {session.data?.user.firstName?.split(" ")[0]}
              </span>{" "}
              umukiriya witwa{" "}
              <span className="text-blue-300 underline">{product.name}</span>{" "}
              agufitiye ideni rya{" "}
              <span className="text-red-700 font-bold">
                {(
                  product.aratwaraZingahe * productById.ukonyigurishaKuriDetail
                ).toLocaleString()}{" "}
                Rwf
              </span>{" "}
              yatwaye{" "}
              <span className="bg-stone-950 py-1 text-blue-100 px-2 rounded-sm shadow-md shadow-stone-900 font-bold">
                {product.igicuruzwa} {product.aratwaraZingahe}
              </span>{" "}
              zitishyuwe
            </p>
          </div>
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
                      onBlur={() => {
                        const arishyura =
                          field.value * productById?.ukonyigurishaKuriDetail;
                      }}
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
                  <FormLabel>Yishyuye angahe</FormLabel>
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
              className="!text-sm bg-blue-700 hover:bg-blue-600 text-gray-200"
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

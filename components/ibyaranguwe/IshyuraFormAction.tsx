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
import { ProductType } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import SkeletonLoader from "../SkeletonLoader";

const formSchema = z.object({
  hasigaye: z.coerce.number().min(0, "Hasigaye must be at least 0"),
  wishyuyeAngahe: z.coerce.number().min(1, "WishyuyeAngahe must be at least 1"),
});

const IshyuyeIdeni = ({
  id,
  setDialogOpen,
}: {
  id: Id<"product">;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();
  const session = useSession();

  const product: ProductType | undefined | null = useQuery(
    api.product.getProductById,
    { id: id }
  );

  const updateProduct = useMutation(api.product.updateProduct);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasigaye: 0,
      wishyuyeAngahe: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!product) return;

    // Calculate total amount owed and the remaining amount
    const totalAmount =
      product.ukonyigurishaKuriDetail * product.ndanguyeZingahe;
    const totalPaid = product.inganoYizoNishyuye || 0;
    const remainingAmount = totalAmount - totalPaid;

    if (values.wishyuyeAngahe > product.uzishyuraAngahe) {
      form.setError("wishyuyeAngahe", {
        message: "Ushyizemo menshi kurusha ideni ryose.",
      });
      return toast({
        title: "Error",
        description: "Ushyizemo menshi kurusha ideni yose.",
        variant: "destructive",
      });
    } else if (values.wishyuyeAngahe === product.uzishyuraAngahe) {
      updateProduct({
        id: id,
        fields: {
          ndanguyeGute: "nishyuyeCash",

          inganoYizoNishyuye:
            product.inganoYizoNishyuye + Math.floor(values.hasigaye),
          uzishyuraAngahe: product.uzishyuraAngahe - values.wishyuyeAngahe,
          wishyuyeAngahe: product.wishyuyeAngahe + values.wishyuyeAngahe,
        },
      });
      form.reset();
      setDialogOpen(false);
      return toast({
        title: ` wishyuye ideni ryose warufite kuri ${product.igicuruzwa}. 🎉`,
        variant: "success",
      });
    } else {
      const newRemainingAmount = remainingAmount - values.wishyuyeAngahe;

      updateProduct({
        id: id,
        fields: {
          ndanguyeGute: "nishyuyeMake",

          inganoYizoNishyuye:
            product.inganoYizoNishyuye + Math.floor(values.hasigaye),
          uzishyuraAngahe: product.uzishyuraAngahe - values.wishyuyeAngahe,
          wishyuyeAngahe: product.wishyuyeAngahe + values.wishyuyeAngahe,
        },
      });
      form.reset();
      setDialogOpen(false);
      return toast({
        title: `Wishyuye make`,
        description: `Wishyuye ideni ${product.igicuruzwa} hasigaye $${product.uzishyuraAngahe - values.wishyuyeAngahe} Rwf.`,
        variant: "default",
      });
    }
  };

  if (product) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <p className="text-sm text-balance">
              Hey✋{" "}
              <span className="text-blue-500">
                {session.data?.user.firstName?.split(" ")[0]}
              </span>{" "}
              urangura{" "}
              <span className="text-blue-300 underline">
                {product.igicuruzwa}
              </span>{" "}
              wasigayemo ideni rya{" "}
              <span className="text-red-700 font-bold">
                {product.uzishyuraAngahe.toLocaleString()} Rwf
              </span>{" "}
              waranguye{" "}
              <span className="text-blue-500 text-lg font-bold mr-2">
                {product.ndanguyeZingahe}
              </span>{" "}
              <span className="bg-stone-950 py-1 text-blue-100 px-2 rounded-sm shadow-md shadow-stone-900 font-bold">
                {product.ibyoUranguyeType}
              </span>{" "}
              {product.ndanguyeZingahe === 1 ? "itishyuwe" : "zitishyuwe"}.
            </p>
          </div>
          <div className="space-x-3 flex items-center justify-center">
            <FormField
              control={form.control}
              name="wishyuyeAngahe"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Wishyuye angahe</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ugiye kwishyura angahe"
                      className="placeholder:text-xs"
                      {...field}
                      onBlur={() => {
                        form.setValue(
                          "hasigaye",
                          Math.floor(
                            Math.floor(field.value) /
                              product.ukonyigurishaKuriDetail
                          )
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hasigaye"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>
                    Hasigaye{" "}
                    <span className="text-lg text-red-700 font-bold">
                      {Math.floor(
                        Math.max(
                          product.ndanguyeZingahe -
                            Math.floor(
                              form.getValues("wishyuyeAngahe") /
                                product.ukonyigurishaKuriDetail
                            ),
                          0
                        )
                      )}
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      className="text-sm"
                      placeholder={`Yatwaye ${product.ndanguyeZingahe} zitishyuwe`}
                      {...field}
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
              Cancel
            </Button>
            <Button
              type="submit"
              className="!text-sm bg-blue-700 hover:bg-blue-600 text-gray-200"
            >
              Ishyuye
            </Button>
          </div>
        </form>
      </Form>
    );
  }

  return <SkeletonLoader />;
};

export default IshyuyeIdeni;

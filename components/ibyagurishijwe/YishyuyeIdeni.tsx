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
import { useSession } from "next-auth/react";
import SkeletonLoader from "../SkeletonLoader";

const formSchema = z.object({
  hasigaye: z.coerce.number().min(0, "Hasigaye must be at least 0"),
  wishyuyeAngahe: z.coerce.number().min(1, "WishyuyeAngahe must be at least 1"),
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!product || !productById) return;

    // Calculate total amount owed and the remaining amount
    const totalAmount =
      productById.ukonyigurishaKuriDetail * product.aratwaraZingahe;
    const totalPaid = product.amazeKwishyura || 0;
    const remainingAmount = totalAmount - totalPaid;

    if (values.wishyuyeAngahe > remainingAmount) {
      // Error: Payment is greater than the remaining amount
      form.setError("wishyuyeAngahe", {
        message: "Ushyizemo menshi kurusha ideni yose.",
      });
      return toast({
        title: "Error",
        description: "Ushyizemo menshi kurusha ideni yose.",
        variant: "destructive",
      });
    } else if (values.wishyuyeAngahe === remainingAmount) {
      // Payment equals the remaining amount: Debt is fully paid
      updateClient({
        id: id,
        yishyuyeAngahe: values.wishyuyeAngahe,
        ideniRishizemo: true,
        yishyuyezingahe: product.aratwaraZingahe,
      });
      form.reset();
      setDialogOpen(false);
      return toast({
        title: `Congratulations 🎉`,
        description: `${product.name} yishyuye ideni ryose yaragufitiye.`,
        variant: "success",
      });
    } else {
      // Payment is less than the remaining amount
      const newRemainingAmount = remainingAmount - values.wishyuyeAngahe;

      updateClient({
        id: id,
        yishyuyeAngahe: values.wishyuyeAngahe,
        ideniRishizemo: false,
        yishyuyezingahe: values.hasigaye,
      });
      form.reset();
      setDialogOpen(false);
      return toast({
        title: `Partial Payment`,
        description: `${product.name} yishyuye ideni ariko hasigaye ${newRemainingAmount.toLocaleString()} Rwf.`,
        variant: "default",
      });
    }
  };

  if (product && productById) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <p className="text-sm text-balance">
              Hey✋{" "}
              <span className="text-blue-500">
                {session.data?.user.firstName?.split(" ")[0]}
              </span>{" "}
              umukiriya witwa{" "}
              <span className="text-blue-300 underline">{product.name}</span>{" "}
              agufitiye ideni rya{" "}
              <span className="text-red-700 font-bold">
                {(product.amazeKwishyura === 0
                  ? productById.ukonyigurishaKuriDetail *
                    product.aratwaraZingahe
                  : product.aratwaraZingahe *
                      productById.ukonyigurishaKuriDetail -
                    product?.amazeKwishyura!
                ).toLocaleString()}{" "}
                Rwf
              </span>{" "}
              yatwaye{" "}
              <span className="bg-stone-950 py-1 text-blue-100 px-2 rounded-sm shadow-md shadow-stone-900 font-bold">
                {product.igicuruzwa}
              </span>{" "}
              <span className="text-blue-500 text-lg font-bold mr-2">
                {product.aratwaraZingahe}
              </span>{" "}
              zitishyuwe.
            </p>
          </div>
          <div className="space-x-3 flex items-center justify-center">
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
                      onBlur={() => {
                        form.setValue(
                          "hasigaye",
                          Math.floor(
                            field.value / productById.ukonyigurishaKuriDetail
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
                      {Math.max(
                        product.aratwaraZingahe -
                          Math.floor(
                            form.getValues("wishyuyeAngahe") /
                              productById.ukonyigurishaKuriDetail
                          ),
                        0
                      )}
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      className="text-sm"
                      placeholder={`Yatwaye ${product.aratwaraZingahe} zitishyuwe`}
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
              Yishyuye
            </Button>
          </div>
        </form>
      </Form>
    );
  }

  return <SkeletonLoader />;
};

export default YishyuyeIdeni;

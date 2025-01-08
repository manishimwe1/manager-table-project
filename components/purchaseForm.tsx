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
import { formSchema } from "@/lib/validations";
import { Loader, Send } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState, useEffect, useMemo } from "react";
import { Badge } from "./ui/badge";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types";
import { useSession } from "next-auth/react";
import SelectPurchaseType from "./SelectPurchaseType";
import SkeletonLoader from "./SkeletonLoader";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";

export function PurchaseForm({
  setOpen,
  className,
  product,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
  product: ProductType | null | undefined;
}) {
  // console.log(product);

  const session = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const createProduct = useMutation(api.product.createTask);
  const updateProduct = useMutation(api.product.updateProduct);
  const user = session.data?.user;
  const getUser = useQuery(api.user.getUserIndb, {
    email: user?.email!,
    // Add a condition to prevent unnecessary queries
  });

  // State hooks
  const [submitting, setSubmitting] = useState(false);

  const [ndanguyeGute, setNdanguyeGute] = useState<
    "nishyuyeCash" | "mfasheIdeni" | "nishyuyeMake"
  >();
  const [ibyoUranguyeType, setIbyoUranguye] = useState<
    | "Kuri detail"
    | "Ibiro"
    | "Ikesi x 12"
    | "Ikesi x 20"
    | "Amakarito"
    | "Imifuka"
  >("Kuri detail");
  const [byoseHamwe, setByoseHamwe] = useState<number>(0);
  // Form initialization
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: useMemo(
      () => ({
        igicuruzwa: product ? product.igicuruzwa : "",
        ikiranguzo: product ? product.ikiranguzo : 0,
        ikiranguzoKuriDetail: product ? product.ikiranguzo : 0,
        ingano: product ? product.ingano : 0,
        birishyuwe: ndanguyeGute,
        ukonyigurishaKuriDetail: product ? product.ukonyigurishaKuriDetail : 0,
        byoseHamwe: byoseHamwe,
        inganoYizoNishyuye: 0,
        wishyuyeAngahe: 0,
        uzishyuraAngahe: 0,
      }),
      [product, ndanguyeGute, byoseHamwe]
    ),
  });

  useEffect(() => {
    if (ibyoUranguyeType === "Ikesi x 12") {
      setByoseHamwe(form.getValues("ingano") * 12);
    } else if (ibyoUranguyeType === "Ikesi x 20") {
      setByoseHamwe(form.getValues("ingano") * 20);
    } else if (ibyoUranguyeType === "Kuri detail") {
      setByoseHamwe(form.getValues("ingano"));
    } else {
      setByoseHamwe(form.getValues("ingano"));
    }
  }, [ibyoUranguyeType]);

  if (session.status === "loading") return <SkeletonLoader />;
  if (!session.data?.user && session.status === "unauthenticated") {
    redirect("/login");
  }
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.inganoYizoNishyuye > values.ingano) {
      form.setError("inganoYizoNishyuye", {
        message: "Wishyizemo nyinshi",
      });
      form.reset();
      return null;
    }
    setSubmitting(true);
    const uzishyuraAngahe =
      values.birishyuwe === "nishyuyeMake"
        ? values.ikiranguzo * values.ingano - values.wishyuyeAngahe
        : 0;
    if (product?._id) {
      await updateProduct({
        id: product._id,
        fields: {
          igicuruzwa: values.igicuruzwa,
          ikiranguzo: values.ikiranguzo,
          ingano: values.ingano,
          ndanguyeGute: values.birishyuwe,
          uzishyuraAngahe:
            values.birishyuwe === "nishyuyeMake"
              ? uzishyuraAngahe
              : values.uzishyuraAngahe,
          ukonyigurishaKuriDetail: values.ukonyigurishaKuriDetail,
          ndanguyeZingahe: values.ingano,
          ibyoUranguyeType: ibyoUranguyeType,
          byoseHamwe: byoseHamwe,
          inganoYizoNishyuye: values.inganoYizoNishyuye,
          wishyuyeAngahe: values.wishyuyeAngahe,
        },
      });
    } else {
      await createProduct({
        userId: getUser?._id!,
        igicuruzwa: values.igicuruzwa,
        ikiranguzo: values.ikiranguzo,
        ingano: values.ingano,
        ndanguyeGute: values.birishyuwe,
        uzishyuraAngahe:
          values.birishyuwe === "nishyuyeMake"
            ? uzishyuraAngahe
            : values.uzishyuraAngahe,
        ukonyigurishaKuriDetail: values.ukonyigurishaKuriDetail,
        ndanguyeZingahe: values.ingano,
        ibyoUranguyeType: ibyoUranguyeType,
        byoseHamwe: byoseHamwe,
        inganoYizoNishyuye: values.inganoYizoNishyuye,
        wishyuyeAngahe: values.wishyuyeAngahe,
      });
    }
    setOpen(false);
    form.reset();
    setNdanguyeGute(undefined);
    setIbyoUranguye("Kuri detail");
    setByoseHamwe(0);
    setSubmitting(false);
    toast({
      title: `Wongereye ${values.igicuruzwa} muri stock`,
      variant: "success",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-2xl w-full h-fit transition-all duration-200 delay-500 ease-in-out rounded-md px-2 lg:px-0 py-4 "
      >
        <div
          className={cn(
            className ? className : "flex gap-3 w-full flex-col lg:flex-row"
          )}
        >
          <FormField
            control={form.control}
            name="igicuruzwa"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormLabel className="text-black dark:text-gray-100 text-left">
                  Igicuruzwa
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter product title"
                    className="text-sm placeholder:text-xs bg-dark-1 dark:bg-stone-900 dark:text-gray-200 focus-visible:border-white/20 focus:border-white/20 focus-visible:ring-white/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="h-fit flex items-center justify-between w-full gap-2 lg:gap-4 lg:flex-row dark:text-gray-200 bg-background rounded-sm">
            <FormField
              control={form.control}
              name="ingano"
              render={({ field }) => (
                <FormItem className="!w-full">
                  <FormLabel className="text-black dark:text-gray-100 text-left">
                    Ingano
                  </FormLabel>
                  <FormControl className="!w-full">
                    <Input
                      type="number"
                      placeholder="0"
                      className="text-sm placeholder:text-xs bg-dark-1 dark:bg-stone-900 dark:text-gray-200 focus-visible:border-white/20 focus:border-white/20 focus-visible:ring-white/20 !w-full"
                      {...field}
                      onChange={(e) => {
                        form.setValue("ingano", Number(e.target.value));
                        if (ibyoUranguyeType === "Kuri detail") {
                          setByoseHamwe(Number(e.target.value));
                        }
                      }}
                      onBlur={() => {
                        if (ibyoUranguyeType === "Kuri detail") {
                          setByoseHamwe(Number(form.getValues("ingano")));
                        } else if (ibyoUranguyeType === "Ikesi x 12") {
                          setByoseHamwe(Number(form.getValues("ingano")) * 12);
                        } else if (ibyoUranguyeType === "Ikesi x 20") {
                          setByoseHamwe(Number(form.getValues("ingano")) * 20);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full ">
              <SelectPurchaseType
                ibyoUranguyeType={ibyoUranguyeType}
                setIbyoUranguye={setIbyoUranguye}
              />
            </div>
          </div>
        </div>
        <div className="w-full justify-between items-center gap-4">
          <div className="w-full flex flex-col">
            <Label className="text-left dark:text-gray-200">Byose hamwe</Label>
            <Input
              type="number"
              placeholder="0"
              value={byoseHamwe}
              onChange={() => byoseHamwe}
              disabled
              className="text-sm placeholder:text-xs bg-dark-1 dark:bg-stone-900 dark:text-gray-200 focus-visible:border-white/20 focus:border-white/20 focus-visible:ring-white/20 disabled:!text-black disabled:!bg-blue-100 disabled:dark:!bg-stone-900 disabled:dark:!text-gray-100"
            />
          </div>
        </div>
        <div className="flex items-center justify-between w-full gap-4">
          <FormField
            control={form.control}
            name="ikiranguzo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-black dark:text-gray-100 text-left">
                  Ikiranguzo {ibyoUranguyeType.includes("Ikesi") ? "kw'" : null}{" "}
                  {ibyoUranguyeType}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg:100"
                    type="number"
                    className="text-sm placeholder:text-xs bg-dark-1 dark:bg-stone-900 dark:text-gray-200 focus-visible:border-white/20 focus:border-white/20 focus-visible:ring-white/20 flex-1"
                    min={0}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ukonyigurishaKuriDetail"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-black dark:text-gray-100 text-left">
                  Uko Ngurisha detaye
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg:100"
                    type="number"
                    className="text-sm placeholder:text-xs bg-dark-1 dark:bg-stone-900 dark:text-gray-200 focus-visible:border-white/20 focus:border-white/20 focus-visible:ring-white/20 flex-1"
                    min={0}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between w-full gap-4">
          <FormField
            control={form.control}
            name="birishyuwe"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-black dark:text-gray-100 text-left">
                  Ndanguye gute
                </FormLabel>
                <FormControl className="w-full">
                  <div className="flex items-center gap-3">
                    <Badge
                      className={cn(
                        "w-full rounded-full !p-2 text-sm cursor-pointer text-center place-content-center",
                        ndanguyeGute === "nishyuyeCash"
                          ? "bg-green-600 hover:bg-green-500 py-1 px-2 dark:text-white"
                          : "bg-gray-200 dark:bg-stone-900 hover:bg-gray-700 py-1 px-2 text-black dark:text-gray-100 text-left hover:text-white"
                      )}
                      onClick={() => {
                        setNdanguyeGute("nishyuyeCash");
                        field.onChange("nishyuyeCash");
                        form.setValue(
                          "inganoYizoNishyuye",
                          form.getValues("ingano")
                        );
                        form.setValue("wishyuyeAngahe", 0);

                        form.setValue(
                          "wishyuyeAngahe",
                          form.getValues("ikiranguzo") *
                            form.getValues("ingano")
                        );
                      }}
                    >
                      Nishyuye cash
                    </Badge>
                    <Badge
                      className={cn(
                        "w-full rounded-full !p-2 text-sm cursor-pointer text-center place-content-center",
                        ndanguyeGute === "nishyuyeMake"
                          ? "bg-blue-600 hover:bg-blue-500 py-1 px-2 dark:text-white"
                          : "bg-gray-200 dark:bg-stone-900 hover:bg-gray-700 py-1 px-2 text-black dark:text-gray-100 text-left hover:text-white"
                      )}
                      onClick={() => {
                        setNdanguyeGute("nishyuyeMake");
                        field.onChange("nishyuyeMake");
                        form.setValue("uzishyuraAngahe", 0);
                      }}
                    >
                      Nishyuye Make
                    </Badge>
                    <Badge
                      className={cn(
                        "w-full rounded-full !p-2 text-sm cursor-pointer place-content-center",
                        ndanguyeGute === "mfasheIdeni"
                          ? "bg-red-400 hover:bg-red-500 py-1 px-2 text-white"
                          : "bg-gray-300 dark:bg-stone-900 hover:bg-gray-700 py-1 px-2 text-black dark:text-gray-100 text-left hover:text-white"
                      )}
                      onClick={() => {
                        setNdanguyeGute("mfasheIdeni");
                        field.onChange("mfasheIdeni");
                        form.setValue("inganoYizoNishyuye", 0);
                        form.setValue("wishyuyeAngahe", 0);
                        form.setValue(
                          "uzishyuraAngahe",
                          form.getValues("ikiranguzo") *
                            form.getValues("ingano")
                        );
                      }}
                    >
                      Mfashe ideni
                    </Badge>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {ndanguyeGute === "nishyuyeCash" && (
          <FormField
            control={form.control}
            name="uzishyuraAngahe"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-black dark:text-gray-100 text-left">
                  Wishyuye
                </FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="eg:100"
                    type="number"
                    className="text-sm placeholder:text-xs bg-dark-1 dark:bg-stone-900 dark:text-gray-200 focus-visible:border-white/20 focus:border-white/20 focus-visible:ring-white/20 flex-1"
                    value={
                      Number(form.getValues("ikiranguzo")) *
                      Number(form.getValues("ingano"))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {ndanguyeGute === "mfasheIdeni" && (
          <FormField
            control={form.control}
            name="uzishyuraAngahe"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-black dark:text-gray-200">
                  Uzishyura
                </FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="eg:100"
                    type="number"
                    className="text-sm placeholder:text-xs bg-dark-1 dark:bg-stone-900 dark:text-gray-200 focus-visible:border-white/20 focus:border-white/20 focus-visible:ring-white/20 flex-1 disabled:dark:text-gray-100"
                    value={
                      Number(form.getValues("ikiranguzo")) *
                      Number(form.getValues("ingano"))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {ndanguyeGute === "nishyuyeMake" && (
          <div className="flex w-full items-center justify-between gap-2">
            <FormField
              control={form.control}
              name="inganoYizoNishyuye"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-black dark:text-gray-200">
                    Ingano yibyo nishyuye
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg:100"
                      type="number"
                      className="text-sm placeholder:text-xs bg-dark-1 dark:bg-stone-900 dark:text-gray-200 focus-visible:border-white/20 focus:border-white/20 focus-visible:ring-white/20 flex-1 disabled:dark:text-gray-100"
                      {...field}
                      onBlur={() => {
                        form.setValue(
                          "wishyuyeAngahe",
                          form.getValues("ikiranguzo") * field.value
                        );
                      }}
                      max={
                        ibyoUranguyeType === "Kuri detail"
                          ? form.getValues("ingano")
                          : byoseHamwe
                      }
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
                <FormItem className="w-full">
                  <FormLabel className="text-black dark:text-gray-200">
                    Wishyuye angahe
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      placeholder="eg:100"
                      type="number"
                      className="text-sm placeholder:text-xs bg-dark-1 dark:bg-stone-900 dark:text-gray-200 focus-visible:border-white/20 focus:border-white/20 focus-visible:ring-white/20 flex-1 disabled:dark:text-gray-100"
                      {...field}
                      value={
                        form.getValues("ikiranguzo") *
                        form.getValues("inganoYizoNishyuye")
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        <div className="w-full flex justify-end items-center gap-6">
          <Button
            asChild
            type="button"
            onClick={() => setOpen(false)}
            className="text-white font-bold hover:bg-destructive border border-white/10 bg-destructive hover:transition-all duration-200 hover:ease-in-out"
          >
            cancel
          </Button>
          <Button
            type="submit"
            className="text-white font-bold w-full rounded-full capitalize hover:bg-[#141416] bg-[#212124] !py-3 hover:transition-all duration-200 hover:ease-in-out"
            disabled={submitting}
          >
            {submitting ? (
              <div className="flex items-center gap-0.5 justify-center py-2">
                <p>Ongera...</p> <Loader className="animate-spin h-5 w-5" />
              </div>
            ) : (
              <div className="flex items-center gap-0.5 justify-center py-2">
                <p>Ongera muri stock</p>
                <Send className="h-4 w-4" />
              </div>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

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

import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
// import { toast } from "sonner";
// import { Textarea } from "./ui/textarea";

export function PurchaseForm({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [submitting, setsubmitting] = useState(false);

  const createProduct = useMutation(api.product.createTask);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      igicuruzwa: "",
      ikiranguzo: 0,
      ingano: 0,
      total: 0,
      wishyuyeAngahe: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // const totalPrice = Number(
    //   form.getValues("quantity") * form.getValues("unitPrice")
    // );
    console.log({ values, status });
    const total = form.getValues("ikiranguzo") * form.getValues("ingano");
    createProduct({
      igicuruzwa: values.igicuruzwa,
      ikiranguzo: values.ikiranguzo,
      ingano: values.ingano,
      status: values.status,
      total: total,
      wishyuyeAngahe: values.wishyuyeAngahe,
    });
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-2xl w-full h-fit transition-all duration-200 delay-500 ease-in-out rounded-md px-2 lg:px-4 py-4 "
      >
        <div className="flex gap-3 w-full">
          <FormField
            control={form.control}
            name="igicuruzwa"
            render={({ field }) => (
              <FormItem className=" w-full flex-1">
                <FormLabel className="text-black">Igicuruzwa</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter product title"
                    className="text-sm placeholder:text-xs bg-dark-1 focus-visible:border-white/20 focus:border-white/20 focus-visible:ring-white/20"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ingano"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Ingano</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter product title"
                    className="text-sm placeholder:text-xs bg-dark-1 focus-visible:border-white/20 focus:border-white/20 focus-visible:ring-white/20"
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
            name="ikiranguzo"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel className="text-black">Ikiranguzo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg:100"
                    type="number"
                    className="text-sm placeholder:text-xs bg-dark-1 focus-visible:border-white/20 focus:border-white/20 focus-visible:ring-white/20 flex-1"
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
            name="wishyuyeAngahe"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel className="text-black">Wishyuye Angahe</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg:100"
                    type="number"
                    className="text-sm placeholder:text-xs bg-dark-1 focus-visible:border-white/20 focus:border-white/20 focus-visible:ring-white/20 flex-1"
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
          {/* <FormField
            control={form.control}
            name="hasigayeAngahe"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel className="text-black">Hasigaye Angahe</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="eg:100"
                    type="number"
                    className="text-sm placeholder:text-xs bg-dark-1 focus-visible:border-white/20 focus:border-white/20 focus-visible:ring-white/20 flex-1"
                    min={0}
                    {...field}
                    value={Number(form.getValues("total") - Number(inputValue))}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="total"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel className="text-black">Total</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="eg:100"
                    type="number"
                    className="text-sm placeholder:text-xs bg-dark-1 focus-visible:border-white/20 focus:border-white/20 focus-visible:ring-white/20 flex-1"
                    min={0}
                    {...field}
                    value={Number(
                      form.getValues("ingano") * form.getValues("ikiranguzo")
                    )}
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
            name="status"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel className="text-black">Status</FormLabel>
                <FormControl className="w-full ">
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => {
                        field.onChange("pending");
                      }}
                      className="flex items-center gap-2"
                    >
                      <Checkbox />
                      <Badge>pending</Badge>
                    </div>
                    <div
                      onClick={() => {
                        field.onChange("processing");
                      }}
                      className="flex items-center gap-2"
                    >
                      <Checkbox />
                      <Badge>processing</Badge>
                    </div>
                    <div
                      onClick={() => {
                        field.onChange("success");
                      }}
                      className="flex items-center gap-2"
                    >
                      <Checkbox />
                      <Badge>success</Badge>
                    </div>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full gap-4 sm:flex-row flex-col"></div>
        <div className="w-full flex justify-end items-center gap-6">
          <Button
            asChild
            type="button"
            onClick={() => setOpen(false)}
            className="text-white font-bold hover:bg-destructive border border-white/10 bg-destructive hover:transition-all duration-200 hover:ease-in-out "
          >
            cancel
          </Button>
          <Button
            type="submit"
            className="text-white font-bold hover:bg-[#141416] bg-[#212124] "
            disabled={submitting}
          >
            {submitting ? (
              <div className="flex items-center gap-2 w-full">
                <p>Ongera...</p> <Loader className="animate-spin h-5 w-5" />
              </div>
            ) : (
              <p>Ongera</p>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

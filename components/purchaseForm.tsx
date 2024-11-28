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

  const [wishyuye, setwishyuye] = useState(false);
  const [ntibyishyuye, setntibyishyuye] = useState(false);

  const createProduct = useMutation(api.product.createTask);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      igicuruzwa: "",
      ikiranguzo: 0,
      ingano: 0,
      birishyuwe: undefined,
      ukonyigurisha: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const uzishyuraAngahe =
      Number(form.getValues("ikiranguzo")) * Number(form.getValues("ingano"));

    setsubmitting(true);

    createProduct({
      igicuruzwa: values.igicuruzwa,
      ikiranguzo: values.ikiranguzo,
      ingano: values.ingano,
      status: values.birishyuwe,
      uzishyuraAngahe: uzishyuraAngahe,
      ukonyigurisha: values.ukonyigurisha,
    });
    setOpen(false);
    form.reset();
    setsubmitting(false);
    router.push("/sales");
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
                    type="number"
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
            name="ukonyigurisha"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel className="text-black">Uko Nyigurisha</FormLabel>
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
        </div>

        <div className="flex items-center justify-between w-full gap-4">
          <FormField
            control={form.control}
            name="birishyuwe"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel className="text-black">Status</FormLabel>
                <FormControl className="w-full ">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 rounded-full bg-green-400 py-1 px-2">
                      <Checkbox
                        className="text-white border-white"
                        onClick={() => {
                          setntibyishyuye(false);
                          setwishyuye(!wishyuye);
                          field.onChange(true);
                        }}
                      />
                      <Badge className="bg-green-400 hover:bg-green-500 py-1 px-2 text-black">
                        Byishyuwe
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-red-400 py-1 px-2">
                      <Checkbox
                        className="border-white"
                        onClick={() => {
                          setwishyuye(false);
                          setntibyishyuye(!ntibyishyuye);
                          field.onChange(false);
                        }}
                      />
                      <Badge className="bg-red-400 hover:bg-red-500 py-1 text-pretty font-semibold px-2 ">
                        Ntibyishyuwe
                      </Badge>
                    </div>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {wishyuye && (
          <FormField
            control={form.control}
            name="uzishyuraAngahe"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel className="text-black">Wishyuye Angahe</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="eg:100"
                    type="number"
                    className="text-sm placeholder:text-xs bg-dark-1 focus-visible:border-white/20 focus:border-white/20 focus-visible:ring-white/20 flex-1"
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
        {ntibyishyuye && (
          <FormField
            control={form.control}
            name="uzishyuraAngahe"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel className="text-black">Uzishyura Angahe</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="eg:100"
                    type="number"
                    className="text-sm placeholder:text-xs bg-dark-1 focus-visible:border-white/20 focus:border-white/20 focus-visible:ring-white/20 flex-1"
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

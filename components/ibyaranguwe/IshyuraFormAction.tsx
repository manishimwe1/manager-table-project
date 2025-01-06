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
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const formSchema = z.object({
  hasigaye: z.number(),
  wishyuyeAngahe: z.number(),
});

const IshyuraFormAction = ({ id }: { id: Id<"product"> }) => {
  const product = useQuery(api.product.getProductById, { id: id });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasigaye: 0,
      wishyuyeAngahe: 0,
    },
  });

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values);
  }

  let hasigaye = 0;
  if (product) {
    hasigaye = product.ndanguyeZingahe - product.inganoYizoNishyuye;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-x-3 flex items-center justify-center"
      >
        <FormField
          control={form.control}
          name="hasigaye"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-left">Hari hasigaye</FormLabel>
              <FormControl>
                <Input
                  className="text-sm"
                  placeholder={`hasigaye ${hasigaye} zitishyuwe`}
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
              <FormLabel>Bihagaze</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ugiye kwishyura angahe"
                  className="placeholder:text-xs"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default IshyuraFormAction;

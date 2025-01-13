import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
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
import { invoiceSchema } from "@/lib/validations";
import useBusinessStore from "@/lib/store/zustand";
import { useRouter } from "next/navigation";
import { Client, ProductType } from "@/types";
import SkeletonLoader from "./SkeletonLoader";

function SohoraFactureForm({
  clientFacture,
}: {
  clientFacture: Client[] | undefined;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setBusinessData } = useBusinessStore();

  const form = useForm<z.infer<typeof invoiceSchema>>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      buzName: "",
      buzPhone: 0,
      email: "",
      streetNo: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof invoiceSchema>) {
    setLoading(true);
    setBusinessData({
      buzName: values.buzName,
      buzPhone: values.buzPhone,
      email: values.email,
      streetNo: values.streetNo,
      clientFacture: clientFacture,
    });
    setLoading(false);

    form.reset();
    router.push("/sohora-facture");
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
            <div className="flex items-start">
              <FormField
                control={form.control}
                name="buzName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bussiness Name</FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm"
                        placeholder="easyfix ltd"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="buzPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bussiness phone</FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm"
                        placeholder="easyfix ltd"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-start">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bussiness email</FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm"
                        placeholder="easyfixsupport@gmail.com"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="streetNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm"
                        placeholder="KN74str"
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
                {loading ? "Ohereza..." : "Ohereza"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}

const SohoraFacture = ({ clientId }: { clientId?: Id<"client"> }) => {
  const client = clientId
    ? useQuery(api.clientName.getClientById, { id: clientId })
    : null;
  const clientFacture = useQuery(api.clientName.getClientWhoPaidByName, {
    name: client?.name as string,
    facture: client?.facture as number,
  });
  console.log(clientFacture, "clientFacture");

  return (
    <Dialog>
      <DialogTrigger className=" hover:bg-stone-700 w-full rounded-sm text-sm text-left">
        <span className="w-full !text-start !items-start flex justify-start p-2">
          Sohora facture
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <SohoraFactureForm clientFacture={clientFacture} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SohoraFacture;

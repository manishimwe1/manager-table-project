"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useToast } from "@/hooks/use-toast";
import { ingaruSchema } from "@/lib/validations";
import { Client } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SkeletonLoader from "./SkeletonLoader";
import { Input } from "./ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function IngaruForm({
  client,
  setOpenDialog,
}: {
  client: Client | null | undefined;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const product = useQuery(api.product.getProductById, {
    id: client?.productId as Id<"product">,
  });

  const updateProduct = useMutation(api.product.updateProduct);
  const updatClient = useMutation(api.clientName.updateClient);
  const createIngaru = useMutation(api.ingaruProduct.IngaruProduct);
  const form = useForm<z.infer<typeof ingaruSchema>>({
    resolver: zodResolver(ingaruSchema),
    defaultValues: {
      agaruyeZingahe: product?.ukonyigurishaKuriDetail,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ingaruSchema>) {
    setLoading(true);
    if (!client || !product) return;

    if (Number(form.getValues("agaruyeZingahe")) <= 0) {
      form.setError("agaruyeZingahe", {
        message: "washyizemo byinshi kurusha ibyo yatwaye.",
      });
      return toast({
        title: "Error",
        description: "Ushyizemo byinshi kurusha ibyo yatwaye.",
        variant: "destructive",
      });
    }

    updatClient({
      id: client._id,
      fields: {
        ukoNyigurisha: values.agaruyeZingahe,
      },
    });

    form.reset();
    setLoading(false);
    setOpenDialog(false);
    toast({
      title: "Success",
      description: "Uko nyigurisha irahindutse.",
      variant: "success",
    });
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
            <p className="text-balance text-stone-800 text-center">
              ubusazwe {client?.igicuruzwa} uyigurisha{" "}
              {product?.ukonyigurishaKuriDetail.toLocaleString()} rwf
            </p>
            <div className="flex items-start">
              <FormField
                control={form.control}
                name="agaruyeZingahe"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Uko nyigurisha</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="text-sm"
                        placeholder="adapter"
                        autoFocus
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
                {loading ? "Ogera igicuruzwa..." : "Ogera igicuruzwa"}
              </Button>
              <DialogClose className="" disabled={loading}>
                cancel
              </DialogClose>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}

const ChangeUkoNyigurisha = ({ clientId }: { clientId: Id<"client"> }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const client = useQuery(api.clientName.getClientById, {
    id: clientId as Id<"client">,
  });
  const product = useQuery(api.product.getProductById, {
    id: client?.productId as Id<"product">,
  });
  // console.log(client, "client");

  return (
    <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
      <DialogTrigger className=" dark:hover:bg-stone-700 hover:bg-stone-200 w-full rounded-sm text-sm text-left">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span className="w-full !text-start !items-start flex justify-start p-2">
                Hindura
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Hindura uko usazwe ugurisha{" "}
                <span className="text-blue-600">{client?.igicuruzwa}</span>{" "}
                ubusazwe{" "}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <IngaruForm client={client} setOpenDialog={setOpenDialog} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeUkoNyigurisha;

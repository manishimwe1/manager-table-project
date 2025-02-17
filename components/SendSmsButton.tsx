import React, { useState } from "react";
import { Button } from "./ui/button";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Client } from "@/types";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  message: z.string().min(2).max(5000),
});

function ProfileForm({
  clientName,
  clientProduct,
  setOpenMsgBox
}: {
  clientName?: string;
  clientProduct?: Client | undefined | null;
  setOpenMsgBox: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: `Hi ${clientName}! watwaye  ${clientProduct?.igicuruzwa} ufite ideni rya ${clientProduct ? clientProduct?.amazeKwishyura! - clientProduct?.yishyuyeAngahe : 0}`,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form Values:", values);
    if (values.message === "") return;
    setSending(true);
    const requestData = {
      message: `${values.message}`,
      to: `+${clientProduct?.phone}`, // Example phone number
      provider: "africastalking",
    };

    console.log("Sending SMS:", requestData);

    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send-sms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });
    setSending(false);
    form.reset();
    setOpenMsgBox(false)
    if (response.ok) {
      return toast({
        title: "Success",
        description: "Message sent successfully",
        variant: "success",
      })
    } else {
      return toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      })
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  {...field}
                  placeholder="andika message"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end space-x-2">
          <Button
            type="submit"
            className="bg-blue-600 font-bold text-white hover:bg-blue-700"
            disabled={sending}
          >
            {sending ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

const SendSmsButton = ({
  clientId,
  productId,
}: {
  clientId?: Id<"client">;
  productId?: Id<"product">;
}) => {
  const [openMsgBox, setOpenMsgBox] = useState(false)
  const client = clientId
    ? useQuery(api.clientName.getClientById, { id: clientId })
    : null;
  const product = productId
    ? useQuery(api.product.getProductById, { id: productId })
    : null;

  return (
    <Dialog open={openMsgBox} onOpenChange={() => setOpenMsgBox(!openMsgBox)}>
      <DialogTrigger>
        <span className=" dark:hover:bg-stone-700 hover:bg-stone-200 p-2 w-full rounded-sm text-sm text-left">
          Mwohereze sms
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-balance text-sm text-gray-400">
            Ohereza sms kuri:{" "}
            <span className="text-base text-blue-500">{client?.name}</span>{" "}
            ufite nimero ya {client?.phone}
          </DialogTitle>
          <ProfileForm clientName={client?.name} clientProduct={client} setOpenMsgBox={setOpenMsgBox} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SendSmsButton;

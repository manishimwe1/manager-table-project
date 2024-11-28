"use client";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "./ui/label";
import { Plus, PlusCircle, Send, X } from "lucide-react";
import { Input } from "./ui/input";
import Form from "next/form";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";

const AddCustomerName = ({ id }: { id: Id<"product"> }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const createClient = useMutation(api.clientName.createClient);
  const submitClient = () => {
    createClient({
      name: name,
      phone: phone,
      productId: id,
    });
    setName("");
    setPhone(0);
    setOpen(false);
  };

  return (
    <Popover
      onOpenChange={(open) => {
        setOpen(!open);
      }}
    >
      <PopoverTrigger>
        <div
          className="bg-secondary text-sm text-black font-medium hover:bg-background flex items-center gap-1 rounded-lg py-1 px-2"
          onClick={() => {
            setOpen(true);
          }}
        >
          <PlusCircle className="h-3 w-3" />
          new
        </div>
      </PopoverTrigger>
      <PopoverContent className="!w-full">
        <Form action={submitClient} className="flex flex-col gap-2">
          <div>
            <Label htmlFor="name">Name</Label>
            <span className="text-red-500">*</span>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              min={2}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone number</Label>
            <span className="text-xs ml-0.5 text-muted-foreground">
              (optional)
            </span>
            <Input
              type="number"
              id="phone"
              min={10}
              value={phone}
              onChange={(e) => setPhone(Number(e.target.value))}
            />
          </div>
          <div className="w-full flex justify-end ">
            <Button>
              <Send /> Send
            </Button>
          </div>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

export default AddCustomerName;

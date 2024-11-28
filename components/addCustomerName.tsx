"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useClientInfoStore } from "@/lib/store/zustand";
import { PlusCircle, Send } from "lucide-react";
import Form from "next/form";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const AddCustomerName = ({ time }: { time: number }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const saveName = useClientInfoStore((state) => state.setName);
  const Name = useClientInfoStore((state) => state.name);
  const Phone = useClientInfoStore((state) => state.phone);
  const savePhone = useClientInfoStore((state) => state.setPhone);

  const submitClient = () => {
    Promise.all([saveName(name), savePhone(phone)]);

    setName("");
    setPhone(0);
    setOpen(false);
  };
  console.log(Name, Phone);
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
          {Name && Phone ? (
            <div className="flex items-start justify-between flex-col gap-0">
              <p className="text-xs font-bold text-gray-500">Name: {Name} </p>,
              <p className="text-xs font-bold text-gray-500">Phone: {Phone}</p>
            </div>
          ) : (
            <>
              <PlusCircle className="h-4 w-4" />
              new
            </>
          )}
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

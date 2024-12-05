import React, { ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";

const ActionComponents = ({
  children,
  id,
  ibyashize,
}: {
  children: ReactNode;
  id?: Id<"client">;
  ibyashize?: boolean;
}) => {
  const updatePayedClient = useMutation(api.clientName.updatePayedClient);
  function handleClick() {
    console.log("here");

    updatePayedClient({ id: id! });
  }
  return (
    <div className=" text-right relative">
      <Popover>
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent asChild className="!p-0 !py-2 !px-2">
          <div className="flex items-start justify-center flex-col gap-2 !w-full">
            {ibyashize ? (
              <Button
                className="w-full !text-start  !items-start flex justify-start "
                variant={"ghost"}
                onClick={() => {
                  handleClick();
                }}
                asChild
              >
                <Link href={"/rangura"}>Rangura indi</Link>
              </Button>
            ) : (
              <>
                <Button
                  className="w-full !text-start  !items-start flex justify-start "
                  variant={"ghost"}
                  onClick={() => {
                    handleClick();
                  }}
                >
                  Yishyuye
                </Button>
                <Button
                  className="w-full !text-start !items-start flex justify-start "
                  variant={"ghost"}
                >
                  Mwoherereze sms
                </Button>
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ActionComponents;

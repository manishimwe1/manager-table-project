import React, { ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { cn, printData } from "@/lib/utils";

const ActionComponents = ({
  children,
  id,
  ibyashize,
  bishyuye,
}: {
  children: ReactNode;
  id: Id<"client"> | Id<"product">;
  ibyashize?: boolean;
  bishyuye: boolean;
}) => {
  // const ClientWhoPaid = useQuery(api.clientName.getClientWhoPaidById, {
  //   //@ts-ignore
  //   id: id,
  // });

  const updatePayedClient = useMutation(api.clientName.updatePayedClient);
  function handleClick() {
    if (!ibyashize && id) {
      console.log("here", id);
      //@ts-ignore
      const clientId: Id<"client"> = id;
      updatePayedClient({ id: clientId });
    }
  }

  console.log(bishyuye);

  return (
    <div className={cn(" text-center relative")}>
      <Popover>
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent asChild className="!p-0 !py-2 !px-2">
          <div className="flex items-start justify-center flex-col gap-2 !w-full">
            {ibyashize && (
              <Button
                className="w-full !text-start  !items-start flex justify-start "
                variant={"ghost"}
                onClick={() => {
                  handleClick();
                }}
                asChild
              >
                <Link href={`/rangura?q=${id}`}>Rangura indi</Link>
              </Button>
            )}{" "}
            {bishyuye === false ? (
              <>
                <Button
                  className="w-full !text-start  !items-start flex justify-start "
                  variant={"ghost"}
                  onClick={() => {
                    handleClick();
                  }}
                >
                  Yishyuye ideni
                </Button>
                <Button
                  className="w-full !text-start !items-start flex justify-start "
                  variant={"ghost"}
                >
                  Mwoherereze sms
                </Button>
                <Button
                  className="w-full !text-start !items-start flex justify-start "
                  variant={"ghost"}
                >
                  Sohora facture
                </Button>
              </>
            ) : (
              <Button
                className="w-full !text-start !items-start flex justify-start "
                variant={"ghost"}
              >
                Mwoherereze sms
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ActionComponents;

import React, { ReactNode, useState } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import IshyuraFormAction from "./ibyaranguwe/IshyuraFormAction";
import YishyuyeIdeni from "./ibyagurishijwe/YishyuyeIdeni";

const ActionComponents = ({
  children,
  id,
  ibyashize,
  bishyuye,
}: {
  children: ReactNode;
  id: Id<"client">;
  ibyashize?: boolean;
  bishyuye: boolean;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

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
                  // handleClick();
                }}
              >
                Rangura indi
              </Button>
            )}{" "}
            {bishyuye === false ? (
              <>
                <AlertDialog
                  open={dialogOpen}
                  onOpenChange={() => {
                    setDialogOpen(!dialogOpen);
                  }}
                >
                  <AlertDialogTrigger className="p-2 hover:bg-stone-700 w-full rounded-sm text-sm text-left">
                    Yishyuye ideni
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle></AlertDialogTitle>
                      <div>
                        <YishyuyeIdeni id={id} setDialogOpen={setDialogOpen} />
                      </div>
                    </AlertDialogHeader>
                  </AlertDialogContent>
                </AlertDialog>

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
              <>
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
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ActionComponents;

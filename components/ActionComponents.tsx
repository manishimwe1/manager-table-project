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
import SendSmsButton from "./SendSmsButton";
import SohoraFacture from "./SohoraFacture";
import IngaruProduct from "./IngaruProduct";

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

  return (
    <div className={cn(" text-center relative")}>
      <Popover>
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent asChild className="!p-2 !gap-0.5">
          <div className="flex items-start justify-center flex-col space-y-1.5 !w-full">
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
                  <AlertDialogTrigger className="p-2  dark:hover:bg-stone-700 hover:bg-stone-200 w-full rounded-sm text-sm text-left">
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

                <SendSmsButton clientId={id} />

                <SohoraFacture clientId={id} />

                <IngaruProduct clientId={id} />
              </>
            ) : (
              <>
                <SendSmsButton />
                <SohoraFacture clientId={id} />
                <IngaruProduct clientId={id} />
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ActionComponents;

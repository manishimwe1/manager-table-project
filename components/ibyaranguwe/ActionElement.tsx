import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { Button } from "../ui/button";
import YishyuyeIdeni from "../ibyagurishijwe/YishyuyeIdeni";
import { MoreVertical } from "lucide-react";
import IshyuyeIdeni from "./IshyuraFormAction";
import SendSmsButton from "../SendSmsButton";
import SohoraFacture from "../SohoraFacture";
import DeleteProductButton from "../DeleteProductButton";
import Link from "next/link";
import IngaruInProduct from "../IngaruInProduct";

const ActionElement = ({
  id,
  ndanguyeGute,
  showIngaru,
}: {
  id: Id<"product">;
  showIngaru?: boolean;
  ndanguyeGute: "nishyuyeCash" | "mfasheIdeni" | "nishyuyeMake";
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className={cn(" text-center relative")}>
      <Popover>
        <PopoverTrigger>
          <MoreVertical />
        </PopoverTrigger>
        <PopoverContent asChild className="!p-0 !gap-0.5">
          <div className="flex items-start justify-center flex-col  !w-full">
            {ndanguyeGute !== "nishyuyeCash" && (
              <AlertDialog
                open={dialogOpen}
                onOpenChange={() => {
                  setDialogOpen(!dialogOpen);
                }}
              >
                <AlertDialogTrigger className="py-2 px-4 hover:bg-stone-700 w-full rounded-sm text-sm text-left">
                  Ishyura ideni
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle></AlertDialogTitle>

                    <div>
                      <IshyuyeIdeni id={id} setDialogOpen={setDialogOpen} />
                    </div>
                  </AlertDialogHeader>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <Button
              className="w-full !text-start  !items-start flex justify-start "
              variant={"ghost"}
              onClick={() => {
                // handleClick();
              }}
              asChild
            >
              <Link href={"/rangura"}> Rangura indi</Link>
            </Button>
            {showIngaru ? <IngaruInProduct id={id} /> : null}

            <DeleteProductButton id={id} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ActionElement;

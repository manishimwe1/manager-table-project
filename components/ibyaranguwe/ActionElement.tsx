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

const ActionElement = ({
  id,
  ndanguyeGute,
}: {
  id: Id<"product">;
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
            <AlertDialog
              open={dialogOpen}
              onOpenChange={() => {
                setDialogOpen(!dialogOpen);
              }}
            >
              <AlertDialogTrigger className="py-2 px-4 hover:bg-stone-700 w-full rounded-sm text-sm text-left">
                Ishyuye ideni
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
            <DeleteProductButton
              setDialogOpen={setDialogOpen}
              dialogOpen={dialogOpen}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ActionElement;

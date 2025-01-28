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
import ChangeUkoNyigurisha from "./ChangeUkoNyigurisha";
import YishyuyeIdeni from "./ibyagurishijwe/YishyuyeIdeni";
import IngaruProduct from "./IngaruProduct";
import SendSmsButton from "./SendSmsButton";
import SohoraFacture from "./SohoraFacture";

const ActionComponents = ({
  children,
  id,
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
            {bishyuye === false ? (
              <>
                <ChangeUkoNyigurisha clientId={id} />
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
                <ChangeUkoNyigurisha clientId={id} />
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

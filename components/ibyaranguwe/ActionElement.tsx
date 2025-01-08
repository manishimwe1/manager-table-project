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

            <Button
              className="w-full !text-start !items-start flex justify-start "
              variant={"ghost"}
              onClick={async () => {
                console.log(
                  "START TO SEND...",
                  `${process.env.NEXT_PUBLIC_SITE_URL}`
                );
                await fetch(
                  `${process.env.NEXT_PUBLIC_SITE_URL}/api/send-sms`,
                  {
                    method: "POST",
                    body: JSON.stringify({
                      isWhatsApp: true,
                      message: "Hello from WhatsApp!",
                      to: "+250798894137",
                      provider: "twilio",
                    }),
                  }
                );
              }}
            >
              Mwoherereze WhatsApp
            </Button>
            <Button
              className="w-full !text-start !items-start flex justify-start "
              variant={"ghost"}
              onClick={async () => {
                console.log(
                  "START TO SEND...",
                  `${process.env.NEXT_PUBLIC_SITE_URL}`
                );
                await fetch(
                  `${process.env.NEXT_PUBLIC_SITE_URL}/api/send-sms`,
                  {
                    method: "POST",
                    body: JSON.stringify({
                      to: "+250798894137",
                      message: "hey....testing",
                      provider: "twilio",
                    }),
                  }
                );
              }}
            >
              Mwoherereze sms
            </Button>
            <Button
              className="w-full !text-start !items-start flex justify-start "
              variant={"ghost"}
            >
              Sohora facture
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ActionElement;

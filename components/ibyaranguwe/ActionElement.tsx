import React from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { MoreVerticalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import IshyuraFormAction from "./IshyuraFormAction";
import AlertHearder from "./AlertHearder";
import { useClientInfoStore } from "@/lib/store/zustand";

const ActionElement = ({
  id,
  ndanguyeGute,
}: {
  id: Id<"product">;
  ndanguyeGute: "nishyuyeCash" | "mfasheIdeni" | "nishyuyeMake";
}) => {
  const deleteAction = useMutation(api.product.deleteProduct);
  const updatePayedClient = useMutation(api.clientName.updatePayedClient);
  const { openDrawer, setOpenDrawer } = useClientInfoStore();

  //   function handleClick() {
  //     if (!ibyashize && id) {
  //       console.log("here", id);
  //       //@ts-ignore
  //       const clientId: Id<"client"> = id;
  //       updatePayedClient({ id: clientId });
  //     }

  //   console.log(bishyuye);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger id="dropdown-trigger">
        <MoreVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {ndanguyeGute === "mfasheIdeni" && (
          <DropdownMenuItem className="cursor-pointer">
            Ishyuye ideni
          </DropdownMenuItem>
        )}
        {ndanguyeGute === "nishyuyeMake" && (
          <DropdownMenuItem
            asChild
            className="cursor-pointer"
            // onClick={() => setOpenDrawer(true)}
          >
            <AlertDialog>
              <AlertDialogTrigger className="px-2 py-1">
                Ishyura asigaye
              </AlertDialogTrigger>
              <AlertDialogContent>
                <div className="w-full h-full space-y-4">
                  <AlertHearder id={id} />
                  <div
                    className="w-full"
                    onClick={() => {
                      if (document) {
                        console.log("here");
                        document.getElementById("dropdown-trigger")?.focus();
                      }
                    }}
                  >
                    <IshyuraFormAction id={id} />
                  </div>
                </div>
                <AlertDialogFooter className="flex !flex-row !items-center justify-end space-x-3 w-full ">
                  <AlertDialogCancel className=" !m-0">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-blue-700 hover:bg-blue-600 text-gray-200"
                    onClick={() => {}}
                  >
                    Ishyura
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuItem>
        )}

        {/* <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <AlertDialog>
            <AlertDialogTrigger className="bg-red-500 hover:bg-red-600 cursor-pointer w-full py-1 rounded-sm ">
              Delete
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Urabyemeza neza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Iki gikorwa ntigishobora gusubirwamo. Ibi birasiba iki
                  gicuruzwa muri stock
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex !flex-row !items-center justify-end space-x-3 w-full ">
                <AlertDialogCancel className=" !m-0">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-600 text-gray-200"
                  onClick={() => {
                    deleteAction({ id });
                  }}
                >
                  Siba
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionElement;

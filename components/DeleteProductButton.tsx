import React, { Dispatch, SetStateAction } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

function DeleteProductButton({
  setDialogOpen,
  dialogOpen,
}: {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  dialogOpen: boolean;
}) {
  return (
    <div>
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

            <p>urabyemeza neza ikigikorwa nigisubizwa inyama</p>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button>cancel</Button>
            <Button>siba</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default DeleteProductButton;

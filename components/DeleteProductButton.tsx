import { useState } from "react";
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

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useToast } from "@/hooks/use-toast";

function DeleteProductButton({ id }: { id: Id<"product"> }) {
  const { toast } = useToast();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const deleteProduct = useMutation(api.product.deleteProduct);
  return (
    <div className="flex items-start justify-center flex-col  !w-full">
      <AlertDialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <AlertDialogTrigger className="text-red-500 py-2 px-4 hover:bg-stone-700 w-full rounded-sm text-sm text-left">
          Siba igicuruzwa
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {" "}
              urabyemeza neza ikigikorwa nigisubizwa inyuma
            </AlertDialogTitle>
            <AlertDialogDescription>
              Iki gikorwa ntigishobora gusubirwamo. Ibi birasiba burundu
              igicuruzwa cyawe muri seriveri yacu.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                deleteProduct({ id });
                setDeleteModalOpen(false);
                toast({
                  title: "Product deleted successfully",
                  description: "Product has been deleted.",
                  variant: "success",
                });
              }}
            >
              Siba igicuruzwa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default DeleteProductButton;

import { Id } from "@/convex/_generated/dataModel";
import { create } from "zustand";

interface UseShowEditBox {
  showEditBox: boolean;
  activeProductId: string | null;
  activeField: string | null;
  setShowEditBox: (productId: Id<"product">, field: string | null) => void;
  resetShowEditBox: () => void;
}

export const useShowEditBoxStore = create<UseShowEditBox>((set) => ({
  showEditBox: false,
  activeProductId: null,
  activeField: null,
  setShowEditBox: (productId, field) =>
    set(() => ({
      showEditBox: !!productId, // Toggle based on productId
      activeProductId: productId,
      activeField: field,
    })),
  resetShowEditBox: () =>
    set(() => ({
      showEditBox: false,
      activeProductId: null,
    })),
}));

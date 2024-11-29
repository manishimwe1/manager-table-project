import { Id } from "@/convex/_generated/dataModel";
import { create } from "zustand";

interface UseShowEditBox {
  showEditBox: boolean;
  activeProductId: string | null;
  activeField: string | null;
  setShowEditBox: (productId: Id<"product">, field: string | null) => void;
  resetShowEditBox: () => void;
}

interface clientInfo {
  name: string;
  phone: number;
  aratwaraZingahe: number;
  yishyuyeAngahe: number;
  setName: (nerName: string) => void;
  setAratwaraZingahe: (newPhone: number) => void;
  setPhone: (newPhone: number) => void;
  setYishyuyeAngahe: (newPhone: number) => void;
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

export const useClientInfoStore = create<clientInfo>((set) => ({
  name: "",
  phone: 0,
  aratwaraZingahe: 0,
  yishyuyeAngahe: 0,
  setName: (newName: string) =>
    set(() => ({
      name: newName, // Toggle based on productId
    })),
  setPhone: (newPhone: number) =>
    set(() => ({
      phone: newPhone, // Toggle based on productId
    })),
  setPhone: (newPhone: number) =>
    set(() => ({
      phone: newPhone, // Toggle based on productId
    })),
  setPhone: (newPhone: number) =>
    set(() => ({
      phone: newPhone, // Toggle based on productId
    })),
}));

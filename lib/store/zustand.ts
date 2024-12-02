import { Id } from "@/convex/_generated/dataModel";
import { create } from "zustand";

interface UseShowEditBox {
  showEditBox: boolean;
  activeProductId: string | null;
  activeField: string | null;
  setShowEditBox: (productId: Id<"product">, field: string | null) => void;
  resetShowEditBox: () => void;
}

interface ClientInfo {
  name: string;
  phone: number;
  aratwaraZingahe: number;
  yishyuyeAngahe: number;
  isSubmiting: boolean;
  setName: (newName: string) => void;
  setPhone: (newPhone: number) => void;
  setAratwaraZingahe: (newAratwaraZingahe: number) => void;
  setYishyuyeAngahe: (newYishyuyeAngahe: number) => void;
  setReset: () => void;
  setisSubmiting: (value: boolean) => void;
}

export const useClientInfoStore = create<ClientInfo>((set) => ({
  name: "",
  phone: 0,
  aratwaraZingahe: 0,
  yishyuyeAngahe: 0,
  isSubmiting: false,
  setName: (newName: string) =>
    set(() => ({
      name: newName,
    })),

  setPhone: (newPhone: number) =>
    set(() => ({
      phone: newPhone,
    })),

  setAratwaraZingahe: (newAratwaraZingahe: number) =>
    set(() => ({
      aratwaraZingahe: newAratwaraZingahe,
    })),

  setYishyuyeAngahe: (newYishyuyeAngahe: number) =>
    set(() => ({
      yishyuyeAngahe: newYishyuyeAngahe,
    })),
  setReset: () =>
    set(() => ({
      yishyuyeAngahe: 0,
      name: "",
      phone: undefined,
      aratwaraZingahe: undefined,
    })),
  setisSubmiting: (value: boolean) =>
    set(() => ({
      isSubmiting: value,
    })),
}));

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

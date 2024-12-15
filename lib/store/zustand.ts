import { set } from "zod";
import { Id } from "@/convex/_generated/dataModel";
import { create } from "zustand";

interface ClientInfo {
  name: string;
  productType: string;
  phone: number;
  byoseHamwe: number;
  stock: number;
  aratwaraZingahe: number;
  yishyuyeAngahe: number;
  isSubmiting: boolean;
  storeId: Id<"product">[]; // Array to store sold item IDs
  setName: (newName: string) => void;
  setproductType: (productType: string) => void;
  setStock: (stock: number) => void;
  setPhone: (newPhone: number) => void;
  setByoseHamwe: (byoseHamwe: number) => void;
  setAratwaraZingahe: (newAratwaraZingahe: number) => void;
  setYishyuyeAngahe: (newYishyuyeAngahe: number) => void;
  addToStoreId: (id: Id<"product">) => void;
  resetStoreId: () => void;
  setReset: () => void;
  setisSubmiting: (value: boolean) => void;
}

export const useClientInfoStore = create<ClientInfo>((set) => ({
  name: "",
  productType: "",
  byoseHamwe: 0,
  stock: 0,
  phone: 0,
  aratwaraZingahe: 0,
  yishyuyeAngahe: 0,
  isSubmiting: false,
  storeId: [], // Initialize the storeId array
  setName: (newName: string) =>
    set(() => ({
      name: newName,
    })),
  setproductType: (productType: string) =>
    set(() => ({
      productType: productType,
    })),
  setPhone: (newPhone: number) =>
    set(() => ({
      phone: newPhone,
    })),
  setStock: (value: number) =>
    set(() => ({
      stock: value,
    })),
  setByoseHamwe: (byoseHamwe: number) =>
    set(() => ({
      byoseHamwe: byoseHamwe,
    })),
  setAratwaraZingahe: (newAratwaraZingahe: number) =>
    set(() => ({
      aratwaraZingahe: newAratwaraZingahe,
    })),
  setYishyuyeAngahe: (newYishyuyeAngahe: number) =>
    set(() => ({
      yishyuyeAngahe: newYishyuyeAngahe,
    })),
  addToStoreId: (id: Id<"product">) =>
    set((state) => ({
      storeId: [...state.storeId, id], // Append new ID to storeId array
    })),
  resetStoreId: () =>
    set(() => ({
      storeId: [], // Reset storeId to an empty array
    })),
  setReset: () =>
    set(() => ({
      yishyuyeAngahe: 0,
      name: "",
      phone: undefined,
      aratwaraZingahe: undefined,
      storeId: [], // Reset storeId along with other fields
    })),
  setisSubmiting: (value: boolean) =>
    set(() => ({
      isSubmiting: value,
    })),
}));

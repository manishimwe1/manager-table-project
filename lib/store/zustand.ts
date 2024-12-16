import { Id } from "@/convex/_generated/dataModel";
import { create } from "zustand"; // No need to import 'set' from "zod"

export interface ProductInfo {
  id: Id<"product">; // Product ID
  byoseHamwe: number; // Total amount
  aratwaraZingahe: number; // Quantity taken
  yishyuyeAngahe: number; // Amount paid
  productType: string; // Type of product
  ingano: number; // Size/quantity
  ukonyigurishaKuriDetail: number; // Amount left
  igicuruzwa: string; // Product name
}

interface ClientInfo {
  productData: ProductInfo[]; // Array to store product information
  addProduct: (newProduct: ProductInfo) => void; // Add a product to the array
  updateProduct: (id: Id<"product">, updates: Partial<ProductInfo>) => void; // Update a product by ID
  removeProduct: (id: Id<"product">) => void; // Remove a product by ID
  resetProducts: () => void; // Reset the entire product array
  name: string; // Client name
  phone: number; // Client phone number
  stock: number; // Stock (needs initialization)
  isSubmitting: boolean; // Submission status
  setName: (newName: string) => void; // Set client name
  setPhone: (newPhone: number) => void; // Set client phone
  setReset: () => void; // Reset all client-related fields
  setIsSubmitting: (value: boolean) => void; // Set submission status
}

export const useClientInfoStore = create<ClientInfo>((set) => ({
  name: "",
  phone: 0,
  stock: 0, // Initialize stock as 0
  isSubmitting: false, // Initialize submission status
  productData: [],
  addProduct: (product) =>
    set((state) => ({
      productData: [...state.productData, product],
    })),
  updateProduct: (id, updatedProduct) =>
    set((state) => ({
      productData: state.productData.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      ),
    })),
  resetProductData: () => set({ productData: [] }),

  removeProduct: (id: Id<"product">) =>
    set((state) => ({
      productData: state.productData.filter((product) => product.id !== id),
    })),

  // Reset the product array
  resetProducts: () =>
    set(() => ({
      productData: [],
    })),

  // Set the client's name
  setName: (newName: string) =>
    set(() => ({
      name: newName,
    })),
 fnnshed
  // Set the client's phone number
  setPhone: (newPhone: number) =>
    set(() => ({
      phone: newPhone,
    })),

  // Reset all client-related fields
  setReset: () =>
    set(() => ({
      productData: [], // Reset product data
      name: "", // Reset client name
      phone: 0, // Reset client phone
      stock: 0, // Reset stock
      isSubmitting: false, // Reset submission status
    })),

  // Set the submission status
  setIsSubmitting: (value: boolean) =>
    set(() => ({
      isSubmitting: value,
    })),
}));

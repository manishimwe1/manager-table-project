import { Id } from "@/convex/_generated/dataModel";
import { TableRowType } from "@/types";
import { Row } from "@tanstack/react-table";
import { create } from "zustand";

export interface ProductInfo {
  id: Id<"product">; // Product ID
  byoseHamwe: number; // Total amount
  aratwaraZingahe: number; // Quantity taken
  yishyuyeAngahe: number; // Amount paid
  productType: string; // Type of product
  ingano: number; // Size/quantity
  ukonyigurishaKuriDetail: number; // Amount left
  igicuruzwa: string; // Product name
  activeRow: Row<TableRowType>;
}

interface ClientInfo {
  productData: ProductInfo[]; // Array to store product information
  addProduct: (newProduct: ProductInfo) => void; // Add a product to the array
  updateProduct: (id: Id<"product">, updates: Partial<ProductInfo>) => void; // Update a product by ID
  removeProduct: (id: Id<"product">) => void; // Remove a product by ID
  resetProducts: () => void; // Reset the entire product array
  name: string; // Client name
  factureNumber: number; // Client phone number
  stock: number; // Stock (needs initialization)
  isSubmitting: boolean; // Submission status
  setName: (newName: string) => void; // Set client name
  setFactureNumber: (newPhone: number) => void; // Set client phone
  setReset: () => void; // Reset all client-related fields
  setIsSubmitting: (value: boolean) => void; // Set submission status
}

export const useClientInfoStore = create<ClientInfo>((set) => ({
  productData: [], // Initialize product data as an empty array
  name: "",
  factureNumber: 0,
  stock: 0, // Initialize stock as 0
  isSubmitting: false, // Initialize submission status

  // Add a new product to the array
  addProduct: (newProduct: ProductInfo) =>
    set((state) => {
      const exists = state.productData.some(
        (product) => product.id === newProduct.id
      );
      if (exists) return state; // Prevent duplicate
      return {
        productData: [...state.productData, newProduct],
      };
    }),

  // Update a specific product by ID
  updateProduct: (id: Id<"product">, updates: Partial<ProductInfo>) =>
    set((state) => {
      const exists = state.productData.some((product) => product.id === id);
      if (!exists) {
        console.warn(`Product with id ${id} not found`);
        return state; // Return unchanged state
      }
      return {
        productData: state.productData.map((product) =>
          product.id === id ? { ...product, ...updates } : product
        ),
      };
    }),

  // Remove a product from the array by ID
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

  // Set the client's phone number
  setFactureNumber: (factureNumber: number) =>
    set(() => ({
      factureNumber: factureNumber,
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

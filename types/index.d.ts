export type ProductType =
  | {
      _id: Id<"product">;
      _creationTime: number;
      igicuruzwa: string;
      ikiranguzo: number;
      ingano: number;
      total: number;
      wishyuyeAngahe: number;
      status: string;
    }[]
  | undefined;

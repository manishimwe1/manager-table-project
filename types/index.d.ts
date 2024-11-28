export type ProductType =
  | {
      _id: Id<"product">;
      _creationTime: number;
      igicuruzwa: string;
      ikiranguzo: number;
      ingano: number;
      uzishyuraAngahe: number;
      ukonyigurisha: number;
      status: boolean;
    }[]
  | undefined;

export type ItemType = {
  _id: Id<"product">;
  _creationTime: number;
  igicuruzwa: string;
  ikiranguzo: number;
  ingano: number;
  total: number;
  wishyuyeAngahe: number;
  status: string;
};

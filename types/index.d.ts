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

export interface TableRowType {
  _id: Id<"product">;
  _creationTime: number;
  igicuruzwa: string;
  ingano: number;
  ikiranguzo: string;
  ukonyigurisha: string;
  customerName?: string;
  arashaka?: string;
  yishyuyeAngahe?: string;
  status?: string;
}

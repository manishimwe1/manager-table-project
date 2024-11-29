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
  ikiranguzo: number;
  ukonyigurisha: number;
  customerName?: string;
  customerPhone: number;
  arashaka?: string;
  uzishyuraAngahe?: number;
  yishyuyeAngahe?: number;
  status?: boolean;
  arashyuye: boolean;
}

uzishyuraAngahe: 15000;

export interface PurchaseType {
  _id: Id<"product">;
  _creationTime: number;
  igicuruzwa: string;
  ikiranguzo: number;
  ingano: number;
  uzishyuraAngahe: number;
  status: boolean;
  ukonyigurisha: number;
}
[] | undefined;
export interface Purchase {
  _id: Id<"product">;
  _creationTime: number;
  igicuruzwa: string;
  ikiranguzo: number;
  ingano: number;
  uzishyuraAngahe: number;
  status: boolean;
  ukonyigurisha: number;
}

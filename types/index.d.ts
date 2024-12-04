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
  inyungu: number;
  ndanguyeZingahe: number;
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
  inyungu: number;
}
export type ProductType = {
  _id: Id<"product">;
  _creationTime: number;
  igicuruzwa: string;
  ikiranguzo: number;
  ingano: number;
  uzishyuraAngahe: number;
  ukonyigurisha: number;
  status: boolean;
  inyungu: number;
};

export interface Client {
  _id: Id<"client">;
  productId: Id<"product">;
  _creationTime: number;
  igicuruzwa: string;
  name: string;
  phone: number | undefined;
  aratwaraZingahe: number;
  yishyuyeAngahe: number;
  nideni: boolean;
}

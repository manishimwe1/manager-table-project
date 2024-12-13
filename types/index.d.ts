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
  ukonyigurishaKuriDetail: number;
  customerName?: string;
  customerPhone: number;
  arashaka?: string;
  uzishyuraAngahe?: number;
  yishyuyeAngahe?: number;
  status?: boolean;
  arashyuye: boolean;
  ibyoUranguyeType: string;
  byoseHamwe: number;
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
  ukonyigurishaKuriDetail: number;
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
  ukonyigurishaKuriDetail: number;
  inyungu: number;
}
export type ProductType = {
  _id: Id<"product">;
  _creationTime: number;
  igicuruzwa: string;
  ikiranguzo: number;
  ingano: number;
  uzishyuraAngahe: number;
  status: boolean;
  ukonyigurishaKuriDetail: number;
  byoseHamwe: number;
  inyungu: number;
  ndanguyeZingahe: number;
  userId: string;
  ibyoUranguyeType: string;
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

export interface outOfStock {
  _id: Id<"product">;
  _creationTime: number;
  igicuruzwa: string;
  ikiranguzo: number;
  ingano: number;
  uzishyuraAngahe: number;
  status: boolean;
  ukonyigurishaKuriDetail: number;
  inyungu: number;
  ndanguyeZingahe: number;
}

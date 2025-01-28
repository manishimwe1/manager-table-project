export type ItemType = {
  _id: Id<"product">;
  _creationTime: number;
  igicuruzwa: string;
  ikiranguzo: number;
  ingano: number;
  total: number;
  wishyuyeAngahe: number;
  ndanguyeGute: string | undefined;
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
  ndanguyeGute?: strin | undefinedgn;
  arashyuye: boolean;
  ibyoUranguyeType: string;
  byoseHamwe: number;
}

export interface PurchaseType {
  _id: Id<"product">;
  _creationTime: number;
  igicuruzwa: string;
  ikiranguzo: number;
  ingano: number;
  uzishyuraAngahe: number;
  ndanguyeGute: string | undefined;
  ukonyigurishaKuriDetail: number;
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
  ndanguyeGute: string | undefined;
  ukonyigurishaKuriDetail: number;
}
export type ProductType = {
  _id: Id<"product">;
  _creationTime: number;
  igicuruzwa: string;
  ikiranguzo: number;
  ingano: number;
  uzishyuraAngahe: number;
  ndanguyeGute: string | undefined;
  ukonyigurishaKuriDetail: number;
  byoseHamwe: number;
  ndanguyeZingahe: number;
  userId: string;
  ibyoUranguyeType: string;
  inganoYizoNishyuye: number;
  wishyuyeAngahe: number;
  ayomazeGucuruza?: number;
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
  yishyuye: boolean;
  yishyuyezingahe?: number;
  amazeKwishyura?: number;
  facture: number;
  userId: Id<"user">;
  ukoNyigurisha?: number;
}

export interface outOfStock {
  _id: Id<"product">;
  _creationTime: number;
  igicuruzwa: string;
  ikiranguzo: number;
  ingano: number;
  uzishyuraAngahe: number;
  ndanguyeGute: string | undefined;
  ukonyigurishaKuriDetail: number;
  ndanguyeZingahe: number;
}
export type ProductType = {
  _id: Id<"product">;
  _creationTime: number;
  igicuruzwa: string;
  ikiranguzo: number;
  ingano: number;
  uzishyuraAngahe: number;
  ndanguyeGute: string | undefined;
  ukonyigurishaKuriDetail: number;
  byoseHamwe: number;
  ndanguyeZingahe: number;
  userId: string;
  ibyoUranguyeType: string;
  inganoYizoNishyuye: number;
  wishyuyeAngahe: number;
  ayomazeGucuruza?: number;
};
export type NdanguyeGute = {
  nishyuyeCash: "nishyuyeCash";
  mfasheIdeni: "mfasheIdeni";
  nishyuyeMake: "nishyuyeMake";
  undefined;
};

export interface IngaruProductType {
  _id: Id<"ingaruProduct">;
  _creationTime: number;
  userId: string;
  name: string;
  phone: number;
  productId: Id<"product">;
  inganoYizoAgaruye: number;
  factureNumber: number;
  ayoyariYishyuye: number;
}

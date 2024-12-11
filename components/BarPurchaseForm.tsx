import React from "react";
import { DataTable } from "./barPurchaseForm/DataTable";
import { columns } from "./barPurchaseForm/columns";

const BarPurchaseForm = () => {
  const data = [
    {
      igicuruzwa: "primus",
      ikiranguzo: 10000,
      ingano: 20,
      uzishyuraAngahe: 15000,
      status: true,
      ukonyigurisha: 1300,
      inyungu: 10000,
      ndanguyeZingahe: 10,
    },
  ];
  return (
    <div className="w-full ">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default BarPurchaseForm;

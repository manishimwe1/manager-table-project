"use client";

import { columns } from "@/components/amadeni/columns";
import { DataTable } from "@/components/amadeni/DataTable";
import HeaderSection from "@/components/HeaderSection";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";

const IdeniPage = () => {
  const Client = useQuery(api.clientName.getClientByIden);
  console.log(Client);

  return (
    <section className="w-full mt-2">
      <HeaderSection title="Urutonde rw'abagufitiye ideni" />
      <DataTable columns={columns} data={Client || []} />
    </section>
  );
};

export default IdeniPage;

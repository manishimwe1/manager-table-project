"use client";

import { columns } from "@/components/amadeni/columns";
import { DataTable } from "@/components/amadeni/DataTable";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";

const IdeniPage = () => {
  const IdenClient = useQuery(api.clientName.getClientByIden);
  console.log(IdenClient);

  return (
    <section className="w-full mt-2">
      <DataTable columns={columns} data={IdenClient || []} />
    </section>
  );
};

export default IdeniPage;

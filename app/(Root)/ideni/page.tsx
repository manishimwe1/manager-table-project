"use client";

import { columns } from "@/components/amadeni/columns";
import { DataTable } from "@/components/amadeni/DataTable";
import HeaderSection from "@/components/HeaderSection";
import SearchBox from "@/components/SearchBox";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useSession } from "next-auth/react";
import React, { useMemo, useState } from "react";

const IdeniPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const session = useSession();
    const userId = session.data?.user;
  
    // Fetch all queries (hooks must always be called)
    const user = useQuery(api.user.getUserIndb, { email: userId?.email || "" });
  const Client = useQuery(api.clientName.getClientByIden,{userId:user?._id as Id<"user">});

  const filteredData = useMemo(() => {
    if (!searchValue) return Client;
    return Client?.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, Client]);

  return (
    <section className="w-full mt-2 space-y-4">
      <HeaderSection title="Urutonde rw'abagufitiye ideni" />
      <div className=" flex items-center justify-between  w-full">
        <p className="text-blue-400 text-nowrap hidden lg:flex ">
          Byose hamwe: {Client?.length}
        </p>
        <div className="lg:w-[600px] w-full">
          <SearchBox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </div>
      </div>
      <DataTable columns={columns} data={filteredData || []} />
    </section>
  );
};

export default IdeniPage;

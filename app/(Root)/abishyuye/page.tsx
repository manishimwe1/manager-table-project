"use client";

import { columns } from "@/components/amadeni/columns";
import { DataTable } from "@/components/amadeni/DataTable";
import HeaderSection from "@/components/HeaderSection";
import SearchBox from "@/components/SearchBox";
import SkeletonLoader from "@/components/SkeletonLoader";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useMemo, useState } from "react";

const AbishyuyePage = () => {
  const [searchValue, setSearchValue] = useState("");

  const session = useSession();
  const userId = session.data?.user;

  // Fetch user from the database
  const user = useQuery(api.user.getUserIndb, { email: userId?.email! });

  // Fetch clients who paid
  const Client = useQuery(api.clientName.getClientWhoPaid, {
    userId: user?._id!,
  });

  const filteredData = useMemo(() => {
    if (!searchValue) return Client;
    return Client?.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, Client]);

  // Loading state
  if (session.status === "loading") {
    return <SkeletonLoader />;
  }

  // Redirect if the user is not authenticated
  if (!userId) {
    redirect("/login");
  }

  return (
    <section className="w-full mt-2 space-y-4">
      <HeaderSection title="Urutonde rw'abishyuye ideni" />
      <div className=" flex items-center justify-between  w-full">
        <p className="text-blue-400 text-nowrap hidden lg:flex ">
          Bose hamwe: {Client?.length}
        </p>
        <div className="lg:w-[600px] w-full">
          <SearchBox
            placeholder="Shaka izina..."
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </div>
        <div className="flex items-center justify-end ">
          <p className="font-light text-nowrap ">
            Inyungu:{" "}
            <span className="text-green-600">
              {filteredData
                ?.reduce((total, item) => total + item?.amazeKwishyura!, 0)
                .toLocaleString()}{" "}
              Rwf
            </span>
          </p>
        </div>
      </div>
      <DataTable columns={columns} data={filteredData || []} />
    </section>
  );
};

export default AbishyuyePage;

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

  // Fetch all products
  const user = useQuery(api.user.getUserIndb, { email: userId?.email! });

  const Client = useQuery(api.clientName.getClientWhoPaid, {
    userId: user?._id!,
  });

  if (session.status === "loading") return <SkeletonLoader />;

  // Handle unauthenticated state
  if (!userId) {
    redirect("/login");
    return null; // Ensure React knows the component renders nothing
  }

  const filteredData = useMemo(() => {
    if (!searchValue) return Client;
    return Client?.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, Client]);

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
      </div>
      <DataTable columns={columns} data={filteredData || []} />
    </section>
  );
};

export default AbishyuyePage;

"use client";

import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import HeaderSection from "@/components/HeaderSection";
import { columns } from "@/components/ibyaranguwe/columns";
import { DataTable } from "@/components/ibyaranguwe/DataTable";
import SearchBox from "@/components/SearchBox";
import { api } from "@/convex/_generated/api";
import { useClientInfoStore } from "@/lib/store/zustand";
import { IngaruProductType, ProductType } from "@/types";
import { useQuery } from "convex/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const IngaruPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const { openDrawer, setOpenDrawer } = useClientInfoStore();
  const session = useSession();
  const userId = session.data?.user;

  // Move conditional routing logic before hooks
  useEffect(() => {
    if (session.status !== "loading" && !userId) {
      redirect("/login");
    }
  }, [session.status, userId]);

  // Always call hooks in the same order, regardless of conditions
  const user = useQuery(api.user.getUserIndb, {
    email: userId?.email ?? undefined,
  });
  const data: IngaruProductType[] | undefined = useQuery(
    api.ingaruProduct.getIngaruProduct,
    {
      userId: user?._id,
    }
  );
  console.log(openDrawer, "openDrawer");
  const filteredData = useMemo(() => {
    if (!searchValue) return data;
    return data?.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, data]);
  console.log(data);
  return (
    <section className="w-full mt-2 space-y-4 px-2">
      <HeaderSection title="Ibicuruzwa byagarutse muri Stock" />

      {data?.length === 0 ? (
        <EmptyPlaceholder
          label="Ntangaru ufite muri stock"
          link="/ibyagurishijwe"
          title="Ntangaru ufite muri stock "
        />
      ) : (
        <>
          <div className="flex items-center justify-between w-full">
            <p className="text-blue-400 text-nowrap hidden lg:flex">
              Byose hamwe: {data?.length}
            </p>
            <div className="lg:w-[600px] w-full">
              <SearchBox
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            </div>
          </div>
          <DataTable columns={columns} data={filteredData || []} />
        </>
      )}
    </section>
  );
};

export default IngaruPage;

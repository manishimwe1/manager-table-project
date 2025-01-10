"use client";

import HeaderSection from "@/components/HeaderSection";
import { columns } from "@/components/ibyaranguwe/columns";
import { DataTable } from "@/components/ibyaranguwe/DataTable";
import SearchBox from "@/components/SearchBox";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ProductType } from "@/types";
import { useQuery } from "convex/react";
import { useSession } from "next-auth/react";
import React, { useMemo, useState } from "react";

const NdanguraIdeniPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const session = useSession();
  const userId = session.data?.user;

  // Fetch all queries (hooks must always be called)
  const user = useQuery(api.user.getUserIndb, { email: userId?.email || "" });
  const product: ProductType[] | undefined = useQuery(
    api.product.getProductInIdeni,
    {
      userId: user?._id as Id<"user">,
    }
  );

  const filteredData = useMemo(() => {
    if (!searchValue) return product;
    return product?.filter((item) =>
      item.igicuruzwa.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, product]);

  return (
    <section className="w-full mt-2 space-y-4">
      <HeaderSection title="Amadeni mfite ndangura" />
      <div className=" flex items-center justify-between  w-full flex-row-reverse lg:flex-row">
        <p className="text-blue-400 text-nowrap lg:text-base text-sm ">
          Yose hamwe: {product?.length}
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

export default NdanguraIdeniPage;

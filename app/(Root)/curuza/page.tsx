"use client";

import CollapsibleComponents from "@/components/collapsibleComponents";
import DataComponents from "@/components/DataComponents";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import SearchBox from "@/components/SearchBox";
import SkeletonLoader from "@/components/SkeletonLoader";
import { api } from "@/convex/_generated/api";
import { formatToday, getTranslatedDay } from "@/lib/utils";
import { ProductType } from "@/types";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useMemo, useState } from "react";

const SalesPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const session = useSession();

  const userId = session.data?.user;

  // Fetch all products
  const user = useQuery(api.user.getUserIndb, { email: userId?.email! });
  const data: ProductType[] | undefined = useQuery(api.product.getProduct, {
    userId: user?._id!,
  });

  if (session.status === "loading") return <SkeletonLoader />;

  // Handle unauthenticated state
  if (!userId) {
    redirect("/login");
    return null; // Ensure React knows the component renders nothing
  }
  // Filter data based on search input
  const filteredData = useMemo(() => {
    if (!searchValue) return data;
    return data?.filter((item) =>
      item.igicuruzwa.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, data]);

  // Handle cases where data is empty or undefined
  if (!data) {
    return <Loader2 className="animate-spin mx-auto my-20" />;
  }

  if (data.length === 0) {
    return (
      <EmptyPlaceholder
        title="Ntagicuruzwa kiri muri stock"
        link="/rangura"
        label="Rangura"
      />
    );
  }

  return (
    <section className="flex flex-col w-full h-full">
      <CollapsibleComponents
        title={`Urutonde rw'ibicuruzwa ${getTranslatedDay(formatToday())}`}
      >
        <div className="w-full flex items-center justify-end">
          <div className="flex justify-end items-end gap-4 py-4 w-[600px]">
            {/* Search Input */}
            <SearchBox
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
            <p className="w-fit whitespace-nowrap text-sm flex justify-end items-center text-blue-700 font-bold pr-10">
              Number of items:{" "}
              <span className="text-lg ml-2">{filteredData?.length}</span>
            </p>
          </div>
        </div>
        {/* Data Display */}
        <div>
          {filteredData && filteredData.length > 0 ? (
            //@ts-ignore
            <DataComponents dataByDate={filteredData} />
          ) : (
            <p className="text-center text-gray-500">
              Nta bicuruzwa bibonetse.
            </p>
          )}
        </div>
      </CollapsibleComponents>
    </section>
  );
};

export default SalesPage;

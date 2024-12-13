"use client";

import CollapsibleComponents from "@/components/collapsibleComponents";
import DataComponents from "@/components/DataComponents";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import SearchBox from "@/components/SearchBox";
import SkeletonLoader from "@/components/SkeletonLoader";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { formatToday, getTranslatedDay } from "@/lib/utils";
import { ProductType } from "@/types";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";

const SalesPage = () => {
  const router = useRouter();
  const session = useSession();
  const [searchValue, setSearchValue] = useState("");

  const userId = session.data?.user;

  // Always call hooks in the same order
  const user = useQuery(api.user.getUserIndb, {
    email: userId?.email || "",
  });

  const data: ProductType[] | undefined = useQuery(api.product.getProduct, {
    userId: user?._id as Id<"user">,
  });

  useEffect(() => {
    // Handle unauthenticated state
    if (session.status === "unauthenticated") {
      router.push("/login");
    }
  }, [session.status, router]);

  const filteredData = useMemo(() => {
    if (!searchValue) return data;
    return data?.filter((item) =>
      item.igicuruzwa.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, data]);

  // Early return for loading state
  if (session.status === "loading") {
    return <SkeletonLoader />;
  }

  // Handle cases where data is loading or empty
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
    <section className="flex flex-col w-full h-full lg:pl-0 ">
      <CollapsibleComponents
        title={`Urutonde rw'ibicuruzwa ${getTranslatedDay(formatToday())}`}
      >
        <div className="w-full flex items-center justify-end">
          <div className="flex justify-end items-end gap-4 p-4 w-[600px]">
            <SearchBox
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
            <p className="w-fit whitespace-nowrap text-sm md:flex justify-end items-center text-blue-700 font-bold pr-10 hidden ">
              Byose hamwe:{" "}
              <span className="text-lg ml-2">{filteredData?.length}</span>
            </p>
          </div>
        </div>
        <div>
          {filteredData && filteredData.length > 0 ? (
            <DataComponents dataByDate={filteredData} />
          ) : (
            <p className="text-center text-gray-500">
              Nta bicuruzwa biri muri stock.
            </p>
          )}
        </div>
      </CollapsibleComponents>
    </section>
  );
};

export default SalesPage;

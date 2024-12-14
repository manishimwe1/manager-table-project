"use client";

import AddSereveye from "@/components/AddSereveye";
import CollapsibleComponents from "@/components/collapsibleComponents";
import DataComponents from "@/components/DataComponents";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import SearchBox from "@/components/SearchBox";
import SkeletonLoader from "@/components/SkeletonLoader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { formatToday, getTranslatedDay } from "@/lib/utils";
import { ProductType } from "@/types";
import { useQuery } from "convex/react";
import { Plus, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect, ReactNode } from "react";

const SalesPage: React.FC = () => {
  const router = useRouter();
  const session = useSession();
  const [searchValue, setSearchValue] = useState<string>("");
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tableOpen, setTableOpen] = useState<boolean>(false);
  const [addSereveye, setAddSereveye] = useState<number>(0);

  const userId = session.data?.user;

  // Queries
  const user = useQuery(api.user.getUserIndb, {
    email: userId?.email || "",
  });

  const data: ProductType[] | undefined = useQuery(api.product.getProduct, {
    userId: user?._id as Id<"user">,
  });

  const productByType: ProductType[] | undefined = useQuery(
    api.product.getProductByProductType,
    {
      userId: user?._id as Id<"user">,
    }
  );

  const productByDetail: ProductType[] | undefined = useQuery(
    api.product.getProductByKuriDetail,
    {
      userId: user?._id as Id<"user">,
    }
  );

  // Redirect unauthenticated users
  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/login");
    }
  }, [session.status, router]);

  // Filter products based on search value
  const filteredData = useMemo(() => {
    if (!searchValue) return data;
    return data?.filter((item) =>
      item.igicuruzwa.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, data]);

  // Helpers to identify product groups
  const hasDetailProducts = useMemo(
    () =>
      filteredData?.some((item) =>
        item.ibyoUranguyeType.includes("Kuri detail")
      ) || false,
    [filteredData]
  );

  const hasBulkProducts = useMemo(
    () =>
      filteredData?.some(
        (item) =>
          item.ibyoUranguyeType.includes("Ikesi x 20") ||
          item.ibyoUranguyeType.includes("Ikesi x 12")
      ) || false,
    [filteredData]
  );

  // Reusable collapsible component rendering function
  const renderCollapsible = (
    title: string,
    data: ProductType[] | undefined,
    isOpen: boolean,
    toggleOpen: () => void,
    isOpenInput?: boolean,
    setIsOpenInput?: () => void
  ): ReactNode => (
    <CollapsibleComponents title={title} isOpen={isOpen} setIsOpen={toggleOpen}>
      <div className="w-full flex items-center flex-col justify-end">
        <div className="flex items-center w-full justify-end ">
          <div className="flex justify-end items-end gap-4 p-4 w-[600px] ">
            <SearchBox
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
            <p className="w-fit whitespace-nowrap text-sm md:flex justify-end items-center text-blue-700 font-bold pr-10 hidden">
              Byose hamwe:{" "}
              <span className="text-lg ml-2">{filteredData?.length || 0}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1 md:gap-2 lg:flex-row w-full h-full justify-between">
          <div className="w-full h-full flex flex-col gap-2">
            <div className="border w-full h-full ">
              <AddSereveye
                tableOpen={tableOpen}
                setTableOpen={setTableOpen}
                addSereveye={addSereveye}
                setAddSereveye={setAddSereveye}
              />
            </div>
            {addSereveye > 0 && (
              <div className="border w-full h-full ">
                <AddSereveye
                  tableOpen={tableOpen}
                  setTableOpen={setTableOpen}
                  addSereveye={addSereveye}
                  setAddSereveye={setAddSereveye}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {tableOpen && <DataComponents dataByDate={data} />}
    </CollapsibleComponents>
  );

  // Early return for loading and error states
  if (session.status === "loading") {
    return <SkeletonLoader />;
  }

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

  // Render multiple collapsible items with toggling functionality
  return (
    <section className="flex flex-col w-full h-full lg:pl-0">
      {hasDetailProducts &&
        renderCollapsible(
          `Urutonde rw'ibicuruzwa ${getTranslatedDay(formatToday())} (Kuri Detail)`,
          productByDetail,
          isDetailOpen,
          () => setIsDetailOpen(!isDetailOpen)
        )}
      {hasBulkProducts &&
        renderCollapsible(
          `Urutonde rw'ibicuruzwa ${getTranslatedDay(formatToday())} (Bulk Products)`,
          productByType,
          isOpen,
          () => setIsOpen(!isOpen)
        )}
    </section>
  );
};

export default SalesPage;

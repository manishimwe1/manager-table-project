"use client";

import AddSereveye from "@/components/AddSereveye";
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
import { Plus, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect, ReactNode } from "react";

const SalesPage: React.FC = () => {
  const router = useRouter();
  const session = useSession();

  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tableOpen, setTableOpen] = useState<boolean>(false);
  const [addSereveye, setAddSereveye] = useState<
    { id: number; tableOpen: boolean }[]
  >([]);

  const userId = session.data?.user;

  // Queries
  const user = useQuery(api.user.getUserIndb, {
    email: userId?.email || "",
  });

  const data: ProductType[] | undefined = useQuery(api.product.getProduct, {
    userId: user?._id as Id<"user">,
  });

  // Redirect unauthenticated users
  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/login");
    }
  }, [session.status, router]);

  // Memoize the rendering of additional components for performance
  const renderAddSereveye = useMemo(() => {
    return addSereveye.map((item, index) => (
      <AddSereveye
        key={item.id}
        index={index}
        data={data}
        tableOpen={item.tableOpen}
        setTableOpen={(open) =>
          setAddSereveye((prev) =>
            prev.map((entry, i) =>
              i === index ? { ...entry, tableOpen: open } : entry
            )
          )
        }
        addSereveye={addSereveye}
        setAddSereveye={setAddSereveye}
        showRemove={true}
      />
    ));
  }, [addSereveye, data]);

  // Helpers to identify product groups
  const hasDetailProducts = useMemo(
    () =>
      data?.some((item) => item.ibyoUranguyeType.includes("Kuri detail")) ||
      false,
    [data]
  );

  const hasBulkProducts = useMemo(
    () =>
      data?.some(
        (item) =>
          item.ibyoUranguyeType.includes("Ikesi x 20") ||
          item.ibyoUranguyeType.includes("Ikesi x 12")
      ) || false,
    [data]
  );

  // Reusable collapsible component rendering function
  const renderCollapsible = (
    title: string,
    data: ProductType[] | undefined,
    isOpen: boolean,
    toggleOpen: () => void
  ): ReactNode => (
    <CollapsibleComponents title={title} isOpen={isOpen} setIsOpen={toggleOpen}>
      <div className="w-full flex items-center flex-col justify-end">
        <div className="flex flex-col gap-1 md:gap-2 lg:flex-row w-full h-full justify-between">
          <div className="w-full h-full flex flex-col gap-2">
            <div className=" w-full flex flex-col h-full">
              {addSereveye.length >= 0 && (
                <AddSereveye
                  index={0}
                  data={data}
                  tableOpen={tableOpen}
                  setTableOpen={setTableOpen}
                  addSereveye={addSereveye}
                  setAddSereveye={setAddSereveye}
                />
              )}
            </div>
            {renderAddSereveye}
          </div>
        </div>
      </div>
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
      {renderCollapsible(
        `Urutonde rw'ibicuruzwa ${getTranslatedDay(formatToday())} `,
        data,
        isOpen,
        () => setIsOpen(!isOpen)
      )}
    </section>
  );
};

export default SalesPage;

"use client";

import AddSereveye from "@/components/AddSereveye";
import CollapsibleComponents from "@/components/collapsibleComponents";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import SkeletonLoader from "@/components/SkeletonLoader";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { formatToday, getTranslatedDay } from "@/lib/utils";
import { ProductType } from "@/types";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const SalesPage: React.FC = () => {
  const router = useRouter();
  const session = useSession();
  const [addSereveye, setAddSereveye] = useState<
    { id: number; tableOpen: boolean; name: string }[]
  >([{ id: 1, tableOpen: false, name: "" }]);

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

  // Reusable collapsible component rendering function
  const renderCollapsible = (
    title: string,
    data: ProductType[] | undefined
  ): ReactNode => (
    <CollapsibleComponents title={title}>
      <div className="w-full flex items-center flex-col justify-end">
        <div className="flex flex-col gap-1 md:gap-2 lg:flex-row w-full h-full justify-between">
          <div className="w-full h-full flex flex-col gap-2">
            <div className="w-full flex flex-col h-full">
              <AddSereveye
                data={data}
                FactureNumber={1}
                addSereveye={addSereveye}
                setAddSereveye={setAddSereveye}
              />
            </div>
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

  // Render the page
  return (
    <section className="flex flex-col w-full h-full lg:pl-0">
      {renderCollapsible(
        `Urutonde rw'ibicuruzwa ${getTranslatedDay(formatToday())}`,
        data
      )}
    </section>
  );
};

export default SalesPage;

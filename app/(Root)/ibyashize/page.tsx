"use client";
import HeaderSection from "@/components/HeaderSection";
import { columns } from "@/components/ibyashize/columns";
import { DataTable } from "@/components/ibyashize/DataTable";
import SkeletonLoader from "@/components/SkeletonLoader";
import { api } from "@/convex/_generated/api";
import { ProductType } from "@/types";
import { useQuery } from "convex/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const IbyashizePage = () => {
  const session = useSession();
  const userId = session.data?.user;

  // Fetch all products
  const user = useQuery(api.user.getUserIndb, { email: userId?.email! });

  const outOfStock: ProductType[] | undefined = useQuery(
    api.product.getProductOutOfStock,
    { userId: user?._id! }
  );

  if (session.status === "loading") return <SkeletonLoader />;

  // Handle unauthenticated state
  if (!userId) {
    redirect("/login");
    return null; // Ensure React knows the component renders nothing
  }

  return (
    <section className="w-full mt-2">
      <HeaderSection title="Ibyashize muri Stock" />

      <DataTable columns={columns} data={outOfStock || []} />
    </section>
  );
};

export default IbyashizePage;

"use client";
import React from "react";
import HomeCard from "./HomeCard";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ProductType } from "@/types";
import SkeletonLoader from "./SkeletonLoader";
import { Id } from "@/convex/_generated/dataModel";

const CardComponents = () => {
  const session = useSession();
  const userId = session.data?.user;

  // Fetch all queries (hooks must always be called)
  if (!userId && session.status !== "loading") {
    redirect("/login");
  }
  const user = useQuery(api.user.getUserIndb, { email: userId?.email || "" });
  const product: ProductType[] | undefined = useQuery(api.product.getProduct, {
    userId: user?._id as Id<"user">,
  });
  const outOfStock = useQuery(api.product.getProductOutOfStock, {
    userId: user?._id as Id<"user">,
  });
  const Client = useQuery(api.clientName.getClientByIden, {
    userId: user?._id as Id<"user">,
  });
  const saledProduct = useQuery(api.clientName.getSaledProduct, {
    userId: user?._id as Id<"user">,
  });
  const ClientWhoPaid = useQuery(api.clientName.getClientWhoPaid, {
    userId: user?._id as Id<"user">,
  });

  if (session.status === "loading") return <SkeletonLoader />;

  console.log(saledProduct?.length);

  return (
    <div className="flex items-center justify-between gap-4  md:flex-row flex-col-reverse ">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4  w-full ">
        <HomeCard title="Muri stock" content={product?.length} link="/stock" />
        <HomeCard
          title="Abagufitiye Ideni"
          content={Client?.length}
          link="/ideni"
        />
        <HomeCard
          title="Ibyashize muri stock"
          content={outOfStock?.length}
          link="/ibyashize"
        />
        <HomeCard
          title="Ibyagurishijwe"
          content={saledProduct?.length}
          link="/ibyagurishijwe"
        />
        <HomeCard
          title="abamaze kw'ishyura"
          content={ClientWhoPaid?.length}
          link="/abishyuye"
        />
      </div>
    </div>
  );
};

export default CardComponents;

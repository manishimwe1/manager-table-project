"use client";
import React from "react";
import HomeCard from "./HomeCard";
import CreateProduct from "./Create-product";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ProductType } from "@/types";

const CardComponents = () => {
  const session = useSession();
  const userId = session.data?.user?.id;
  if (!userId) redirect("/login");

  // Fetch all products
  const product: ProductType[] | undefined = useQuery(api.product.getProduct, {
    userId: userId,
  });
  const outOfStock = useQuery(api.product.getProductOutOfStock);
  const Client = useQuery(api.clientName.getClientByIden);

  const saledProduct = useQuery(api.clientName.getSaledProduct);
  const ClientWhoPaid = useQuery(api.clientName.getClientWhoPaid);

  if (!outOfStock) return;
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
          content={outOfStock.length}
          link="/ibyashize"
        />
        <HomeCard
          title="Nagurishijwe"
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

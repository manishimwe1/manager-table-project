"use client";
import React from "react";
import HomeCard from "./HomeCard";
import CreateProduct from "./Create-product";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const CardComponents = () => {
  const outOfStock = useQuery(api.product.getProductOutOfStock);
  const product = useQuery(api.product.getProduct);
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

"use client";
import React from "react";
import HomeCard from "./HomeCard";
import CreateProduct from "./Create-product";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const CardComponents = () => {
  const outOfStock = useQuery(api.product.getProductOutOfStock);
  const product = useQuery(api.product.getProduct);
  const IdenClient = useQuery(api.clientName.getClientByIden);

  console.log(IdenClient, "stock");

  if (!outOfStock) return;
  return (
    <div className="flex items-center justify-between gap-4  md:flex-row flex-col-reverse ">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4  w-full ">
        <HomeCard title="Muri stock" content={product?.length} link="/stock" />
        <HomeCard
          title="Abagufitiye Ideni"
          content={IdenClient?.length}
          link="/ideni"
        />
        <HomeCard
          title="Ibyashize muri stock"
          content={outOfStock.length}
          link="/"
        />
        <HomeCard title="Ibicuruzwa biri muri stock" content={5} link="/" />
        {/* <HomeCard /> */}
      </div>
      <div className="flex justify-end w-full md:w-fit">
        <CreateProduct />
      </div>
    </div>
  );
};

export default CardComponents;

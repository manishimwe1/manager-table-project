import React from "react";
import HomeCard from "./HomeCard";
import CreateProduct from "./Create-product";

const CardComponents = () => {
  return (
    <div className="flex items-center justify-between gap-4  md:flex-row flex-col-reverse ">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4  w-full ">
        <HomeCard title="Muri stock" content={5} />
        <HomeCard title="Abagufitiye Ideni" content={5} />
        <HomeCard title="Ibicuruzwa biri muri stock" content={5} />
        <HomeCard title="Ibicuruzwa biri muri stock" content={5} />
        {/* <HomeCard /> */}
      </div>
      <div className="flex justify-end w-full md:w-fit">
        <CreateProduct />
      </div>
    </div>
  );
};

export default CardComponents;

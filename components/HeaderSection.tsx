import React from "react";

const HeaderSection = ({ title }: { title: string }) => {
  return (
    <h1 className="lg:text-2xl mb-4 text-lg font-semibold px-2">{title}</h1>
  );
};

export default HeaderSection;

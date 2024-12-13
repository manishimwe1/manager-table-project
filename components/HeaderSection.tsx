import { cn } from "@/lib/utils";
import React from "react";

const HeaderSection = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h1
      className={cn(
        "lg:text-2xl mb-4 text-lg font-semibold px-2 dark:text-gray-100",
        className
      )}
    >
      {title}
    </h1>
  );
};

export default HeaderSection;

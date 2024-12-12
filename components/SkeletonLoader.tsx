import React from "react";
import { Skeleton } from "./ui/skeleton";

const SkeletonLoader = () => {
  return (
    <div className="flex w-full flex-col gap-4 mt-10 ">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4  w-full ">
        <Skeleton className="w-full h-[100px] rounded-md" />
        <Skeleton className="w-full h-[100px] rounded-md" />
        <Skeleton className="w-full h-[100px] rounded-md" />
        <Skeleton className="w-full h-[100px] rounded-md" />
      </div>
      <div className="flex gap-3 items-center">
        <Skeleton className="w-1/2 h-[30px] rounded-md" />
        <Skeleton className="w-1/2 h-[30px] rounded-md" />
      </div>
      <div className="flex gap-2 w-full ">
        <div className="flex flex-col gap-3 items-start w-full">
          <Skeleton className="w-full h-[30px] rounded-md" />
          <Skeleton className="w-full h-[30px] rounded-md" />
        </div>
        <div className="flex flex-col gap-3 items-start w-full">
          <Skeleton className="w-full h-[30px] rounded-md" />
          <Skeleton className="w-full h-[30px] rounded-md" />
        </div>
        <div className="flex flex-col gap-3 items-center">
          <Skeleton className="w-[200px] h-[30px] rounded-md" />
          <Skeleton className="w-[200px] h-[30px] rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;

import { Client } from "@/types";
import React from "react";

const ShowDetailsInIbyacurujwe = ({ items }: { items: Client[] }) => {
  return (
    <div className="flex flex-col justify-between w-full gap-2  items-start">
      <p className="text-black dark:text-gray-200 text-nowrap lg:text-sm text-sm">
        Byose hamwe: {items?.length}
      </p>
      <p className="text-stone-900 dark:text-gray-200 text-nowrap lg:text-sm text-xs">
        Total yacurujwe uyu munsi:{" "}
        <span className="text-blue-800 text-base font-bold">
          {items
            ?.reduce(
              (acc, item) => acc + item.ukoNyigurisha! * item.aratwaraZingahe,
              0
            )
            .toLocaleString()}{" "}
          rwf
        </span>
      </p>
      <p className="text-stone-900 dark:text-gray-200 text-nowrap lg:text-sm text-xs">
        Total yamadeni uyu munsi:{" "}
        <span className="text-red-500 text-base font-bold">
          {items
            ?.reduce(
              (acc, item) =>
                !item.yishyuye
                  ? acc + item.ukoNyigurisha! * item.aratwaraZingahe
                  : acc,
              0
            )
            .toLocaleString()}{" "}
          rwf
        </span>
      </p>
      <p className="text-stone-900 dark:text-gray-200 text-nowrap lg:text-sm text-xs">
        Total y'ishyuwe uyu munsi:{" "}
        <span className="text-green-500 text-base font-bold">
          {items
            ?.reduce(
              (acc, item) =>
                item.yishyuye
                  ? acc + item.ukoNyigurisha! * item.aratwaraZingahe
                  : acc,
              0
            )
            .toLocaleString()}{" "}
          rwf
        </span>
      </p>
    </div>
  );
};

export default ShowDetailsInIbyacurujwe;

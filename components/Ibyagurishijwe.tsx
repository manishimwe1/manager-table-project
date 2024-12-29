import { Loader2 } from "lucide-react";
import React, { useMemo, useState } from "react";
import { DataTable } from "./ibyagurishijwe/DataTable";
import { columns } from "./ibyagurishijwe/columns";
import { Client } from "@/types";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import SearchBox from "./SearchBox";

const Ibyagurishijwe = ({ userId }: { userId: Id<"user"> | undefined }) => {
  const [searchValue, setSearchValue] = useState("");
  const saledProduct = useQuery(api.clientName.getSaledProduct, {
    userId: userId as Id<"user">,
  });

  const filteredData = useMemo(() => {
    if (!searchValue) return saledProduct;
    return saledProduct?.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, saledProduct]);
  return (
    <>
      {filteredData &&
        (filteredData?.length !== 0 ? (
          <>
            <div className="flex items-center gap-2 py-2 justify-between">
              <div className="lg:w-[600px] w-full">
                <SearchBox
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              </div>
              <p className="font-bold text-nowrap dark:text-gray-400 ">
                Byose hamwe{" "}
                <span className="text-lg ml-2 text-blue-800">
                  {filteredData?.length}
                </span>
              </p>
            </div>
            <ul>
              <DataTable columns={columns} data={filteredData} />
            </ul>
          </>
        ) : (
          <p className="text-center mt-3 text-red-200 underline">
            Ntagicuruzwa kiragurishishwa
          </p>
        ))}
    </>
  );
};

export default Ibyagurishijwe;

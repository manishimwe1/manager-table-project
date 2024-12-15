"use client";

import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { ProductType } from "@/types";
import { ChevronUp, Loader2 } from "lucide-react";
import { DataTable } from "./saleTable/DataTable";
import { columns } from "./saleTable/columns";
import { RowSelectionState } from "@tanstack/react-table";
import SearchBox from "./SearchBox";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import SellingButton from "./SellingButton";

const DataComponents = ({
  dataByDate,
  tableOpen,
  setTableOpen,
  nameInput,
  setNameInput,
  phoneInput,
}: {
  dataByDate: ProductType[] | undefined;
  tableOpen: boolean;
  setTableOpen: (open: boolean) => void;
  nameInput: string;
  setNameInput: Dispatch<SetStateAction<string>>;
  phoneInput: string;
  setPhoneInput: Dispatch<SetStateAction<string>>;
}) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [searchValue, setSearchValue] = useState<string>("");
  const filteredData = useMemo(() => {
    if (!searchValue) return dataByDate;
    return dataByDate?.filter((item) =>
      item.igicuruzwa.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, dataByDate]);

  return (
    <div className=" w-full  py-3 h-full ">
      {dataByDate ? (
        <div className="w-full flex flex-col h-full">
          <div className="flex justify-between items-center w-full gap-2">
            <SearchBox
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
            <div
              className=" w-fit h-fit p-1 text-stone-950  text-nowrap text-sm lg:text-lg border-t-2 border-gray-200  bg-gray-100  shadow-md shadow-white dark:shadow-black/70  justify-end items-center rounded-lg dark:bg-stone-900 dark:text-gray-200 cursor-pointer group"
              onClick={() => {
                setTableOpen(!tableOpen);
              }}
            >
              <ChevronUp
                className={cn(
                  "group-hover:hover:text-stone-500 h-4 w-4",
                  !tableOpen && "rotate-180 transition-transform"
                )}
                onClick={() => setTableOpen(!tableOpen)}
              />
            </div>
          </div>
          {
            //@ts-ignore
            <DataTable columns={columns} data={filteredData || []} />
          }
          {Object.keys(rowSelection).length > 0 && (
            <div className="mt-4">
              <p>Selected Rows: {Object.keys(rowSelection).length}</p>
            </div>
          )}
          <div className="mt-4 w-full   h-full py-3 flex items-center justify-center lg:justify-end">
            <div className="w-full h-full flex flex-col justify-end  lg:w-[500px]  items-center gap-2">
              <div className="w-full h-full flex flex-col items-start  justify-between">
                <p className="text-lg dark:text-gray-200 text-stone-900">
                  Name:
                  <span className="dark:text-gray-400 text-lg  text-stone-900 capitalize ml-2">
                    {nameInput}
                  </span>
                </p>
                <p className="text-lg dark:text-gray-200 text-stone-900">
                  Phone:
                  <span className="dark:text-gray-400 text-lg  text-stone-900 capitalize ml-2">
                    {phoneInput}
                  </span>
                </p>
              </div>
              <div className="w-full lg:w-[500px] h-full border py-2 flex items-start justify-start">
                <div className="w-full h-full flex flex-col items-end justify-end gap-2">
                  <Badge className="bg-stone-950 px-2 py-1 dark:text-gray-200 text-lg hover:bg-stone-900">
                    Total:6000Rwf
                  </Badge>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="w-full h-full flex items-end justify-end border">
            <div className="w-full lg:w-[500px] h-full flex items-end justify-end ">
              <SellingButton />
            </div>
          </div>
        </div>
      ) : (
        <Loader2 className="animate-spin" />
      )}
    </div>
  );
};

export default DataComponents;

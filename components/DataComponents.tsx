"use client";

import React, {
  Dispatch,
  SetStateAction,
  use,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ProductType } from "@/types";
import { ChevronUp, Loader2 } from "lucide-react";
import { DataTable } from "./saleTable/DataTable";
import { columns } from "./saleTable/columns";
import { RowSelectionState } from "@tanstack/react-table";
import SearchBox from "./SearchBox";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import SellingButton from "./SellingButton";
import { useClientInfoStore } from "@/lib/store/zustand";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  // Access `productData` directly from the Zustand store
  const { name, phone, productData, isSubmitting } = useClientInfoStore();

  // Filter data based on the search value
  const filteredData = useMemo(() => {
    if (!searchValue) return dataByDate;
    return dataByDate?.filter((item) =>
      item.igicuruzwa.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, dataByDate]);

  // Calculate total whenever `productData` changes
  const total = useMemo(
    () =>
      productData?.reduce((acc, item) => acc + (item.yishyuyeAngahe || 0), 0) ||
      0,
    [productData]
  );
  useEffect(() => {
    console.log(productData, "in data");
  }, [productData]);
  return (
    <div className="w-full py-3 h-full">
      {dataByDate ? (
        <div className="w-full flex flex-col h-full items-center">
          <div className="flex justify-between items-center w-full gap-2">
            <SearchBox
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
            <div
              className="w-fit h-fit p-1 text-stone-950 text-nowrap text-sm lg:text-lg border-t-2 border-gray-200 bg-gray-100 shadow-md shadow-white dark:shadow-black/70 justify-end items-center rounded-lg dark:bg-stone-900 dark:text-gray-200 cursor-pointer group"
              onClick={() => setTableOpen(!tableOpen)}
            >
              <ChevronUp
                className={cn("group-hover:hover:text-stone-500 h-4 w-4")}
              />
            </div>
          </div>
          <div className="w-full h-full flex items-center justify-center overflow-x-scroll">
            {
              //@ts-ignore
              <DataTable columns={columns} data={filteredData || []} />
            }
          </div>
          {Object.keys(rowSelection).length > 0 && (
            <div className="mt-4">
              <p>Selected Rows: {Object.keys(rowSelection).length}</p>
            </div>
          )}

          <div className="w-full h-full ">
            <div className="w-full h-full flex items-center justify-between">
              <div className="w-full lg:w-1/3 h-full flex flex-col gap-2 ">
                <ScrollArea className="dark:bg-stone-950 rounded-sm dark:text-gray-200 w-full h-[120px]  flex flex-col items-start justify-center p-4">
                  <p>
                    Name:
                    <span className="dark:text-gray-400 text-lg text-stone-900 capitalize">
                      {nameInput}
                    </span>
                  </p>
                  {productData.map((product) => (
                    <div key={product.id}>
                      <p>
                        {product.igicuruzwa}:
                        <span className="dark:text-gray-400 text-base font-bold text-stone-900 capitalize ml-2">
                          {product.yishyuyeAngahe}
                        </span>
                      </p>
                    </div>
                  ))}
                </ScrollArea>
                <div className="w-full h-full flex items-start justify-start">
                  <Badge className="bg-stone-950 shadow-md shadow-stone-900 px-2 py-1 dark:text-gray-200 text-sm hover:bg-stone-900">
                    Facture
                  </Badge>
                </div>
              </div>
              <div className="w-full h-full flex flex-col justify-end lg:w-[500px] items-start gap-2 ">
                <div className="w-full h-full flex items-start justify-start">
                  <div className="w-full h-full flex flex-col items-start justify-center gap-2 ">
                    <Badge className="bg-stone-900 shadow-md shadow-stone-900 px-2 py-1 dark:text-gray-200 text-lg hover:bg-stone-900">
                      Total: {total.toLocaleString()} Rwf
                    </Badge>
                    <div className="w-full lg:w-[500px] h-full flex items-end justify-end">
                      <SellingButton />
                    </div>
                  </div>
                </div>
              </div>
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

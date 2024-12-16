import React, { Dispatch, SetStateAction, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Minus, Plus } from "lucide-react";
import DataComponents from "./DataComponents";
import { ProductType } from "@/types";
import { set } from "zod";
import { useClientInfoStore } from "@/lib/store/zustand";

const AddSereveye = ({
  tableOpen,
  setTableOpen,
  setAddSereveye,
  addSereveye,
  showRemove,
  data,
  index,
}: {
  tableOpen: boolean;
  setTableOpen: (open: boolean) => void;
  setAddSereveye: Dispatch<
    SetStateAction<{ id: number; tableOpen: boolean }[]>
  >;
  addSereveye: { id: number; tableOpen: boolean }[];
  showRemove?: boolean;
  data: ProductType[] | undefined;
  index: number;
}) => {
  const [nameInput, setnameInput] = useState("");
  const [phoneInput, setphoneInput] = useState("");
  const { setName, setPhone } = useClientInfoStore();
  return (
    <div className="flex flex-col w-full h-full p-4">
      <div className="flex items-center justify-between lg:px-4 px-2  w-full">
        <div className="flex flex-col items-start lg:flex-row lg:items-center justify-between w-full">
          <div className="flex items-center justify-between gap-2 w-full">
            <Label
              className="text-stone-950  text-nowrap text-sm lg:text-lg border-r-2 px-3 py-1 border-gray-200  bg-gray-100  shadow-md shadow-white dark:shadow-black/70  justify-end items-center rounded-lg dark:bg-stone-900 dark:text-gray-200 cursor-pointer"
              htmlFor="name"
            >
              Umukiriya
            </Label>
            <Input
              id="name"
              // onBlur={() => setTableOpen(false)}
              className="w-full flex-1 bg-transparent border dark:border-stone-700 lg:border-2  outline-none focus:outline-none focus-visible:ring-2 placeholder:text-xs px-2 dark:text-gray-200"
              value={nameInput}
              onChange={(e) => {
                setnameInput(e.target.value);
                setTableOpen(true);
              }}
              onBlur={() => setName(nameInput)}
            />
          </div>

          <p className="hidden lg:flex dark:text-stone-400">Cyagwa</p>
          <div className="flex items-center justify-between w-full">
            <Label
              className="text-stone-950  text-nowrap text-sm lg:text-lg border-r-2 px-3 py-1 border-gray-200  bg-gray-100  shadow-md shadow-white dark:shadow-black/70  justify-end items-center rounded-lg dark:bg-stone-900 dark:text-gray-200 cursor-pointer"
              htmlFor="phone"
            >
              Phone no:
            </Label>
            <Input
              id="phone"
              type="number"
              onFocus={() => setTableOpen(true)}
              value={phoneInput}
              onChange={(e) => {
                setphoneInput(e.target.value);
                setTableOpen(true);
              }}
              onBlur={() => setPhone(parseInt(phoneInput))}
              className="w-full flex-1 bg-transparent border dark:border-stone-700 lg:border-2  outline-none focus:outline-none focus-visible:ring-2 placeholder:text-xs px-2 dark:text-gray-200 "
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row w-fit h-full">
          <div
            className=" w-fit h-fit p-1 text-stone-950  text-nowrap text-sm lg:text-lg border-l-2 border-gray-200  bg-gray-100  shadow-md shadow-white dark:shadow-black/70  justify-end items-center rounded-lg dark:bg-stone-900 dark:text-gray-200 cursor-pointer group"
            onClick={() => {
              setAddSereveye((prev) => [
                ...prev,
                { id: prev.length + 1, tableOpen: false },
              ]);
            }}
          >
            <Plus className="group-hover:hover:text-stone-500 h-4 w-4" />
          </div>
          {showRemove && (
            <div
              className=" w-fit h-fit p-1 text-stone-950  text-nowrap text-sm lg:text-lg border-l-2 border-gray-200  bg-gray-100  shadow-md shadow-white dark:shadow-black/70  justify-end items-center rounded-lg dark:bg-stone-900 dark:text-gray-200 cursor-pointer group"
              onClick={() => {
                setAddSereveye((prev) => prev.slice(0, -1));
              }}
            >
              <Minus className="group-hover:hover:text-stone-500 h-4 w-4" />
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-full ">
        {tableOpen && (
          <DataComponents
            dataByDate={data}
            tableOpen={tableOpen}
            setTableOpen={setTableOpen}
            nameInput={nameInput}
            setNameInput={setnameInput}
            phoneInput={phoneInput}
            setPhoneInput={setphoneInput}
          />
        )}
      </div>
    </div>
  );
};

export default AddSereveye;

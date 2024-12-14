import React, { Dispatch, SetStateAction } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";

const AddSereveye = ({
  tableOpen,
  setTableOpen,
  setAddSereveye,
  addSereveye,
}: {
  tableOpen: boolean;
  setTableOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAddSereveye: Dispatch<SetStateAction<number>>;
  addSereveye: number;
}) => {
  return (
    <div className="flex flex-col w-full h-full p-4">
      <div className="flex items-center justify-between lg:px-4 px-2  w-full">
        <div className="flex flex-col items-start lg:flex-row lg:items-center justify-between w-full">
          <div className="flex items-center justify-between gap-2 w-full">
            <Label
              className="text-stone-950  text-nowrap text-sm lg:text-lg border-r-2 px-3 py-1 border-gray-200  bg-gray-100  shadow-md shadow-white dark:shadow-black/70  justify-end items-center rounded-lg dark:bg-stone-900 dark:text-gray-200 cursor-pointer"
              htmlFor="name"
            >
              Izina ry'aserevelle
            </Label>
            <Input
              id="name"
              onFocus={() => setTableOpen(!tableOpen)}
              className="w-full flex-1 bg-transparent border dark:border-stone-700 lg:border-2  outline-none focus:outline-none focus-visible:ring-2 placeholder:text-xs px-2 dark:text-gray-200"
              autoFocus
            />
          </div>

          <p className="hidden lg:flex dark:text-stone-400">Cyagwa</p>
          <div className="flex items-center justify-between w-full">
            <Label
              className="text-stone-950  text-nowrap text-sm lg:text-lg border-r-2 px-3 py-1 border-gray-200  bg-gray-100  shadow-md shadow-white dark:shadow-black/70  justify-end items-center rounded-lg dark:bg-stone-900 dark:text-gray-200 cursor-pointer"
              htmlFor="table"
            >
              Table no:
            </Label>
            <Input
              id="table"
              onFocus={() => setTableOpen(!tableOpen)}
              className="w-full flex-1 bg-transparent border dark:border-stone-700 lg:border-2  outline-none focus:outline-none focus-visible:ring-2 placeholder:text-xs px-2 dark:text-gray-200 "
              autoFocus
            />
          </div>
        </div>
        <div
          className=" w-fit h-fit p-2 text-stone-950  text-nowrap text-sm lg:text-lg border-l-2 border-gray-200  bg-gray-100  shadow-md shadow-white dark:shadow-black/70  justify-end items-center rounded-lg dark:bg-stone-900 dark:text-gray-200 cursor-pointer group"
          onClick={() => {
            setAddSereveye((prevAddSereveye: number) => prevAddSereveye + 1);
          }}
        >
          <Plus className="group-hover:hover:text-stone-500 h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default AddSereveye;

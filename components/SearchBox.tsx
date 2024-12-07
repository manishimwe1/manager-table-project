import React, { Dispatch, SetStateAction } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

const SearchBox = ({
  searchValue,
  setSearchValue,
  placeholder,
}: {
  searchValue: string;
  placeholder?: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className=" bg-background  shadow-md shadow-white dark:shadow-black/70 flex justify-end items-center w-full gap-2 rounded-lg">
      <Input
        placeholder={placeholder ? placeholder : "Shakisha ibicuruzwa..."}
        className="w-full flex-1 bg-transparent border-none outline-none focus:outline-none focus-visible:ring-0"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Search className="h-4 w-4 mr-2 text-gray-500" />
    </div>
  );
};

export default SearchBox;

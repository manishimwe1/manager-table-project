import React, { Dispatch, SetStateAction, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import { ProductType } from "@/types";
import { useClientInfoStore } from "@/lib/store/zustand";
import DataTable from "./DataTable";
import { useToast } from "@/hooks/use-toast";
import SellingButton from "./SellingButton";

interface SereveyeItem {
  id: number;
  name: string;
  tableOpen: boolean;
}

interface SereveyeRowProps {
  item: SereveyeItem;
  index: number;
  onUpdate: (index: number, value: string) => void;
  onRemove: (index: number) => void;
  onToggleTable: (index: number) => void;
  totalRows: number;
  dataByDate: ProductType[] | undefined;
}

// Row component with fixed types
const SereveyeRow: React.FC<SereveyeRowProps> = ({
  item,
  index,
  onUpdate,
  onRemove,
  onToggleTable,
  totalRows,
  dataByDate,
}) => {
  const { toast } = useToast();
  const [nameInput, setNameInput] = useState("");
  const { setName, name, setFactureNumber, factureNumber } =
    useClientInfoStore();

  return (
    <div className="flex flex-col py-4">
      <div className="flex  w-full gap-2 items-center justify-between px-4">
        <div className="flex items-center gap-4 w-full lg:w-1/2">
          <Label
            className="text-stone-950 text-sm lg:text-lg border-r-2 px-3 py-1 border-gray-200 bg-gray-100 shadow-md shadow-white dark:shadow-black/70 rounded-lg dark:bg-stone-900 dark:text-gray-200"
            htmlFor={`name-${item.id}`}
          >
            Umukiriya
          </Label>
          <Input
            id={`name-${item.id}`}
            className="w-full flex-1 bg-transparent border dark:border-stone-700 lg:border-2 outline-none focus:outline-none focus-visible:ring-2 placeholder:text-xs px-2 dark:text-gray-200"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Enter name"
            onBlur={(e) => {
              if (e.target.value === "") {
                toast({
                  description: "Ooops!!... Ntazi ry'umukiriya washyizimo",
                  variant: "destructive",
                });
                return;
              }
              setName(e.target.value);
              setFactureNumber(index + 1);
              onToggleTable(index);
            }}
          />
        </div>
        <div className="flex items-center gap-2  ">
          <div className="lg:flex hidden items-center gap-2 ">
            <p className="dark:text-stone-400 text-lg font-semibold">
              Nimero y'afactire:
            </p>
            <Label className="text-red-950 text-sm lg:text-lg border-r-2 px-3 py-1 border-blue-200 bg-gray-100 shadow-md rounded-lg dark:bg-stone-900 dark:text-blue-500">
              {index + 1}
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-fit h-fit p-1 text-stone-950 border-l-2 border-gray-200 bg-gray-100 shadow-md rounded-lg dark:bg-stone-900 dark:text-gray-200 cursor-pointer"
              onClick={() => {
                if (name === "") {
                  toast({
                    description: "Ooops!!... Ntazi ry'umukiriya washyizimo",
                    variant: "destructive",
                  });
                  return;
                }

                onToggleTable(index);
              }}
            >
              {item.tableOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>
            {totalRows > 1 && (
              <div
                className="w-fit h-fit p-1 text-stone-950 border-l-2 border-gray-200 bg-gray-100 shadow-md rounded-lg dark:bg-stone-900 dark:text-gray-200 cursor-pointer"
                onClick={() => onRemove(index)}
              >
                <Trash className="h-4 w-4" />
              </div>
            )}
          </div>
        </div>
      </div>

      {item.tableOpen && (
        <div className="mt-4">
          <div className="bg-gray-100 dark:bg-stone-800 p-2 lg:p-4 rounded-lg">
            {/* <DataComponents dataByDate={dataByDate} name={item.name} /> */}
            <DataTable
              data={dataByDate}
              name={item.name}
              factureNumber={index + 1}
            />
          </div>
          <div className="dark:bg-stone-900 mt-2 rounded-sm dark:text-gray-200 w-full h-full  flex flex-col items-start justify-center p-4">
            <SellingButton name={name} factureNumber={index + 1} />
          </div>
        </div>
      )}
    </div>
  );
};

interface AddSereveyeProps {
  FactureNumber: number;
  setAddSereveye: Dispatch<SetStateAction<SereveyeItem[]>>;
  addSereveye: SereveyeItem[];
  data: ProductType[] | undefined;
}

const AddSereveye: React.FC<AddSereveyeProps> = ({
  data: dataByDate,
  FactureNumber,
  setAddSereveye,
  addSereveye,
}) => {
  const { setName, name, setFactureNumber, factureNumber } =
    useClientInfoStore();
  const [clientInfo, setClientInfo] = useState([{ name, factureNumber }]);
  const generateUniqueId = () => {
    const maxId = addSereveye.reduce((max, item) => Math.max(max, item.id), 0);
    return maxId + 1;
  };

  const handleUpdateName = (index: number, newName: string) => {
    setAddSereveye((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, name: newName } : item
      )
    );
  };

  const handleToggleTable = (index: number) => {
    setAddSereveye((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, tableOpen: !item.tableOpen } : item
      )
    );
  };

  const handleRemoveRow = (index: number) => {
    setAddSereveye((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleAddRow = () => {
    setAddSereveye((prev) => [
      ...prev,

      { id: FactureNumber, tableOpen: false, name: "" },
    ]);

    setClientInfo((prev) => [...prev, { factureNumber, name }]);
    console.log(clientInfo, "______in addSereveye");
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col gap-2">
        {addSereveye.map((item, index) => (
          <SereveyeRow
            dataByDate={dataByDate}
            key={`${item.name} + ${index}`}
            item={item}
            index={index}
            onUpdate={handleUpdateName}
            onRemove={handleRemoveRow}
            onToggleTable={handleToggleTable}
            totalRows={addSereveye.length}
          />
        ))}

        <div
          className="mt-4 w-fit h-fit p-2 text-stone-950 border-t-2 border-gray-200 bg-gray-100 shadow-md rounded-lg dark:bg-stone-900 dark:text-gray-200 cursor-pointer"
          onClick={handleAddRow}
        >
          Ongera Umukiriya
        </div>
      </div>
    </div>
  );
};

export default AddSereveye;

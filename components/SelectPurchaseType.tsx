import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import { Dispatch, SetStateAction } from "react";

const SelectPurchaseType = ({
  ibyoUranguyeType,
  setIbyoUranguye,
}: {
  ibyoUranguyeType: string;
  setIbyoUranguye: Dispatch<
    SetStateAction<
      | "Kuri detail"
      | "Ibiro"
      | "Ikesi x 12"
      | "Ikesi x 20"
      | "Amakarito"
      | "Imifuka"
    >
  >;
}) => {
  return (
    <div className="flex gap-2 items-start flex-col">
      <Label htmlFor="purchaseType" className="cursor-pointer text-nowrap">
        Ibyo uranguye
      </Label>
      <Select
        value={ibyoUranguyeType}
        onValueChange={(value) =>
          setIbyoUranguye(
            value as
              | "Kuri detail"
              | "Ibiro"
              | "Ikesi x 12"
              | "Ikesi x 20"
              | "Amakarito"
              | "Imifuka"
          )
        }
      >
        <SelectTrigger
          className="w-full dark:text-gray-200 dark:bg-stone-900"
          id="purchaseType"
        >
          <SelectValue placeholder="Kuri detail" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Kuri detail">Kuri detail</SelectItem>
          <SelectItem value="Ibiro">Ibiro (Kg)</SelectItem>
          <SelectItem value="Ikesi x 12">Ikesi x 12</SelectItem>
          <SelectItem value="Ikesi x 20">Ikesi x 20</SelectItem>
          <SelectItem value="Amakarito">Amakarito</SelectItem>
          <SelectItem value="Imifuka">Imifuka</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectPurchaseType;

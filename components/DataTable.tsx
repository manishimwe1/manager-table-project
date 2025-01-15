import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductType } from "@/types";
import TakeInputValue from "./TakeInputValue";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import SkeletonLoader from "./SkeletonLoader";
import SellingButton from "./SellingButton";

export default function DataTable({
  data,
  name,
  factureNumber,
  loading,
  setLoading,
}: {
  data: ProductType[] | undefined;
  name: string;
  factureNumber: number;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [activeRow, setActiveRow] = useState(false);

  return (
    <div className="w-full flex flex-col gap-1 md:gap-2 lg:flex-row  h-full justify-between shadow-lg dark:shadow-black shadow-slate-100 rounded-md ">
      {data ? (
        <Table className="dark:bg-stone-900 rounded-md ">
          <TableHeader>
            <TableRow>
              <TableHead className="text-nowrap">Igicuruzwa</TableHead>
              <TableHead className="text-nowrap text-left ">Ingano</TableHead>

              <TableHead className="text-nowrap">Ikiranguzo</TableHead>
              <TableHead className="text-nowrap">Uko Ngurisha</TableHead>
              <TableHead className="text-nowrap  w-[100px]">
                Aratwara z'ingahe
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((product) => (
              <TableRow
                key={product._id}
                className={cn("dark:text-gray-200 cursor-pointer")}
              >
                <TableCell className="font-medium text-nowrap">
                  {product.igicuruzwa}
                </TableCell>
                <TableCell className="text-nowrap text-right px-4">
                  <p className="text-nowrap text-left">
                    {product.ibyoUranguyeType === "Ikesi x 12" && (
                      <span className="text-[12px] mr-1">amacupa </span>
                    )}
                    {product.ibyoUranguyeType === "Ikesi x 20" && (
                      <span className="text-[12px] mr-1">amacupa </span>
                    )}
                    {product.byoseHamwe}
                  </p>
                </TableCell>
                <TableCell className="text-nowrap text-left px-4">
                  <p className="text-nowrap">
                    {product.ikiranguzo.toLocaleString()} Rwf{" "}
                    {product.ibyoUranguyeType === "Ikesi x 12" && (
                      <span className="text-[12px] mr-1">Kw'ikesi </span>
                    )}
                    {product.ibyoUranguyeType === "Ikesi x 20" && (
                      <span className="text-[12px] mr-1">Kw'ikesi </span>
                    )}
                  </p>
                </TableCell>
                <TableCell className="text-left text-nowrap px-4">
                  <p className="text-nowrap">
                    {product.ukonyigurishaKuriDetail.toLocaleString()} Rwf{" "}
                    {product.ibyoUranguyeType === "Ikesi x 12" && (
                      <span className="text-[12px] mr-1">Kw'icupa </span>
                    )}
                    {product.ibyoUranguyeType === "Ikesi x 20" && (
                      <span className="text-[12px] mr-1">Kw'icupa </span>
                    )}
                  </p>
                </TableCell>
                <TableCell className="flex items-center justify-center w-fit text-right px-2">
                  <TakeInputValue
                    loading={loading}
                    productType={product.ibyoUranguyeType}
                    id={product._id}
                    ukonyigurishaKuriDetail={product.ukonyigurishaKuriDetail}
                    setActiveRow={setActiveRow}
                    byoseHamwe={product.byoseHamwe}
                    ingano={product.ingano}
                    igicuruzwa={product.igicuruzwa}
                    data={data}
                    ayomazeGucuruza={product.ayomazeGucuruza}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <SkeletonLoader />
      )}{" "}
    </div>
  );
}

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

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default function DataTable({
  data,
  name,
  factureNumber,
}: {
  data: ProductType[] | undefined;
  name: string;
  factureNumber: number;
}) {
  const [activeRow, setActiveRow] = useState(false);
  const draftPurchases = useQuery(api.draftPurchace.getDraftPurchase, {
    name, // Use customerName instead of global name
    factureNumber: factureNumber,
  });
  return (
    <div className="w-full flex flex-col gap-1 md:gap-2 lg:flex-row  h-full justify-between">
      {data ? (
        <Table className="dark:bg-stone-900">
          <TableHeader>
            <TableRow>
              <TableHead className="text-nowrap">Igicuruzwa</TableHead>
              <TableHead className="text-nowrap text-right">Ingano</TableHead>

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
                  <p className="text-nowrap">
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
                    productType={product.ibyoUranguyeType}
                    id={product._id}
                    ukonyigurishaKuriDetail={product.ukonyigurishaKuriDetail}
                    setActiveRow={setActiveRow}
                    byoseHamwe={product.byoseHamwe}
                    ingano={product.ingano}
                    igicuruzwa={product.igicuruzwa}
                    draftPurchase={
                      draftPurchases?.find(
                        (draft) => draft.productId === product._id
                      ) || null
                    }
                    draftId={
                      draftPurchases?.find(
                        (draft) => draft.productId === product._id
                      )?._id || null
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <Table className="dark:bg-stone-900">
          <TableCaption>
            A list of your recent invoices.{factureNumber}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice} className="dark:text-gray-200">
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  {invoice.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}{" "}
    </div>
  );
}

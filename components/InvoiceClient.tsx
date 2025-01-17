"use client";
import useBusinessStore from "@/lib/store/zustand";
import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { cn, formatReadableDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import UploadStampButton from "./UploadStampButton";

const InvoiceClient = ({
  setOpenFacture,
  setopenDialog,
}: {
  setOpenFacture: React.Dispatch<React.SetStateAction<boolean>>;
  setopenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const session = useSession();
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { buzName, buzPhone, email, streetNo, name, clientFacture } =
    useBusinessStore();

  const handlePrint = () => {
    if (invoiceRef.current) {
      const printContent = invoiceRef.current.innerHTML;
      const originalContent = document.body.innerHTML;

      // Replace body content with the invoice content
      document.body.innerHTML = printContent;

      // Trigger the print dialog
      window.print();

      // Restore the original content
      document.body.innerHTML = originalContent;
      window.location.reload(); // Refresh to restore React state
    }
  };
  console.log(clientFacture, 'clientFacture');

  return (
    <section className="overflow-y-scroll w-full h-full flex flex-col gap-10 px-3">
      {clientFacture ? (
        <div
          className="border shadow-md shadow-gray-200 dark:shadow-black p-4 rounded-md"
          ref={invoiceRef}
        >
          <div className="flex items-center justify-between pb-1">
            <p className="text-xl font-bold text-black dark:text-gray-50 capitalize">
              {buzName}
            </p>
            <p className="text-xl font-bold uppercase text-blue-700 text-right">
              Invoice
            </p>
          </div>
          <div className="flex items-start justify-between text-left">
            <div className="flex-1 text-xs space-y-1 md:text-sm dark:text-blue-200">
              <p>{session.data?.user.firstName}</p>
              <p>{buzPhone}</p>
              <p className="text-blue-400">{email}</p>
              <p>{streetNo}</p>
            </div>
            <div
              className={cn(
                "border border-dashed rounded-md px-2 py-1 !gap-0",
                clientFacture[0].yishyuye === true
                  ? "text-blue-500 border-blue-500"
                  : "text-red-500 border-red-500"
              )}
            >
              {clientFacture[0].yishyuye === true ? (
                <div className="flex items-center !gap-1 ">
                  <Check className="h-4 w-4 " />
                  <p className='text-xs '>Paid</p>
                </div>
              ) : (
                <div className="flex items-center !gap-1 ">
                  <X className="h-4 w-4 " />
                  <p className='text-xs '>Not Paid</p>
                </div>
              )}
            </div>
          </div>
          {/* Invoice Details */}
          <div className="flex items-start justify-between mt-6">
            <div className="space-y-1">
              <p className="dark:text-gray-200 font-semibold">Bill To:</p>
              <p className="text-sm dark:text-blue-200 uppercase text-left">
                {clientFacture[0].name}
              </p>
              <p className="text-sm dark:text-blue-200 text-left">
                {clientFacture[0].phone}
              </p>
            </div>
            <div className="space-y-1">
              <p className="dark:text-gray-200 text-right">
                Invoice # {clientFacture[0].facture}
              </p>
              <p className="text-sm dark:text-blue-200 text-right">
                Issued {formatReadableDate(clientFacture[0]._creationTime)}
              </p>
            </div>
          </div>
          {/* Table */}
          <div className="grid grid-cols-8 border mt-4 border-blue-400/40 rounded-sm shadow-sm shadow-gray-200 dark:shadow-black overflow-hidden">
            <div className="col-span-3">
              <div className="w-full h-fit py-2 bg-blue-400">
                <p className="text-center text-black">Description</p>
              </div>
              {clientFacture.map((item) => (
                <div
                  key={item._creationTime}
                  className=" lg:text-sm text-xs py-4 px-2 dark:text-blue-200 border-b border-blue-400/40"
                >
                  {item.igicuruzwa}
                </div>
              ))}
            </div>
            <div className="col-span-1">
              <div className="w-full h-fit py-2 bg-blue-400">
                <p className="text-center text-black">Qty</p>
              </div>
              {clientFacture.map((item) => (
                <div
                  key={item._creationTime}
                  className=" lg:text-sm text-xs py-4 px-2 dark:text-blue-200 border-b border-blue-400/40"
                >
                  {item.aratwaraZingahe}
                </div>
              ))}
            </div>
            <div className="col-span-2">
              <div className="w-full h-fit py-2 bg-blue-400">
                <p className="text-center text-black">Price</p>
              </div>
              {clientFacture.map((item) => (
                <div
                  key={item._creationTime}
                  className=" lg:text-sm text-xs py-4 px-2 dark:text-blue-200 border-b border-blue-400/40"
                >
                  {(item.yishyuyeAngahe / item.aratwaraZingahe).toLocaleString()}{" "}
                  Rwf
                </div>
              ))}
            </div>
            <div className="col-span-2">
              <div className="w-full h-fit py-2 bg-blue-400">
                <p className="text-center text-black">Amount</p>
              </div>
              {clientFacture.map((item) => (
                <div
                  key={item._creationTime}
                  className=" lg:text-sm text-xs py-4 px-2 dark:text-blue-200 border-b border-blue-400/40"
                >
                  {(item.yishyuyeAngahe * item.aratwaraZingahe).toLocaleString()}{" "}
                  Rwf
                </div>
              ))}
            </div>
          </div>
          <div className='flex items-center justify-between gap-4'>
            <div className="mt-10 text-left">
              <p className="text-black dark:text-gray-200">
                Notes & Payment Instructions
              </p>
              <p className="dark:text-blue-200 text-sm">No refund</p>
              <p className="dark:text-blue-200 text-sm">Warranty: 3 months</p>
            </div>
            <div className='text-right'>
              {/* <UploadStampButton /> */}
            </div>
          </div>
        </div>
      ) : null}
      <div className="w-full flex items-center justify-end">
        <Button
          onClick={handlePrint}
          size="sm"
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Print Invoice
        </Button>
        <Button
          onClick={() => {
            setOpenFacture(false);
            setopenDialog(false);
          }}
          variant="outline"
          size="sm"
          className="mt-4"
        >
          Cancel
        </Button>
      </div>
    </section>
  );
};

export default InvoiceClient;

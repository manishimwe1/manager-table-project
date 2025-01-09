"use client";
import useBusinessStore from "@/lib/store/zustand";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useSession } from "next-auth/react";
import { cn, formatReadableDate } from "@/lib/utils";

const SohoraFacturePage = () => {
  const router = useRouter();
  const invoiceRef = useRef<HTMLDivElement>(null);
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { buzName, buzPhone, email, streetNo, name } = useBusinessStore();
  if (buzName === "" || !name) {
    router.back();
  }
  const product = useQuery(api.clientName.getClientInIdenByName, {
    name: name,
  });
  console.log(product);
  const handleSendInvoice = async () => {
    if (!invoiceRef.current || isLoading) return;

    setIsLoading(true);

    // Dynamically import html-to-image only when needed
    const htmlToImage = await import("html-to-image");
    const image = await htmlToImage.toPng(invoiceRef.current);
    if (image) {
      const newWindow = window.open("", "_blank");
      if (!newWindow) {
        alert("Pop-up was blocked. Please allow pop-ups for this site.");
        return;
      }

      // Ensure the base64 string has the correct prefix
      const imageSource = image.startsWith("data:")
        ? image
        : `data:image/png;base64,${image}`;

      // Write the HTML content to the new window
      newWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Image preview</title>
          <style>
            body {
              margin: 0;
              padding: 20px;
              display: flex;
              flex-direction: column;
              align-items: center;
              background-color: #f5f5f5;
              min-height: 100vh;
            }
            img {
              max-width: 100%;
              height: auto;
              border: 1px solid #ddd;
              border-radius: 4px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h1 {
              font-family: system-ui, -apple-system, sans-serif;
              color: #333;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <h1>Image preview</h1>
          <img src="${imageSource}" alt="Preview" />
        </body>
      </html>
    `);
    }
  };
  return (
    <section className="container  w-full h-full flex flex-col gap-10 px-3 lg:px-20 lg:py-10">
      {product ? (
        <div
          className="border shadow-md shadow-gray-200 dark:shadow-black p-4 rounded-md"
          ref={invoiceRef}
        >
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-black dark:text-gray-50 capitalize">
              {buzName}
            </p>
            <p className="text-xl font-bold  uppercase text-blue-700">
              invoice
            </p>
          </div>
          <div className="flex items-start justify-between">
            <div className="flex-1 text-sm dark:text-blue-200">
              <p>{session.data?.user.firstName}</p>
              <p>{buzPhone}</p>
              <p className="text-blue-400">{email}</p>
              <p>{streetNo}</p>
            </div>
            <div
              className={cn(
                "border border-dashed rounded-md animate-pulse px-2 py-1",
                product
                  ? product[0].yishyuye === true
                    ? "text-blue-500 border-blue-500"
                    : "text-red-500 border-red-500"
                  : null
              )}
            >
              {product
                ? product[0].yishyuye === true
                  ? "paid"
                  : "not paid"
                : null}
            </div>
          </div>

          <div className="flex items-start justify-between mt-5">
            <div className=" ">
              <p className="dark:text-gray-200 ">Bill To</p>
              <p className="text-sm  dark:text-blue-200">{name}</p>
              <p className="text-sm  dark:text-blue-200">{product[0].phone}</p>
            </div>
            <div>
              <p className="dark:text-gray-200 ">
                Invoice # {product[0].facture}
              </p>
              <p className="text-sm  dark:text-blue-200">
                Issued {formatReadableDate(product[0]._creationTime)}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-8 border border-blue-400 rounded-sm shadow-sm shadow-gray-200 dark:shadow-black overflow-hidden">
            <div className=" col-span-3">
              <div className="w-full h-fit py-2 bg-blue-400">
                <p className="text-center text-black">Description</p>
              </div>
              <div className="border text-lg py-4 px-2 dark:text-blue-200">
                {product[0].igicuruzwa}
              </div>
            </div>
            <div className=" col-span-1">
              <div className="w-full h-fit py-2 bg-blue-400">
                <p className="text-center text-black">QtY</p>
              </div>
              <div className=" text-lg py-4 px-2 dark:text-blue-200">
                {product[0].aratwaraZingahe}
              </div>
              <div className="border-t text-lg py-4 px-2 dark:text-blue-200"></div>
            </div>
            <div className=" col-span-2">
              <div className="w-full h-fit py-2 bg-blue-400">
                <p className="text-center text-black">Price</p>
              </div>
              <div className="border border-b-0 text-lg py-4 px-2 dark:text-blue-200">
                {product[0].yishyuyeAngahe.toLocaleString()} Rwf
              </div>
              <div className=" border-t text-lg py-4 px-2 dark:text-blue-200">
                Total
              </div>
            </div>
            <div className=" col-span-2">
              <div className="w-full h-fit py-2 bg-blue-400">
                <p className="text-center text-black">Amount</p>
              </div>
              <div className=" text-lg py-4 px-2 dark:text-blue-200">
                {(
                  product[0].yishyuyeAngahe * product[0].aratwaraZingahe
                ).toLocaleString()}{" "}
                Rwf
              </div>
              <div className="border text-lg py-4 px-2 c">
                {(
                  product[0].yishyuyeAngahe * product[0].aratwaraZingahe
                ).toLocaleString()}{" "}
                Rwf
              </div>
            </div>
          </div>
          <div className="">
            <p className="text-black dark:text-gray-200">
              Notes & Payment instructions
            </p>
            <p className="dark:text-blue-200 text-sm">No refund</p>
            <p className="dark:text-blue-200 text-sm">warranty 3 month</p>
          </div>
        </div>
      ) : null}
      <button
        onClick={handleSendInvoice}
        disabled={isLoading}
        className={cn(
          "mt-4 px-4 py-2 bg-blue-500 text-white rounded-md",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {isLoading ? "Sending..." : "Send Invoice to Client"}
      </button>
    </section>
  );
};

export default SohoraFacturePage;

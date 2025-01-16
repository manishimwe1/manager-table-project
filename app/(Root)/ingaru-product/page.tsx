"use client";

import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import HeaderSection from "@/components/HeaderSection";
import SearchBox from "@/components/SearchBox";
import { api } from "@/convex/_generated/api";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "convex/react";

const IngaruPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const session = useSession();
  const userId = session.data?.user;

  // Redirect if the user is not logged in
  if (session.status !== "loading" && !userId) {
    redirect("/login");
  }

  // Fetch user data
  const user = useQuery(api.user.getUserIndb, {
    email: userId?.email ?? undefined,
  });

  // Fetch Ingaru product data
  const data = useQuery(api.ingaruProduct.getIngaruProduct, {
    userId: user?._id,
  });

  // Fetch all product details once
  const productDetails = useQuery(api.product.getProduct, {
    userId: user?._id,
  });

  // Match product details with IngaruProduct data
  const enrichedData = useMemo(() => {
    if (!data || !productDetails) return [];

    return data.map((item) => {
      const product = productDetails.find((p) => p._id === item.productId);
      return {
        ...item,
        productName: product?.igicuruzwa ?? "Unknown Product",
      };
    });
  }, [data, productDetails]);

  // Filter data based on search value
  const filteredData = useMemo(() => {
    if (!searchValue) return enrichedData;
    return enrichedData.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, enrichedData]);

  return (
    <section className="w-full mt-2 space-y-4 px-2">
      <HeaderSection title="Ibicuruzwa byagarutse muri Stock" />

      {filteredData.length === 0 ? (
        <EmptyPlaceholder
          label="Ntangaru ufite muri stock"
          link="/ibyagurishijwe"
          title="Ntangaru ufite muri stock"
        />
      ) : (
        <>
          <div className="flex items-center justify-between w-full">
            <p className="text-blue-400 text-nowrap hidden lg:flex">
              Byose hamwe: {filteredData.length}
            </p>
            <div className="lg:w-[600px] w-full">
              <SearchBox
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            </div>
          </div>
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]"></TableHead>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Igicuruzwa</TableHead>
                  <TableHead className="text-nowrap">
                    ingano yibyo agaruye
                  </TableHead>
                  <TableHead className="text-right">Facture Number</TableHead>
                  <TableHead className="text-nowrap text-center">
                    ayo yari yishyuye{" "}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='dark:text-gray-200 '>
                {filteredData.map((item, index) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell className="text-center text-nowrap">
                      {item.productName}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.inganoYizoAgaruye}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.factureNumber}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.ayoyariYishyuye}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </section>
  );
};

export default IngaruPage;

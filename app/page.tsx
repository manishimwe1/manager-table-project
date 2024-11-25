import { columns, Payment } from "@/components/columns";
import CreateProduct from "@/components/Create-product";
import DataComponents from "@/components/DataComponents";
import { DataTable } from "@/components/DataTable";

export default async function Page() {
  return (
    <section className="flex flex-col w-full h-full ">
      <CreateProduct />
      <DataComponents />;
    </section>
  );
}

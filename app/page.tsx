import CardComponents from "@/components/CardComponents";
import CollapsibleItem from "@/components/CollapsibleItem";
import DataComponents from "@/components/DataComponents";
import HomeCard from "@/components/HomeCard";
import { DataTable } from "@/components/saleTable/DataTable";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { api } from "@/convex/_generated/api";
import { ProductType } from "@/types";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";

export default async function Page() {
  return (
    <section className="flex flex-col w-full h-full space-y-4 ">
      <CardComponents />
      <CollapsibleItem />
    </section>
  );
}

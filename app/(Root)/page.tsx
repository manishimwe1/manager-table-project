import CardComponents from "@/components/CardComponents";
import CollapsibleItem from "@/components/CollapsibleItem";

export default async function Page() {
  return (
    <section className="flex flex-col w-full h-full space-y-4 ">
      <CardComponents />
      <CollapsibleItem />
    </section>
  );
}

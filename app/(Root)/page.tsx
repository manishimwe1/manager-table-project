import { auth } from "@/auth";
import CardComponents from "@/components/CardComponents";
import CollapsibleItem from "@/components/CollapsibleItem";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return (
    <section className="flex flex-col w-full h-full space-y-4 ">
      <CardComponents />
      <CollapsibleItem />
    </section>
  );
}

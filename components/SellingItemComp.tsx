import React, { memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { DraftPurchaseType } from "@/types";

const PurchaseItem = memo(({ purchace }: { purchace: DraftPurchaseType }) => (
  <div className="flex w-full gap-4 py-2">
    <div className="flex gap-2 w-full">
      <p>{purchace.igicuruzwa}</p>

      <p>{purchace.aratwaraZingahe}</p>
    </div>
    <p>{purchace.yishyuyeAngahe}</p>
  </div>
));

const PurchaseList = memo(
  ({ draftPurchase }: { draftPurchase: DraftPurchaseType[] | undefined }) => {
    if (!draftPurchase) {
      return (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="animate-spin h-6 w-6" />
        </div>
      );
    }

    return draftPurchase.map((purchase) => (
      <PurchaseItem key={purchase._id} purchace={purchase} />
    ));
  }
);

const MemoizedScrollArea = ({
  draftPurchase,
}: {
  draftPurchase: DraftPurchaseType[] | undefined;
}) => (
  <ScrollArea className="h-[184px] w-full rounded-md px-2ed lg:p-4 border dark:border-stone-900">
    <PurchaseList draftPurchase={draftPurchase} />
  </ScrollArea>
);

export default memo(MemoizedScrollArea);

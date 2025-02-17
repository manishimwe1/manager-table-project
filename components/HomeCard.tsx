import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import NumberFlow from "@number-flow/react";
import { Skeleton } from "./ui/skeleton";
const HomeCard = ({
  title,
  content,
  link,
}: {
  title: string;
  content?: number;
  link: string;
}) => {
  return (
    <Link href={link}>
      <Card
        className={cn(
          "!gap-0 !p-0 cursor-pointer bg-gradient-to-r from-blue-100 via-blue-200 to-blue-50 dark:bg-gradient-to-tl dark:from-gray-900",
          title === "Abagufitiye Ideni" &&
            "bg-gradient-to-br from-red-200 via-red-100 to-rose-100 dark:bg-gradient-to-tl dark:from-gray-900",
          title === "Muri stock" &&
            "bg-gradient-to-tl from-green-100 via-green-200 to-emerald-300 dark:bg-gradient-to-tl dark:from-gray-900"
        )}
      >
        <CardHeader className="!p-2">
          <CardTitle className="text-gray-800  dark:text-gray-200 balance tracking-wider font-bold  text-sm capitalize !p-0 line-clamp-1">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-end !p-0 mr-3 text-gray-800 dark:text-gray-200 3xl font-bold">
          {content ? (
            <NumberFlow
              value={content}
              transformTiming={{ duration: 750, easing: "ease-out" }}
              spinTiming={{ duration: 750, easing: "ease-out" }}
              opacityTiming={{ duration: 350, easing: "ease-out" }}
              className=" text-base font-bold "
            />
          ) : content === 0 ? (
            <NumberFlow
              value={0}
              transformTiming={{ duration: 750, easing: "ease-out" }}
              spinTiming={{ duration: 750, easing: "ease-out" }}
              opacityTiming={{ duration: 350, easing: "ease-out" }}
            />
          ) : (
            <Skeleton className="w-6 h-6 mb-2 rounded-md" />
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default HomeCard;

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import NumberFlow from "@number-flow/react";
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
          "!gap-0 !p-0 cursor-pointer bg-gradient-to-r from-blue-100 via-blue-200 to-blue-50 ",
          title === "Abagufitiye Ideni" &&
            "bg-gradient-to-br from-red-200 via-red-100 to-rose-100",
          title === "Muri stock" &&
            "bg-gradient-to-tl from-green-100 via-green-200 to-emerald-300"
        )}
      >
        <CardHeader className="!p-2">
          <CardTitle className="text-balance tracking-wider font-bold text-stone-900 text-sm capitalize !p-0 line-clamp-1">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-end !p-0 mr-3 text-3xl font-bold">
          {/* <NumberFlow value={123} /> */}
          <p>{content}</p>
        </CardContent>
        {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
      </Card>
    </Link>
  );
};

export default HomeCard;

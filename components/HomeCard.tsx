import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HomeCard = ({ title, content }: { title: string; content: number }) => {
  return (
    <Card className="!gap-0 !p-0 cursor-pointer">
      <CardHeader className="!p-2">
        <CardTitle className="text-balance tracking-wider font-semibold text-stone-600 text-sm capitalize !p-0">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-end !p-0 mr-3 text-3xl font-bold">
        <p>{content}</p>
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
};

export default HomeCard;

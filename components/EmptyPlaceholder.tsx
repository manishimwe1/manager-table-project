import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import Link from "next/link";

const EmptyPlaceholder = ({
  title,
  label,
  link,
}: {
  title: string;
  label: string;
  link: string;
}) => {
  return (
    <div className="flex items-center justify-center gap-4 flex-col w-full h-screen py-10">
      <Image
        className=""
        src={"/empty.svg"}
        alt="empty"
        height={300}
        width={400}
      />
      <p className="text-xl text-center dark:text-gray-200">{title}</p>
      <Button asChild className="shadow-md shadow-black">
        <Link href={link}>
          {label} <Send className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
};

export default EmptyPlaceholder;

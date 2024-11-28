import { ProductType } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatReadableDate(isoString: number): string {
  const date = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
  };

  return date.toLocaleDateString("en-US", options);
}

type GroupedData = {
  [key: string]: ProductType; // Key is the formatted date with the day, value is an array of ProductType
};

export const groupByDate = (data: ProductType): GroupedData => {
  const grouped: GroupedData = {};

  data?.forEach((item) => {
    const dateObj = new Date(item?._creationTime);
    const date = dateObj.toLocaleDateString(); // e.g., "11/28/2024"
    const day = dateObj.toLocaleDateString("en-US", { weekday: "long" }); // e.g., "Thursday"
    const fullDate = `${day}, ${date}`; // e.g., "Thursday, 11/28/2024"

    if (!grouped[fullDate]) {
      grouped[fullDate] = [];
    }
    grouped[fullDate].push(item);
  });

  return grouped;
};

export const formatToday = (): string => {
  const today = new Date();
  const dayName = today.toLocaleDateString(undefined, { weekday: "long" }); // Get the day name
  const formattedDate = today.toLocaleDateString(undefined); // Get the MM/DD/YYYY format
  return ` ${dayName}, ${formattedDate}`;
};

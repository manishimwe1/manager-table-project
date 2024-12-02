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

const TranslateDay = {
  Monday: "Kuwambere",
  Tuesday: "Kuwakabiri",
  Wednesday: "Kuwagatatu",
  Thursday: "Kuwakane",
  Friday: "Kuwagatanu",
  Saturday: "Kuwagatandatu",
  Sunday: "Ku Cyumweru", // Adding Sunday for completeness
};
export function getTranslatedDay(day: string): string {
  if (!day) {
    console.error("Invalid input: Day is empty or undefined.");
    return "Unknown day";
  }

  // Extract the day name and the date part
  const [dayName, date] = day.split(",").map((part) => part.trim());

  // Normalize the day name
  const normalizedDay =
    dayName.charAt(0).toUpperCase() + dayName.slice(1).toLowerCase();

  // Find the translated day
  const translatedDay =
    TranslateDay[normalizedDay as keyof typeof TranslateDay];

  if (!translatedDay) {
    console.warn(`Day not found: "${dayName}"`);
    return "Unknown day";
  }

  // Return the translated day with the date if provided
  return date ? `${translatedDay}, ${date}` : translatedDay;
}

export function calculateTotal(
  data: { uzishyuraAngahe: number }[] | undefined
): number {
  if (!data || data.length === 0) return 0; // Handle undefined or empty array
  return data.reduce((total, item) => total + item.uzishyuraAngahe, 0);
}

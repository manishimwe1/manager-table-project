import { Client, ProductType } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatReadableDate(isoString: number): string {
  const date = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
  };

  return date.toLocaleDateString("en-US", options);
}

type GroupedData = {
  [key: string]: ProductType[]; // Key is the formatted date with the day, value is an array of ProductType
};
type GroupedDataInSaled = {
  [key: string]: Client[]; // Key is the formatted date with the day, value is an array of Client
};
export const groupByDate = (data: ProductType[] | undefined): GroupedData => {
  const grouped: GroupedData = {};

  // Check if data is an array
  if (!data || !Array.isArray(data)) {
    console.log("Invalid data input: Expected an array of ProductType.");
    return grouped;
  }

  data.forEach((item) => {
    const dateObj = new Date(item._creationTime);
    const date = dateObj.toLocaleDateString(); // e.g., "11/28/2024"
    const day = dateObj.toLocaleDateString("en-US", { weekday: "long" }); // e.g., "Thursday"
    const fullDate = `${day}, ${date}`; // e.g., "Thursday, 11/28/2024"

    if (!grouped[fullDate]) {
      grouped[fullDate] = []; // Initialize an array for this date
    }
    grouped[fullDate].push(item); // Add the item to the array
  });

  return grouped;
};
export const groupByDateInSaled = (
  data: Client[] | undefined
): GroupedDataInSaled => {
  const grouped: GroupedDataInSaled = {};

  data?.forEach((item) => {
    const dateObj = new Date(item._creationTime);
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
  return `${dayName}, ${formattedDate}`;
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

export function printData(
  data: { name: string; igicuruzwa: string; yishyuyeAngahe: number }[],
  title: string = "Print Preview"
) {
  // Create a new window
  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    console.error("Unable to open print dialog.");
    return;
  }

  // Build HTML content for the print window
  const printContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${data[0].igicuruzwa}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            line-height: 1.5;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          table, th, td {
            border: 1px solid #000;
          }
          th, td {
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f4f4f4;
          }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        ${Array.isArray(data) ? generateTable(data) : `<pre>${JSON.stringify(data, null, 2)}</pre>`}
      </body>
    </html>
  `;

  // Write content to the new window
  printWindow.document.open();
  printWindow.document.write(printContent);
  printWindow.document.close();

  // Automatically trigger the print dialog
  printWindow.print();

  // Close the print window after printing
  printWindow.onafterprint = () => {
    printWindow.close();
  };
}

// Helper function to generate a table from an array of objects
function generateTable(data: any[]) {
  if (!data.length) return "<p>No data to display.</p>";

  const headers = Object.keys(data[0]);
  const headerRow = headers.map((header) => `<th>${header}</th>`).join("");
  const rows = data
    .map(
      (item) =>
        `<tr>${headers.map((header) => `<td>${item[header] || ""}</td>`).join("")}</tr>`
    )
    .join("");

  return `
    <table>
      <thead><tr>${headerRow}</tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

// Example Usage

import React, { useState } from "react";

// Define props interface
interface SellingButtonProps {
  id: string;
  igicuruzwa: string;
  ingano: number;
  yishyuyeAngahe: number;
}

const SellingButton: React.FC<SellingButtonProps> = ({
  id,
  igicuruzwa,
  ingano,
  yishyuyeAngahe,
}) => {
  const [ideni, setIdeni] = useState<"Yego" | "Oya" | undefined>();

  const handleSales = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from reloading the page
    console.log("Sales action triggered with:", {
      id,
      igicuruzwa,
      ingano,
      yishyuyeAngahe,
      ideni,
    });
    // Add logic for handling the sale here (e.g., API call or state update)
  };

  return (
    <form onSubmit={handleSales} className="flex space-x-2">
      <button
        type="button"
        onClick={() => setIdeni("Yego")}
        className="bg-blue-500 text-white px-2 py-1 rounded"
      >
        Yego
      </button>
      <button
        type="button"
        onClick={() => setIdeni("Oya")}
        className="bg-red-400 text-white px-2 py-1 rounded"
      >
        Oya
      </button>
      <button
        type="submit"
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default SellingButton;

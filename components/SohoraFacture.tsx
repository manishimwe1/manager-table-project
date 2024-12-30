import { printData } from "@/lib/utils";
import React from "react";
import { Button } from "./ui/button";

const SohoraFacture = () => {
  return (
    <Button
      className="w-full !text-start  !items-start flex justify-start "
      variant={"ghost"}
      onClick={() => {
        if (ClientWhoPaid) {
          const data = [
            {
              name: ClientWhoPaid[0]?.name,
              igicuruzwa: ClientWhoPaid[0].igicuruzwa,
              yishyuyeAngahe: ClientWhoPaid[0].yishyuyeAngahe,
            },
          ];
          printData(data, "Company Name");
        }
      }}
    >
      Print
    </Button>
  );
};

export default SohoraFacture;

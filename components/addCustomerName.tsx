import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PlusCircle, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const AddCustomerName = ({ rowId }: { rowId: string }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState<number | undefined>();
  const [open, setOpen] = useState(false);

  const submitClient = () => {
    console.log(`Saved for row ${rowId}:`, { name, phone });
    setOpen(false);
  };

  return (
    <Popover onOpenChange={setOpen}>
      <PopoverTrigger>
        <div
          className="bg-secondary text-sm text-black font-medium hover:bg-background flex items-center gap-1 rounded-lg py-1 px-2"
          onClick={() => setOpen(true)}
        >
          {name || phone ? (
            <div className="flex flex-col gap-0">
              <p className="text-xs font-bold text-gray-500">Name: {name}</p>
              {phone && (
                <p className="text-xs font-bold text-gray-500">
                  Phone: {phone}
                </p>
              )}
            </div>
          ) : (
            <>
              <PlusCircle className="h-4 w-4" />
              New
            </>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="!w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitClient();
          }}
          className="flex flex-col gap-2"
        >
          <div>
            <Label htmlFor={`name-${rowId}`}>Name</Label>
            <span className="text-red-500">*</span>
            <Input
              id={`name-${rowId}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              minLength={2}
              required
            />
          </div>
          <div>
            <Label htmlFor={`phone-${rowId}`}>Phone number</Label>
            <span className="text-xs ml-0.5 text-muted-foreground">
              (optional)
            </span>
            <Input
              type="number"
              id={`phone-${rowId}`}
              value={phone ?? ""}
              onChange={(e) => setPhone(Number(e.target.value))}
            />
          </div>
          <div className="w-full flex justify-end">
            <Button type="submit">
              <Send /> Send
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default AddCustomerName;

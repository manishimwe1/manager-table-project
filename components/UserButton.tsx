import { signOut } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User2 } from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";

const UserButton = ({ user }: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="border rounded-full overflow-hidden">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name ?? "username"}
              className="object-contain rounded-full"
              height={25}
              width={25}
            />
          ) : (
            <User2 className="h-4 w-4" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Setting</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button
            onClick={async () => {
              try {
                await signOut({
                  redirectTo: "/login",
                  redirect: true,
                });
                localStorage.clear();
                window.location.href = "/login";
              } catch (error) {
                console.error("Sign out error:", error);
              }
            }}
          >
            Sign Out
          </button>
        </DropdownMenuItem>
        {/* <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;

import { AlignJustify, LogOut, UserCog } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, resetTokenAndCredentials } from "@/store/auth-slice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useNavigate } from "react-router-dom";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  function handleLogout() {
    //dispatch(logoutUser());
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate("/auth/login");
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end gap-2">
        {/* <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut />
          Logout
        </Button> */}

        <div className="flex flex-col text-end text-sm text-gray-500 font-semibold">
          <p>{user?.email}</p>
          <p>{user?.userName}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-black">
              <AvatarFallback className="bg-black text-white font-extrabold cursor-pointer">
                {user?.userName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-56 ">
            <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigate("/shop/account")}
              className="cursor-pointer"
            >
              <UserCog className="mr-2 h-4 w-4 " />
              Change Password
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4 " />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default AdminHeader;

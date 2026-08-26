/** @format */
"use client";
import { useAuth } from "@/providers/authContext";
import {
  Calendar,
  Users,
  Dices,
  Settings,
  Swords,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useRouter } from "next/navigation";

const menuItems: { title: string; path: string; icon: any }[] = [
  { title: "Dashboard", path: "/main", icon: <LayoutDashboard /> },
  {
    title: "Calendar",
    path: "/calendar",
    icon: <Calendar />,
  },
  {
    title: "Groups",
    path: "/groups",
    icon: <Users />,
  },
  {
    title: "Games",
    path: "/games",
    icon: <Dices />,
  },

  {
    title: "Settings",
    path: "/settings",
    icon: <Settings />,
  },
];
export default function Sidemenu() {
  const router = useRouter();
  const { logout } = useAuth();
  return (
    <div>
      <div className="flex flex-col justify-between gap-2 h-screen">
        <div className="flex flex-col">
          <div className="flex flex-row gap-2 w-full text-center font-bold text-lg px-4 py-2">
            <Swords /> Gamemaster
          </div>
          <hr />
          <div className="px-2 py-2 flex flex-col gap-2">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-row gap-2 align-center items-center cursor-pointer hover:bg-gray-200 px-4 py-4 rounded-md"
                onClick={() => router.push(item.path)}
              >
                <div className="flex justify-center align-center">
                  {item.icon}
                </div>
                <div>{item.title}</div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="flex flex-row gap-2 mx-2 px-2 rounded-md py-4 mb-[24px] hover:bg-red-200 cursor-pointer"
          onClick={() => {
            logout();
            router.push("/signin");
          }}
        >
          <LogOut />
          <div className="">Logout</div>
        </div>
      </div>
    </div>
  );
}

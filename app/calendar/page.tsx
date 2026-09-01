/** @format */
"use client";

import { LoadingSpinner } from "@/comp/common";
import Sidemenu from "@/comp/sidemenu";
import { apiGet } from "@/helpers/api";
import { User } from "@/models/user";
import { useAuth } from "@/providers/authContext";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CalendarPage() {
  const { user, setUser, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white w-full h-screen text-black">
      <div className="flex flex-row w-full">
        <div className="w-[20%] border-r-1 border border-black h-screen">
          <Sidemenu />
        </div>
        <div className="flex flex-col my-4 mx-8 w-full">Calendar page</div>
      </div>
    </div>
  );
}

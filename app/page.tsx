/** @format */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    async function checkUser() {
      if (token == "" || token == null) {
        router.push("/signin");
      } else {
        router.push("/main");
      }
    }
    checkUser();
  }, [token]);
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-white font-sans">
      Home redirect page
    </div>
  );
}

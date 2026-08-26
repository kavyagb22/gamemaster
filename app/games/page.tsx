/** @format */
"use client";

import {
  ButtonWithModal,
  InputBox,
  LoadingSpinner,
  SubmitButton,
} from "@/comp/common";
import GamesModal from "@/comp/games";
import Sidemenu from "@/comp/sidemenu";
import { apiGet } from "@/helpers/api";
import { GameType, NewGame } from "@/models/games";
import { User } from "@/models/user";
import { useAuth } from "@/providers/authContext";
import { Loader2, Plus, Trash, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const allTypes: GameType[] = [
  "cooperative",
  "strategic",
  "party",
  "deduction",
  "deckbuilder",
  "filler",
  "other",
];
export default function GamesPage() {
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
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className="bg-white w-full h-screen text-black">
      <div className="flex flex-row w-full">
        <div className="w-[20%] border-r-1 border border-black h-screen">
          <Sidemenu />
        </div>
        <div className="flex flex-col my-4 mx-8 w-full">
          <div className="flex flex-row justify-between">
            <div></div>
            <button
              type="button"
              onClick={() => setOpenModal(!openModal)}
              className="px-4 py-2 rounded-md border border-black flex flex-row items-center gap-2 cursor-pointer"
            >
              <Plus />
              Add games
            </button>
          </div>
        </div>
      </div>
      {openModal && (
        <GamesModal
          openModal={openModal}
          setOpenModalAction={setOpenModal}
          user={user}
        />
      )}
    </div>
  );
}

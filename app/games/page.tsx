/** @format */
"use client";

import {
  ButtonWithModal,
  DeleteModal,
  InputBox,
  LoadingSpinner,
  SubmitButton,
} from "@/comp/common";
import GamesModal from "@/comp/games/add";
import { GameFurtherInfo, GameView } from "@/comp/games/common";
import Sidemenu from "@/comp/sidemenu";
import { apiGet, apiPost } from "@/helpers/api";
import { GameInfo, GameType, NewGame } from "@/models/games";
import { GameResponse } from "@/models/response";
import { User } from "@/models/user";
import { useAuth } from "@/providers/authContext";
import { Loader2, Plus, Trash, X, CircleArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [games, setGames] = useState<GameInfo[]>([]);
  const [moreModal, setMoreModal] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [furtherInfo, setFurtherInfo] = useState<GameInfo | null>(null);
  const [updateGame, setUpdateGame] = useState<GameInfo | null>(null);
  const [deleteGame, setDeleteGame] = useState<GameInfo | null>(null);
  const [loadDelete, setLoadDelete] = useState<boolean>(false);
  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  const fetchGames = async () => {
    try {
      const response = await apiGet<{ status: string; data: GameResponse }>(
        "/games/get"
      );
      console.log("get games: ", response);
      setGames(response.data.games);
    } catch (err: any) {
      toast.error(err);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  if (loading || !user) {
    return <LoadingSpinner />;
  }

  const isModalOpen = openModal || updateGame !== null;

  const handleCloseModal = () => {
    setOpenModal(false);
    setUpdateGame(null);
  };

  const handleDeleteModal = () => {
    setDeleteGame(null);
  };

  const handleDeleteGame = async () => {
    setLoadDelete(true);
    if (deleteGame === null) {
      return;
    }
    try {
      const response = await apiPost<{
        status: string;
        message: string;
      }>("/games/delete", {
        game_id: deleteGame.id,
      });
      toast.success(response.message);
      setDeleteGame(null);
      fetchGames();
    } catch (err: any) {
      toast.error(err);
    } finally {
      setLoadDelete(false);
    }
  };

  return (
    <div className="bg-white w-full h-screen text-black flex flex-row overflow-hidden">
      <div className="w-[200px] border-r-1 border border-black h-screen flex-shrink-0">
        <Sidemenu />
      </div>
      <div className="flex flex-col py-4 px-8 w-full  h-screen overflow-hidden">
        <div className="flex flex-row justify-between items-center flex-shrink-0">
          {furtherInfo !== null ? (
            <div
              className="cursor-pointer"
              onClick={() => setFurtherInfo(null)}
            >
              <CircleArrowLeft size={30} />
            </div>
          ) : (
            <div></div>
          )}
          <button
            type="button"
            onClick={() => setOpenModal(!openModal)}
            className="px-2 py-1 rounded-md border-3 border-black flex flex-row items-center gap-2 cursor-pointer font-bold"
          >
            <Plus overlineThickness={3} />
            Add games
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-2 flex-shrink-0">
          {furtherInfo !== null ? (
            <div className="mt-8">
              <GameFurtherInfo game={furtherInfo} />
            </div>
          ) : (
            <div className="flex-1 min-h-0 overflow-y-auto pr-2 pb-6">
              <div className="grid grid-cols-2 gap-4">
                {" "}
                {games.map((game, index) => (
                  <div key={index}>
                    <GameView
                      game={game}
                      index={index}
                      moreModal={moreModal}
                      setMoreModalAction={setMoreModal}
                      selectedIndex={selectedIndex}
                      setSelectedIndexAction={setSelectedIndex}
                      setFurtherInfoAction={setFurtherInfo}
                      setUpdateGameAction={setUpdateGame}
                      setDeleteGameAction={setDeleteGame}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <GamesModal
          openModal={openModal}
          setOpenModalAction={handleCloseModal}
          user={user}
          onGameAddedAction={fetchGames}
          gameInfo={updateGame}
        />
      )}
      {deleteGame !== null && (
        <DeleteModal
          title={`Delete ${deleteGame.name}?`}
          desc="Are you sure you want to delete this game?"
          setCloseModalAction={handleDeleteModal}
          deleteAction={handleDeleteGame}
          loadDelete={loadDelete}
        />
      )}
    </div>
  );
}

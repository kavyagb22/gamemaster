/** @format */
"use client";

import { InputBox, SubmitButton } from "@/comp/common";
import { apiPost, apiPut } from "@/helpers/api";
import { GameInfo, GameType, NewGame } from "@/models/games";
import { User } from "@/models/user";
import { Trash, X, Star, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const allTypes: GameType[] = [
  "cooperative",
  "strategic",
  "party",
  "deduction",
  "deckbuilder",
  "filler",
  "other",
];

function RatingInput({
  max,
  title,
  value,
  handleChangeAction,
  required = false,
  general = true,
}: {
  max: number;
  title: string;
  value: number | undefined;
  handleChangeAction: (value: number) => void;
  required?: boolean;
  general?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 w-full justify-center">
      <div className="flex flex-row gap-1 items-center py-1">
        <div>{title}</div>
        {required && (
          <div className="text-red-500 font-bold text-xl leading-none">*</div>
        )}
      </div>
      <div className="flex flex-row gap-1">
        {Array.from({ length: max }).map((_, index) => (
          <div
            key={index}
            onClick={() => handleChangeAction(index + 1)}
            className="cursor-pointer"
          >
            {general ? (
              <Star
                fill={
                  value !== undefined ? (index < value ? "yellow" : "") : ""
                }
              />
            ) : (
              <Zap
                fill={
                  value !== undefined ? (index < value ? "yellow" : "") : ""
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default function GamesModal({
  user,
  openModal,
  setOpenModalAction,
  onGameAddedAction,
  gameInfo = null,
}: {
  user: User;
  openModal: boolean;
  setOpenModalAction: (openModal: boolean) => void;
  onGameAddedAction: () => void;
  gameInfo?: GameInfo | null;
}) {
  const [form, setForm] = useState<NewGame>({
    name: gameInfo ? gameInfo.name : "",
    minPlayers: gameInfo ? gameInfo.min_players : 1,
    maxPlayers: gameInfo ? gameInfo.max_players : 1,
    optimalPlayers: gameInfo ? gameInfo.optimal_players : undefined,
    type: gameInfo ? gameInfo.gametype : ["other"],
    lastPlayed: gameInfo ? gameInfo.last_played : undefined,
    personalRating: gameInfo ? gameInfo.personal_rating : undefined,
    groupRating: gameInfo ? gameInfo.group_rating : undefined,
    comments: gameInfo ? gameInfo.comments : "",
    owner: gameInfo ? gameInfo.owner_username : user.username,
    playTime: gameInfo ? gameInfo.playtime : 20,
    complexity: gameInfo ? gameInfo.complexity : 1,
  });
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const [error, setError] = useState({
    minPlayer: "",
    maxPlayer: "",
    owner: "",
    type: "",
  });

  useEffect(() => {
    if (gameInfo) {
      setForm({
        name: gameInfo.name,
        minPlayers: gameInfo.min_players,
        maxPlayers: gameInfo.max_players,
        optimalPlayers: gameInfo.optimal_players,
        type: gameInfo.gametype,
        lastPlayed: gameInfo.last_played,
        personalRating: gameInfo.personal_rating,
        groupRating: gameInfo.group_rating,
        comments: gameInfo.comments || "",
        owner: gameInfo.owner_username,
        playTime: gameInfo.playtime,
        complexity: gameInfo.complexity,
      });
    }
  }, [gameInfo]);

  useEffect(() => {
    if (Number(form.minPlayers) > Number(form.maxPlayers)) {
      setError({
        ...error,
        maxPlayer: "Max needs to be higher than Min",
      });
    } else if (Number(form.minPlayers) < 0) {
      setError({
        ...error,
        minPlayer: "Min players cannot be below 0",
      });
    } else if (form.type.length <= 0) {
      setError({
        ...error,
        type: "Atleast one type needs to be selected",
      });
    } else {
      setError({
        ...error,
        minPlayer: "",
        maxPlayer: "",
        type: "",
      });
    }
  }, [form.minPlayers, form.maxPlayers, form.type]);

  const submitGame = async () => {
    setLoadingButton(true);
    if (form.maxPlayers < form.minPlayers) {
      toast.warning("max players lesser than min players");
      setLoadingButton(false);
      return;
    }
    if (form.type.length <= 0) {
      toast.warning("atleast one type needs to be selected");
      setLoadingButton(false);
      return;
    }
    if (
      form.name === "" ||
      form.minPlayers === 0 ||
      form.maxPlayers === 0 ||
      form.playTime === 0 ||
      form.complexity === 0
    ) {
      toast.warning("required fields not filled!");
      setLoadingButton(false);
      return;
    }

    try {
      const response = gameInfo
        ? await apiPut<{ status: string; data: GameInfo; message: string }>(
            "/games/update",
            {
              game_id: Number(gameInfo.id),
              name: form.name,
              min_players: Number(form.minPlayers),
              max_players: Number(form.maxPlayers),
              optimal_players: form.optimalPlayers
                ? Number(form.optimalPlayers)
                : null,
              gametype: form.type,
              last_played: form.lastPlayed ?? null,
              personal_rating: form.personalRating
                ? Number(form.personalRating)
                : null,
              group_rating: form.groupRating ? Number(form.groupRating) : null,
              comments: form.comments !== "" ? form.comments : null,
              playtime: Number(form.playTime),
              complexity: Number(form.complexity),
            }
          )
        : await apiPost<{
            status: string;
            data: GameInfo;
            message: string;
          }>("/games/add", {
            name: form.name,
            min_players: Number(form.minPlayers),
            max_players: Number(form.maxPlayers),
            optimal_players: form.optimalPlayers
              ? Number(form.optimalPlayers)
              : null,
            gametype: form.type,
            last_played: form.lastPlayed ?? null,
            personal_rating: form.personalRating
              ? Number(form.personalRating)
              : null,
            group_rating: form.groupRating ? Number(form.groupRating) : null,
            comments: form.comments !== "" ? form.comments : null,
            owner: form.owner,
            playtime: Number(form.playTime),
            complexity: Number(form.complexity),
          });
      console.log("response: ", response);
      setForm({
        name: "",
        minPlayers: 1,
        maxPlayers: 1,
        optimalPlayers: undefined,
        type: ["other"],
        lastPlayed: undefined,
        personalRating: undefined,
        groupRating: undefined,
        comments: undefined,
        owner: user.username,
        playTime: 20,
        complexity: 1,
      });
      setOpenModalAction(false);
      toast.success(response.message);
      onGameAddedAction();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoadingButton(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800/75 flex items-center justify-center z-20">
      <div className="flex bg-white flex-col gap-4 p-4 md:w-[500px] xs:w-[300px] max-h-[600px] overflow-y-auto rounded-md">
        <div className="flex flex-row justify-between items-center mb-2">
          <div />
          <div className="font-bold text-lg">
            {gameInfo ? "Edit game" : "Add game"}
          </div>
          <X
            onClick={() => setOpenModalAction(false)}
            className="cursor-pointer"
          />
        </div>
        <InputBox
          title="Game name"
          value={form.name}
          handleChangeAction={(e) => setForm({ ...form, name: e })}
          required
        />
        <div className="grid grid-cols-2 w-full gap-2">
          <InputBox
            title="Min players"
            value={form.minPlayers}
            handleChangeAction={(e) => setForm({ ...form, minPlayers: e })}
            type="number"
            required
            error={error.minPlayer}
          />
          <InputBox
            title="Max players"
            value={form.maxPlayers}
            handleChangeAction={(e) => setForm({ ...form, maxPlayers: e })}
            type="number"
            required
            error={error.maxPlayer}
          />
          <InputBox
            title="Optimal players"
            value={form.optimalPlayers}
            handleChangeAction={(e) => setForm({ ...form, optimalPlayers: e })}
            type="number"
          />
        </div>

        <div className="grid grid-cols-2 w-full gap-2 h-full">
          <InputBox
            title="Play time"
            value={form.playTime}
            handleChangeAction={(e) => setForm({ ...form, playTime: e })}
            type="number"
            required
          />
          <RatingInput
            title="Complexity"
            max={5}
            value={form.complexity}
            handleChangeAction={(e) => setForm({ ...form, complexity: e })}
            required
            general={false}
          />

          {/* <InputBox
            title="Complexity"
            value={form.complexity}
            handleChangeAction={(e) => setForm({ ...form, complexity: e })}
            type="number"
            required
          /> */}
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div>Game type</div>
          <div className="grid grid-cols-4 w-full gap-2">
            {allTypes.map((type, index) => {
              const isSelected = form.type.includes(type);
              return (
                <div
                  key={index}
                  className={`cursor-pointer border border-black rounded-full px-2 flex items-center text-center justify-center ${
                    isSelected ? "bg-green-800 text-white" : ""
                  }`}
                  onClick={() =>
                    setForm({
                      ...form,
                      type: isSelected
                        ? form.type.filter((t) => t !== type)
                        : [...form.type, type],
                    })
                  }
                >
                  {type}
                </div>
              );
            })}
          </div>
          <div className="text-sm text-red-600">{error.type}</div>
        </div>
        <div className="grid grid-cols-2 w-full gap-2 -mt-[5px]">
          <RatingInput
            title="Personal rating"
            max={5}
            value={form.personalRating}
            handleChangeAction={(e) => setForm({ ...form, personalRating: e })}
          />
          <RatingInput
            title="Group rating"
            max={5}
            value={form.groupRating}
            handleChangeAction={(e) => setForm({ ...form, groupRating: e })}
          />
        </div>
        <InputBox
          title="Comments"
          value={form.comments}
          handleChangeAction={(e) => setForm({ ...form, comments: e })}
        />
        {gameInfo !== null ? (
          <></>
        ) : (
          <div className="flex flex-col gap-1 w-full">
            <div>Owner</div>
            <div className="flex flex-row gap-2 items-center cursor-not-allowed">
              <div className="border border-gray-700 w-full h-8 rounded-md pl-2 pr-8 flex items-center bg-gray-200">
                {form.owner}
              </div>
            </div>
          </div>
        )}

        <SubmitButton
          title={gameInfo ? "Update game" : "Add game"}
          handleSubmitAction={() => submitGame()}
          loading={loadingButton}
        />
      </div>
    </div>
  );
}

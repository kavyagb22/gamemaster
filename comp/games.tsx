/** @format */
"use client";

import { InputBox, SubmitButton } from "@/comp/common";
import { GameType, NewGame } from "@/models/games";
import { User } from "@/models/user";
import { Trash, X } from "lucide-react";
import { useState } from "react";

const allTypes: GameType[] = [
  "cooperative",
  "strategic",
  "party",
  "deduction",
  "deckbuilder",
  "filler",
  "other",
];
export default function GamesModal({
  user,
  openModal,
  setOpenModalAction,
}: {
  user: User;
  openModal: boolean;
  setOpenModalAction: (openModal: boolean) => void;
}) {
  const [form, setForm] = useState<NewGame>({
    name: "",
    minPlayers: 0,
    maxPlayers: 1,
    optimalPlayers: undefined,
    type: ["other"],
    lastPlayed: undefined,
    personalRating: undefined,
    groupRating: undefined,
    comments: undefined,
    owner: [user.username],
    playTime: 20,
    complexity: 1,
  });
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const onAddGame = () => {};

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 flex items-center justify-center opacity-60">
      <div className="flex bg-white flex-col gap-4 p-4 md:w-[500px] xs:w-[300px] max-h-[600px] overflow-y-auto">
        <div className="flex flex-row justify-between items-center mb-2">
          <div />
          <div className="font-bold text-lg">Add games</div>
          <X
            onClick={() => setOpenModalAction(false)}
            className="cursor-pointer"
          />
        </div>
        <InputBox
          title="Game name"
          value={form.name}
          handleChangeAction={(e) => setForm({ ...form, name: e })}
        />
        <div className="grid grid-cols-2 w-full gap-2">
          <InputBox
            title="Min players"
            value={form.minPlayers}
            handleChangeAction={(e) => setForm({ ...form, minPlayers: e })}
            type="number"
          />
          <InputBox
            title="Max players"
            value={form.maxPlayers}
            handleChangeAction={(e) => setForm({ ...form, maxPlayers: e })}
            type="number"
          />
          <InputBox
            title="Optimal players"
            value={form.optimalPlayers}
            handleChangeAction={(e) => setForm({ ...form, optimalPlayers: e })}
            type="number"
          />
        </div>
        <div className="grid grid-cols-2 w-full gap-2">
          <InputBox
            title="Play time"
            value={form.playTime}
            handleChangeAction={(e) => setForm({ ...form, playTime: e })}
            type="number"
          />
          <InputBox
            title="Complexity"
            value={form.complexity}
            handleChangeAction={(e) => setForm({ ...form, complexity: e })}
            type="number"
          />
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
                    isSelected ? "bg-black text-white" : ""
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
        </div>
        <div className="grid grid-cols-2 w-full gap-2">
          <InputBox
            title="Personal rating"
            value={form.personalRating}
            handleChangeAction={(e) => setForm({ ...form, personalRating: e })}
            type="number"
          />
          <InputBox
            title="Group rating"
            value={form.groupRating}
            handleChangeAction={(e) => setForm({ ...form, groupRating: e })}
            type="number"
          />
        </div>
        <InputBox
          title="Comments"
          value={form.comments}
          handleChangeAction={(e) => setForm({ ...form, comments: e })}
        />
        <div className="flex flex-col gap-1 w-full">
          <div>Owner(s)</div>
          <div className="flex flex-row gap-2 items-center">
            {form.owner.map((item) => (
              <>
                {" "}
                <div className="border border-gray-700 w-full h-8 rounded-md pl-2 pr-8 flex items-center ">
                  {item}
                </div>
                <Trash
                  className="cursor-pointer"
                  // onClick={}
                />
              </>
            ))}
          </div>
          <div className="flex flex-row justify-between">
            <button
              type="button"
              //   onClick={() => ()}
              className="mt-1 cursor-pointer px-4 bg-gray-200 rounded-md border-black border justify-center items-center align-center flex"
            >
              Add owner
            </button>
          </div>
        </div>
        <SubmitButton
          title="Add game"
          handleSubmitAction={() => onAddGame()}
          loading={loadingButton}
        />
      </div>
    </div>
  );
}

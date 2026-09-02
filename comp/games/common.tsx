/** @format */
"use client";

import { MAX_COMPLEXITY, MAX_RATING } from "@/helpers/constants";
import { GameInfo } from "@/models/games";
import { Pen, Ellipsis, Trash, Info, Star, Zap } from "lucide-react";
import { useState } from "react";

export function Ratings({
  general = true,
  value,
  max,
}: {
  general?: boolean;
  value: number;
  max: number;
}) {
  return (
    <div className="flex flex-row gap-1">
      {Array.from({ length: max }).map((_, index) => (
        <div key={index}>
          {general ? (
            <Star
              fill={value !== undefined ? (index < value ? "yellow" : "") : ""}
            />
          ) : (
            <Zap
              fill={value !== undefined ? (index < value ? "yellow" : "") : ""}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function GameView({
  game,
  index,
  moreModal,
  setMoreModalAction,
  selectedIndex,
  setSelectedIndexAction,
  setFurtherInfoAction,
  setUpdateGameAction,
  setDeleteGameAction,
}: {
  game: GameInfo;
  index: number;
  moreModal: boolean;
  setMoreModalAction: (moreModal: boolean) => void;
  selectedIndex: number | null;
  setSelectedIndexAction: (selectedIndex: number | null) => void;
  setFurtherInfoAction: (furtherInfo: GameInfo) => void;
  setUpdateGameAction: (game: GameInfo | null) => void;
  setDeleteGameAction: (game: GameInfo | null) => void;
}) {
  return (
    <div className="flex border border-black px-4 py-4 rounded-md flex-col">
      <div className="flex flex-row justify-between gap-2">
        <div className="font-bold text-xl">{game.name}</div>
        <div className="flex flex-row gap-4 items-center relative">
          <div
            className="p-1 rounded-md border border-black cursor-pointer"
            onClick={() => setUpdateGameAction(game)}
          >
            <Pen size={20} />
          </div>
          <div
            className="p-1 rounded-md border border-black cursor-pointer "
            onClick={() => {
              if (selectedIndex === index && moreModal) {
                setMoreModalAction(false);
              } else {
                setSelectedIndexAction(index);
                setMoreModalAction(true);
              }
            }}
          >
            <Ellipsis size={20} />
          </div>
          {moreModal && selectedIndex === index && (
            <MoreModal
              currentGame={game}
              setFurtherInfoAction={setFurtherInfoAction}
              setSelectedIndexAction={setSelectedIndexAction}
              setMoreModalAction={setMoreModalAction}
              setDeleteGameAction={setDeleteGameAction}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col mt-2">
        <div className="underline mb-2">Player information</div>{" "}
        <div className="flex flex-row gap-8 w-full ">
          <div className="">Minimum: {game.min_players}</div>
          <div className="">Maximum: {game.max_players}</div>
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <div className="underline  mb-2">Gameplay information</div>{" "}
        <div className="flex flex-row gap-8 w-full">
          <div className="flex flex-row">Playtime: {game.playtime}</div>
          <div className="flex flex-row">
            Complexity:{" "}
            <Ratings
              value={game.complexity}
              max={MAX_COMPLEXITY}
              general={false}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <div className="underline mb-2">Game type</div>{" "}
        <div className="grid grid-cols-4 gap-2 ">
          {game.gametype.map((item, index) => (
            <div
              key={index}
              className="flex bg-green-200 rounded-full border border-black px-4 justify-center"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MoreModal({
  setFurtherInfoAction,
  currentGame,
  setMoreModalAction,
  setSelectedIndexAction,
  setDeleteGameAction,
}: {
  setFurtherInfoAction: (futherInfo: GameInfo) => void;
  currentGame: GameInfo;
  setMoreModalAction: (moreModal: boolean) => void;
  setSelectedIndexAction: (selectedIndex: number | null) => void;
  setDeleteGameAction: (game: GameInfo | null) => void;
}) {
  return (
    <div className="absolute top-10 w-[140px] right-0 rounded-md border border-black flex flex-col bg-white">
      <div
        className="text-red-500 cursor-pointer hover:bg-red-200 flex flex-row gap-2 px-4 rounded-sm py-2"
        onClick={() => setDeleteGameAction(currentGame)}
      >
        <Trash color="red" />
        Delete
      </div>
      <hr />
      <div
        className=" cursor-pointer hover:bg-gray-200 flex flex-row gap-2 px-4 rounded-md py-2"
        onClick={() => {
          setFurtherInfoAction(currentGame);
          setSelectedIndexAction(null);
          setMoreModalAction(false);
        }}
      >
        <Info color="black" />
        More info
      </div>
    </div>
  );
}

export function GameFurtherInfo({ game }: { game: GameInfo }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-2 rounded-lg border border-black p-4">
        <div className="text-lg underline">General Information</div>
        <div className="flex flex-row gap-2">
          Game name: <div className="font-bold">{game.name}</div>
        </div>
        <div className="flex flex-row gap-2">
          Minimum players: <div className="font-bold">{game.min_players}</div>
        </div>
        <div className="flex flex-row gap-2">
          Maximum players: <div className="font-bold">{game.max_players}</div>
        </div>{" "}
        <div className="flex flex-row gap-2">
          Optimal players:{" "}
          <div className="font-bold">
            {game.optimal_players === null ? "N/A" : game.optimal_players}
          </div>
        </div>
        <div className="flex flex-row gap-2">
          Game type:{" "}
          <div className="font-bold">
            {game.gametype.map((item, index) => (
              <div
                key={index}
                className="flex bg-green-200 rounded-full border border-black px-4 w-max justify-center"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row gap-2">
          Playtime:{" "}
          <div className="font-bold">
            {game.playtime} <span>minutes</span>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          Complexity:{" "}
          <div className="font-bold">
            <Ratings
              max={MAX_COMPLEXITY}
              value={Number(game.complexity)}
              general={false}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 rounded-lg border border-black p-4">
        <div className="text-lg underline">Personal Information</div>
        <div className="flex flex-row gap-2">
          Last played:{" "}
          <div className="font-bold">
            {game.last_played
              ? new Date(game.last_played).toLocaleDateString()
              : "N/A"}
          </div>
        </div>
        <div className="flex flex-row gap-2">
          Personal rating:{" "}
          <div className="font-bold">
            <Ratings max={MAX_RATING} value={Number(game.personal_rating)} />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          Group rating:{" "}
          <div className="font-bold">
            <Ratings max={MAX_RATING} value={Number(game.group_rating)} />
          </div>
        </div>{" "}
        <div className="flex flex-row gap-2">
          Comments:{" "}
          <div className="font-bold">
            {game.comments === null ? "N/A" : game.comments}
          </div>
        </div>
      </div>
    </div>
  );
}

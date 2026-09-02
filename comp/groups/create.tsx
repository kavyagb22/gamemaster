/** @format */
"use client";

import { InputBox, SubmitButton } from "@/comp/common";
import { CreateGroup, GroupInfo } from "@/models/groups";
import { User } from "@/models/user";
import { Trash, X, Star, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { allTypes } from "../games/add";
import { apiPost, apiPut } from "@/helpers/api";
import { stringify } from "querystring";

export function CreateGroupModal({
  user,
  openModal,
  setOpenModalAction,
  onCreateGroupAction,
  groupInfo,
}: {
  user: User;
  openModal: boolean;
  setOpenModalAction: (openModal: boolean) => void;
  onCreateGroupAction: () => void;
  groupInfo: GroupInfo | null;
}) {
  const [form, setForm] = useState<CreateGroup>({
    name: groupInfo ? groupInfo.name : "",
    desc: groupInfo ? groupInfo.desc : undefined,
    invite_code: groupInfo ? groupInfo.invite_code : "",
    preferred_location: groupInfo ? groupInfo.preferred_location : undefined,
    schedule: groupInfo ? groupInfo.schedule : undefined,
    gametype: groupInfo ? groupInfo.gametype : ["other"],
    last_played: groupInfo ? groupInfo.last_played : undefined,
  });
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [error, setError] = useState({
    gametype: "",
  });

  useEffect(() => {
    if (groupInfo) {
      setForm({
        name: groupInfo.name,
        desc: groupInfo.desc,
        invite_code: groupInfo.invite_code,
        preferred_location: groupInfo.preferred_location,
        schedule: groupInfo.schedule,
        gametype: groupInfo.gametype,
        last_played: groupInfo.last_played,
      });
    }
  }, [groupInfo]);

  useEffect(() => {
    if (form.gametype.length <= 0) {
      setError({
        ...error,
        gametype: "Atleast one type needs to be selected",
      });
    } else {
      setError({
        ...error,
        gametype: "",
      });
    }
  }, [form.gametype]);

  const createGroup = async () => {
    setLoadingButton(true);
    if (form.gametype.length <= 0) {
      toast.warning("atleast one type needs to be selected");
      setLoadingButton(false);
      return;
    }
    if (form.name === "" || form.invite_code === "") {
      toast.warning("required fields not filled!");
      setLoadingButton(false);
      return;
    }
    try {
      const response = groupInfo
        ? await apiPut<{ status: string; data: GroupInfo; message: string }>(
            "/groups/update",
            {
              group_id: Number(groupInfo.id),
              name: form.name,
              desc: form.desc ? form.desc : null,
              preferred_location: form.preferred_location
                ? form.preferred_location
                : null,
              schedule: form.schedule ? form.schedule : null,
              gametype: form.gametype,
              last_played: form.last_played ?? null,
            }
          )
        : await apiPost<{
            status: string;
            message: string;
            data: GroupInfo;
          }>("/groups/create", {
            name: form.name,
            host: user.username,
            desc: form.desc ? form.desc : null,
            invite_code: form.invite_code,
            preferred_location: form.preferred_location
              ? form.preferred_location
              : null,
            schedule: form.schedule ? form.schedule : null,
            gametype: form.gametype,
            last_played: form.last_played ?? null,
          });
      setForm({
        name: "",
        desc: undefined,
        invite_code: "",
        preferred_location: undefined,
        schedule: undefined,
        gametype: ["other"],
        last_played: undefined,
      });
      console.log("response: ", response);
      setOpenModalAction(false);
      toast.success(response.message);
      onCreateGroupAction();
    } catch (err: any) {
      toast.error(err.message || "Failed to create group");
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
            {groupInfo ? "Edit Group" : "Create Group"}
          </div>
          <X
            onClick={() => setOpenModalAction(false)}
            className="cursor-pointer"
          />
        </div>
        <InputBox
          title="Group name"
          value={form.name}
          handleChangeAction={(e) => setForm({ ...form, name: e })}
          required
        />
        <InputBox
          title="Group description"
          value={form.desc}
          handleChangeAction={(e) => setForm({ ...form, desc: e })}
        />
        {groupInfo ? (
          <></>
        ) : (
          <InputBox
            title="Invite Code"
            value={form.invite_code}
            handleChangeAction={(e) => setForm({ ...form, invite_code: e })}
            required
            desc="Invite code cannot be changed later!"
          />
        )}

        <InputBox
          title="Preferred location"
          value={form.preferred_location}
          handleChangeAction={(e) =>
            setForm({ ...form, preferred_location: e })
          }
        />
        <InputBox
          title="Schedule"
          value={form.schedule}
          handleChangeAction={(e) => setForm({ ...form, schedule: e })}
        />
        <div className="flex flex-col gap-1 w-full">
          <div>Game type</div>
          <div className="grid grid-cols-4 w-full gap-2">
            {allTypes.map((type, index) => {
              const isSelected = form.gametype.includes(type);
              return (
                <div
                  key={index}
                  className={`cursor-pointer border border-black rounded-full px-2 flex items-center text-center justify-center ${
                    isSelected ? "bg-green-800 text-white" : ""
                  }`}
                  onClick={() =>
                    setForm({
                      ...form,
                      gametype: isSelected
                        ? form.gametype.filter((t) => t !== type)
                        : [...form.gametype, type],
                    })
                  }
                >
                  {type}
                </div>
              );
            })}
          </div>
          <div className="text-sm text-red-600">{error.gametype}</div>
        </div>
        <div className="text-sm text-gray-500">
          Eventually add functionality to remove members and change host!
        </div>

        <SubmitButton
          title={groupInfo ? "Update group" : "Create group"}
          handleSubmitAction={() => createGroup()}
          loading={loadingButton}
        />
      </div>
    </div>
  );
}

export function JoinGroupModal({
  user,
  openModal,
  setOpenModalAction,
  onJoinGroupAction,
}: {
  user: User;
  openModal: boolean;
  setOpenModalAction: (openModal: boolean) => void;
  onJoinGroupAction: () => void;
}) {
  const [form, setForm] = useState<{ name: string; code: string }>({
    name: "",
    code: "",
  });
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const joinGroup = async () => {
    setLoadingButton(true);
    if (form.name === "") {
      toast.warn("Group name cannot be empty");
      setLoadingButton(false);
      return;
    }
    if (form.code === "") {
      toast.warn("Invite code cannot be empty");
      setLoadingButton(false);
      return;
    }
    try {
      const response = await apiPost<{ status: string; message: string }>(
        "/groups/join",
        {
          username: user.username,
          group_name: form.name,
          invite_code: form.code,
        }
      );
      setForm({ name: "", code: "" });
      setLoadingButton(false);
      setOpenModalAction(false);
      toast.success(response.message);
      onJoinGroupAction();
    } catch (err: any) {
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
          <div className="font-bold text-lg">Join Group</div>
          <X
            onClick={() => setOpenModalAction(false)}
            className="cursor-pointer"
          />
        </div>
        <InputBox
          title="Group name"
          value={form.name}
          handleChangeAction={(e) => setForm({ ...form, name: e })}
          required
        />
        <InputBox
          title="Invite Code"
          value={form.code}
          handleChangeAction={(e) => setForm({ ...form, code: e })}
          required
        />

        <SubmitButton
          title="Join group"
          handleSubmitAction={() => joinGroup()}
          loading={loadingButton}
        />
      </div>
    </div>
  );
}

/** @format */
"use client";

import { DeleteModal, LoadingSpinner, Tooltip } from "@/comp/common";
import { GroupFurtherInfo, GroupView } from "@/comp/groups/common";
import { CreateGroupModal, JoinGroupModal } from "@/comp/groups/create";
import Sidemenu from "@/comp/sidemenu";
import { apiGet, apiPost } from "@/helpers/api";
import { GroupInfo } from "@/models/groups";
import { GroupsResponse } from "@/models/response";
import { User } from "@/models/user";
import { useAuth } from "@/providers/authContext";
import { CircleArrowLeft, Loader2, Plus, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function GroupPage() {
  const { user, setUser, loading } = useAuth();
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [joinModal, setJoinModal] = useState<boolean>(false);
  const [groups, setGroups] = useState<GroupInfo[]>([]);
  const [converting, setConverting] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [moreModal, setMoreModal] = useState<boolean>(false);
  const [updateGroup, setUpdateGroup] = useState<GroupInfo | null>(null);
  const [furtherInfo, setFurtherInfo] = useState<GroupInfo | null>(null);
  const [deleteGroup, setDeleteGroup] = useState<GroupInfo | null>(null);
  const [loadDelete, setLoadDelete] = useState<boolean>(false);
  const router = useRouter();

  const isModalOpen = createModal || updateGroup !== null;

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  const fetchGroups = async () => {
    try {
      const response = await apiGet<{ status: string; data: GroupsResponse }>(
        "/groups/get"
      );
      setGroups(response.data.groups);
      console.log("groups: ", response);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  if (loading || !user) {
    return <LoadingSpinner />;
  }

  const handleConvertUser = async () => {
    setConverting(true);
    try {
      const response = await apiPost<{
        status: string;
        message: string;
        data: User;
      }>("/user/convert-type", {
        username: user.username,
      });
      setUser(response.data);
      toast.success(response.message);
      fetchGroups();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setConverting(false);
    }
  };

  const handleCloseModal = () => {
    setCreateModal(false);
    setUpdateGroup(null);
  };

  const handleDeleteModal = () => {
    setDeleteGroup(null);
  };

  const handleDeleteGroup = async () => {
    setLoadDelete(true);
    if (deleteGroup === null) {
      return;
    }
    try {
      const response = await apiPost<{
        status: string;
        message: string;
      }>("/groups/delete", {
        group_id: deleteGroup.id,
      });
      toast.success(response.message);
      setDeleteGroup(null);
      fetchGroups();
    } catch (err: any) {
      toast.error(err);
    } finally {
      setLoadDelete(false);
    }
  };

  return (
    <div className="bg-white w-full h-screen text-black flex flex-row overflow-hidden">
      <div className="w-[200px] border-r border-black h-screen flex-shrink-0">
        <Sidemenu />
      </div>

      <div className="flex flex-col py-4 px-8 w-full h-screen overflow-hidden">
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
          <div className="flex flex-row gap-2">
            <Tooltip
              text={
                user.usertype === "host" ? "" : "Only hosts can create groups"
              }
            >
              <button
                type="button"
                onClick={() => setCreateModal(!createModal)}
                disabled={user.usertype !== "host"}
                className={`px-2 py-1 rounded-md border-3 border-black flex flex-row items-center gap-2 ${
                  user.usertype === "host"
                    ? "cursor-pointer"
                    : "cursor-not-allowed bg-gray-300"
                } font-bold`}
              >
                <Plus />
                Create group
              </button>
            </Tooltip>

            <button
              type="button"
              onClick={() => setJoinModal(!joinModal)}
              className="px-2 py-1 rounded-md border-3 border-black flex flex-row items-center gap-2 cursor-pointer font-bold"
            >
              <Users />
              Join group
            </button>
          </div>
        </div>

        {furtherInfo !== null ? (
          <div className="mt-6 flex-1 min-h-0 overflow-y-auto pr-2 pb-6">
            <GroupFurtherInfo group={furtherInfo} />
          </div>
        ) : (
          <>
            <div className="mt-6 flex flex-col gap-2 flex-shrink-0">
              <div className="flex flex-row gap-1">
                You are currently a <strong> {user.usertype}!</strong>
              </div>
              {user.usertype === "player" && (
                <div
                  className="cursor-pointer bg-green-100 text-green-800 border-green-800 border rounded-md w-max px-2 py-1"
                  onClick={() => handleConvertUser()}
                >
                  Convert to Host
                </div>
              )}
            </div>
            <div className="mt-6 flex-1 min-h-0 overflow-y-auto pr-2 pb-6">
              <div className="grid grid-cols-2 gap-4">
                {groups.map((group, index) => (
                  <div key={group.id || index}>
                    <GroupView
                      selectedIndex={selectedIndex}
                      setSelectedIndexAction={setSelectedIndex}
                      index={index}
                      moreModal={moreModal}
                      group={group}
                      username={user.username}
                      setUpdateGroupAction={setUpdateGroup}
                      setMoreModalAction={setMoreModal}
                      setDeleteGroupAction={setDeleteGroup}
                      setFurtherInfoAction={setFurtherInfo}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <CreateGroupModal
          user={user}
          openModal={createModal}
          setOpenModalAction={handleCloseModal}
          onCreateGroupAction={fetchGroups}
          groupInfo={updateGroup}
        />
      )}
      {joinModal && (
        <JoinGroupModal
          user={user}
          openModal={joinModal}
          setOpenModalAction={setJoinModal}
          onJoinGroupAction={fetchGroups}
        />
      )}
      {deleteGroup !== null && (
        <DeleteModal
          title={`Delete ${deleteGroup.name}?`}
          desc="Are you sure you want to delete this game?"
          setCloseModalAction={handleDeleteModal}
          deleteAction={handleDeleteGroup}
          loadDelete={loadDelete}
        />
      )}
    </div>
  );
}

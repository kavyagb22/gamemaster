import { GroupInfo } from "@/models/groups";
import { Ellipsis, Info, Pen, Trash } from "lucide-react";
import { Ratings } from "../games/common";
import { MAX_COMPLEXITY } from "@/helpers/constants";

export function GroupView({
    index,
    selectedIndex,
    setSelectedIndexAction,
    moreModal,
    group,
    username,
    setMoreModalAction,
    setUpdateGroupAction,
    setFurtherInfoAction,
    setDeleteGroupAction,
  }: {
    index: number;
    selectedIndex: number | null;
    setSelectedIndexAction: (selectedIndex: number | null) => void;
    moreModal: boolean
    group: GroupInfo,
    username: string,
    setMoreModalAction: (moreModal: boolean) => void;
    setUpdateGroupAction: (group: GroupInfo | null) => void;
    setDeleteGroupAction: (game: GroupInfo | null) => void;
    setFurtherInfoAction: (furtherInfo: GroupInfo) => void;
  }) {
    return (
      <div className="flex border border-black px-4 py-4 rounded-md flex-col">
        <div className="flex flex-row justify-between gap-2">
          <div className="font-bold text-xl">{group.name}</div>
          {group.host === username && <div className="flex flex-row gap-4 items-center relative">
            <div
              className="p-1 rounded-md border border-black cursor-pointer"
              onClick={() => setUpdateGroupAction(group)}
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
              currentGroup={group}
              setFurtherInfoAction={setFurtherInfoAction}
              setSelectedIndexAction={setSelectedIndexAction}
              setMoreModalAction={setMoreModalAction}
              setDeleteGroupAction={setDeleteGroupAction}
              />
            )}
          </div>}
          
        </div>
  
        <div className="flex flex-col mt-2">
          <div className="underline mb-2">General information</div>{" "}
          <div className="flex flex-col gap-1 w-full ">
          <div className="">Description: {group.desc? group.desc:'N/A'}</div>
          <div className="">Invite Code: {group.invite_code}</div>
          </div>
        </div>
        <div className="flex flex-col mt-2">
        <div className="underline  mb-2">Preferences</div>{" "}
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-row">Location: {group.preferred_location?group.preferred_location:'N/A'}</div>
          <div className="flex flex-row">Schedule: {group.schedule?group.schedule:'N/A'}</div>
          <div className="flex flex-col mt-2">
        <div className="underline mb-2">Game type</div>{" "}
        <div className="grid grid-cols-4 gap-2 ">
          {group.gametype.map((item, index) => (
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
      </div>
        
      </div>
    );
  }

  export function MoreModal({
    currentGroup,
  setMoreModalAction,
  setSelectedIndexAction,
  setFurtherInfoAction,
  setDeleteGroupAction,
  }: {
    setFurtherInfoAction: (futherInfo: GroupInfo) => void;
  currentGroup: GroupInfo;
  setMoreModalAction: (moreModal: boolean) => void;
  setSelectedIndexAction: (selectedIndex: number | null) => void;
  setDeleteGroupAction: (group: GroupInfo | null) => void;
  }) {
    return (
      <div className="absolute top-10 w-[140px] right-0 rounded-md border border-black flex flex-col bg-white">
        <div
          className="text-red-500 cursor-pointer hover:bg-red-200 flex flex-row gap-2 px-4 rounded-sm py-2"
          onClick={() => setDeleteGroupAction(currentGroup)}
        >
          <Trash color="red" />
          Delete
        </div>
        <hr />
        <div
          className=" cursor-pointer hover:bg-gray-200 flex flex-row gap-2 px-4 rounded-md py-2"
          onClick={() => {
            setFurtherInfoAction(currentGroup);
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


export function GroupFurtherInfo({ group }: { group: GroupInfo }) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 rounded-lg border border-black p-4">
          <div className="text-lg underline">General Information</div>
          <div className="flex flex-row gap-2">
            Name: <div className="font-bold">{group.name}</div>
          </div>
          <div className="flex flex-row gap-2">
            Description: <div className="font-bold">{group.desc ? group.desc:'N/A'}</div>
          </div>
          <div className="flex flex-row gap-2">
            Host: <div className="font-bold">{group.host}</div>
          </div>{" "}
          <div className="flex flex-row gap-2">
            Invite Code:
            <div className="font-bold">
              {group.invite_code}
            </div>
          </div>
          <div className="flex flex-row gap-2">
            Created at:
            <div className="font-bold">
              {new Date(group.created_at).toLocaleDateString()}
            </div>
          </div>
          <div className="flex flex-row gap-2">
          Last played:{" "}
          <div className="font-bold">
            {group.last_played
              ? new Date(group.last_played).toLocaleDateString()
              : "N/A"}
          </div>
        </div>
        </div>
        <div className="flex flex-col gap-2 rounded-lg border border-black p-4">
          <div className="text-lg underline">Preferences</div>
          <div className="flex flex-row gap-2">
            Location: <div className="font-bold">{group.preferred_location ? group.preferred_location : 'N/A'}</div>
          </div>
          <div className="flex flex-row gap-2">
            Schedule: <div className="font-bold">{group.schedule? group.schedule:'N/A'}</div>
          </div>
          <div className="flex flex-col gap-2">
            Group type:{" "}
            <div className="font-bold grid grid-cols-4 gap-2">
              {group.gametype.map((item, index) => (
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
        <div className="flex flex-col gap-2 rounded-lg border border-black p-4">
          <div className="text-lg underline">Members information</div>
          {group.members.map((member, index)=>(
            <div className="flex flex-col gap-1" key={index}>
              <div className="flex flex-row gap-2">
                Username: <div className="font-bold">{member.username}</div>
              </div>
              <div className="flex flex-row gap-8 items-center">
                <div className="flex flex-row gap-2">
                  First Name: <div className="font-bold">{member.firstname}</div>
                </div>
                <div className="flex flex-row gap-2">
                  Last Name: <div className="font-bold">{member.lastname}</div>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                Email: <div className="font-bold">{member.email}</div>
              </div>
              {index < group.members.length -1 &&<hr/>}

            </div>
          ))} 
        </div>
        <div className="flex flex-col gap-2 rounded-lg border border-black p-4">
          <div className="text-lg underline">Games information</div>
          {group.library.map((game, index)=>(
            <div className="flex flex-col gap-1" key={index}>
              <div className="flex flex-row gap-2">
                Name: <div className="font-bold">{game.name}</div>
              </div>
              <div className="flex flex-row gap-8 items-center">
                <div className="flex flex-row gap-2">
                  Min players: <div className="font-bold">{game.min_players}</div>
                </div>
                <div className="flex flex-row gap-2">
                  Max players: <div className="font-bold">{game.max_players}</div>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                Owner: <div className="font-bold">{game.owner_username}</div>
              </div>
              <div className="flex flex-row gap-8 items-center">
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
              <div className="flex flex-col gap-2">
                  Game type:{" "}
                  <div className="font-bold grid grid-cols-4 gap-2">
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
              {index < group.library.length -1 &&<hr className="my-2" />}

            </div>
          ))}
        </div>
      </div>
    );
}

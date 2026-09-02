/** @format */
"use client";
import { Eye, EyeOff, Loader2, Plus, X } from "lucide-react";
import { useState } from "react";

export function InputBox({
  title,
  value,
  handleChangeAction,
  type = "text",
  required = false,
  error = "",
  desc = "",
}: {
  title: string;
  value: string | number | undefined;
  handleChangeAction: (value: any) => void;
  type?: "text" | "password" | "number" | "email";
  required?: boolean;
  error?: string;
  desc?: string;
}) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isPassword = type == "password";
  const inputType = isPassword && !showPassword ? type : "text";
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex flex-row gap-1 items-center">
        <div>{title}</div>
        {required && <div className="text-red-500 font-bold text-xl">*</div>}
      </div>

      <div className="flex flex-row">
        <input
          className="border border-gray-700 w-full h-8 rounded-md pl-2 pr-8"
          type={inputType}
          value={value === null ? "" : value}
          onChange={(e) => handleChangeAction(e.target.value)}
          required={required}
        />
        {value !== "" && isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ml-[-24px]"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {desc !== "" && <div className=" text-sm text-gray-500">{desc}</div>}
      <div className="text-sm text-red-600">{error}</div>
    </div>
  );
}

export function SubmitButton({
  title,
  handleSubmitAction,
  loading,
}: {
  title: string;
  handleSubmitAction: () => void;
  loading: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => handleSubmitAction()}
      className="cursor-pointer bg-blue-700 text-white rounded-md h-10 py-2 border-black border justify-center items-center align-center w-full flex"
    >
      {!loading ? (
        title
      ) : (
        <Loader2 className="animate-spin justify-center" size={20} />
      )}
    </button>
  );
}

export function LoadingSpinner({}) {
  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center">
      <Loader2 className="animate-spin justify-center" size={80} />
    </div>
  );
}

export function ButtonWithModal({ title }: { title: string }) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpenModal(!openModal)}
        className="px-4 py-2 rounded-md border border-black flex flex-row items-center gap-2 cursor-pointer"
      >
        <Plus />
        {title}
      </button>
      {openModal && (
        <CommonModal title={title} setOpenModalAction={setOpenModal} />
      )}
    </>
  );
}

export function CommonModal({
  title,
  setOpenModalAction,
}: {
  title: string;
  setOpenModalAction: (openModal: boolean) => void;
}) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 flex items-center justify-center opacity-60">
      <div className="flex bg-white flex-col p-4 md:w-[500px] xs:w-[300px]">
        <div className="flex flex-row justify-between items-center">
          <div />
          <div className="font-bold text-lg">{title}</div>
          <X
            onClick={() => setOpenModalAction(false)}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export function DeleteModal({
  title,
  setCloseModalAction,
  desc = null,
  deleteAction,
  loadDelete,
}: {
  title: string;
  setCloseModalAction: () => void;
  desc?: string | null;
  deleteAction: () => void;
  loadDelete: boolean;
}) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800/75 flex items-center justify-center">
      <div className="flex bg-white flex-col gap-4 p-4 md:w-[500px] xs:w-[300px] items-center">
        <div className="flex flex-row justify-between items-center w-full">
          <div />
          <div className="font-bold text-lg">{title}</div>
          <X onClick={() => setCloseModalAction()} className="cursor-pointer" />
        </div>
        <div className="text-black">{desc}</div>
        <div className="flex flex-row justify-between w-full px-12">
          <button
            className="cursor-pointer rounded-md p-2 border-red-500 border min-w-[150px] text-red-500 hover:bg-red-200"
            onClick={() => setCloseModalAction()}
          >
            No
          </button>
          <button
            className="cursor-pointer rounded-md p-2 border-green-500 border min-w-[150px] text-green-500 hover:bg-green-200"
            onClick={() => deleteAction()}
          >
            {loadDelete ? (
              <Loader2 className="animate-spin justify-center" size={20} />
            ) : (
              "Yes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function Tooltip({
  text = null,
  children,
}: {
  text?: string | null;
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && text && (
        <div className="absolute bottom-full top-10 left-1/2 -translate-x-1/2 mb-2 z-20 pointer-events-none flex flex-col items-center w-max">
          <div className=" text-md px-2 py-1 rounded shadow-md font-normal bg-black text-white">
            {text}
          </div>
          <div className="w-2 h-2 bg-black rotate-45 -mt-1" />
        </div>
      )}
    </div>
  );
}

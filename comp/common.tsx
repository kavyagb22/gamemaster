/** @format */
"use client";
import { Eye, EyeOff, Loader2, Plus, X } from "lucide-react";
import { useState } from "react";

export function InputBox({
  title,
  value,
  handleChangeAction,
  type = "text",
}: {
  title: string;
  value: string | number | undefined;
  handleChangeAction: (value: any) => void;
  type?: "text" | "password" | "number" | "email";
}) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isPassword = type == "password";
  const inputType = isPassword && !showPassword ? type : "text";
  return (
    <div className="flex flex-col gap-1 w-full">
      <div>{title}</div>
      <div className="flex flex-row">
        <input
          className="border border-gray-700 w-full h-8 rounded-md pl-2 pr-8"
          type={inputType}
          value={value}
          onChange={(e) => handleChangeAction(e.target.value)}
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
      className="cursor-pointer bg-gray-300 rounded-md h-10 py-2 border-black border justify-center items-center align-center w-full flex"
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

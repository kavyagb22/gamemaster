/** @format */
"use client";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";

export function InputBox({
  title,
  value,
  handleChangeAction,
  type = "text",
}: {
  title: string;
  value: string;
  handleChangeAction: (value: string) => void;
  type?: string;
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
      className="cursor-pointer bg-gray-300 rounded-md h-10 border-black border justify-center items-center align-center w-full flex"
    >
      {!loading ? (
        title
      ) : (
        <Loader2 className="animate-spin justify-center" size={20} />
      )}
    </button>
  );
}

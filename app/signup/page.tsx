/** @format */
"use client";

import { InputBox, SubmitButton } from "@/comp/common";
import { Signup } from "@/models/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [signup, setSignup] = useState<Signup>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const signupUser = () => {};
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-white text-black">
      <div className="flex flex-col gap-4 w-[50%]">
        <div className="text-center">Sign Up</div>
        <div className="flex flex-row gap-4 w-full">
          {" "}
          <InputBox
            title="First name"
            value={signup.firstname}
            handleChangeAction={(e) => setSignup({ ...signup, firstname: e })}
          />
          <InputBox
            title="Last name"
            value={signup.lastname}
            handleChangeAction={(e) => setSignup({ ...signup, lastname: e })}
          />
        </div>

        <InputBox
          title="Email"
          value={signup.email}
          handleChangeAction={(e) => setSignup({ ...signup, email: e })}
        />
        <InputBox
          title="Username"
          value={signup.username}
          handleChangeAction={(e) => setSignup({ ...signup, username: e })}
        />
        <InputBox
          title="Password"
          type="password"
          value={signup.password}
          handleChangeAction={(e) => setSignup({ ...signup, password: e })}
        />
        <div />
        <SubmitButton
          handleSubmitAction={() => signupUser()}
          loading={loading}
          title="Sign up"
        />
        <div className="text-center">
          Already have an account?{" "}
          <span
            className="underline font-bold cursor-pointer"
            onClick={() => router.push("/signin")}
          >
            Sign in here
          </span>
        </div>
      </div>
    </div>
  );
}

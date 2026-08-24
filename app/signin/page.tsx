/** @format */

"use client";

import { InputBox, SubmitButton } from "@/comp/common";
import { apiGet, apiPost } from "@/helpers/api";
import { Signin, User } from "@/models/user";
import { useAuth } from "@/providers/authContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

// BACKEND REQUIREMENTS
// signIn api
export default function SigninPage() {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [signin, setSignin] = useState<Signin>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const signinUser = async () => {
    setLoading(true);

    try {
      const user = await apiPost<{ status: string; token: string; user: User }>(
        "/auth/signin",
        {
          username: signin.username,
          password: signin.password,
        }
      );
      setUser(user.user);
      localStorage.setItem("token", user.token);
      setLoading(false);
      setSignin({
        username: "",
        password: "",
      });
      router.push("/main");
    } catch (err) {
      setLoading(false);
      setSignin({
        username: "",
        password: "",
      });
      console.log("error: ", err);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-white text-black">
      <div className="flex flex-col gap-4 w-[50%]">
        <div className="text-center">Sign In</div>
        <InputBox
          title="Username"
          value={signin.username}
          handleChangeAction={(e) => setSignin({ ...signin, username: e })}
        />
        <InputBox
          title="Password"
          type="password"
          value={signin.password}
          handleChangeAction={(e) => setSignin({ ...signin, password: e })}
        />
        <div />
        <SubmitButton
          handleSubmitAction={() => signinUser()}
          loading={loading}
          title="Sign in"
        />
        <div className="text-center">
          Don't have an account?{" "}
          <span
            className="underline font-bold cursor-pointer"
            onClick={() => router.push("/signup")}
          >
            Sign up here
          </span>
        </div>
      </div>
    </div>
  );
}

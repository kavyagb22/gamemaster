/** @format */

"use client";

import { InputBox, LoadingSpinner, SubmitButton } from "@/comp/common";
import { apiGet, apiPost } from "@/helpers/api";
import { Signin, User } from "@/models/user";
import { useAuth } from "@/providers/authContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// BACKEND REQUIREMENTS
// signIn api
export default function SigninPage() {
  const router = useRouter();
  const { user, setUser, loading } = useAuth();
  const [signin, setSignin] = useState<Signin>({
    username: "",
    password: "",
  });
  const [loadingData, setLoadingData] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      router.push("/main");
    }
  }, [user, loading, router]);
  const signinUser = async () => {
    setLoadingData(true);

    try {
      const response = await apiPost<{
        status: string;
        token: string;
        data: User;
      }>("/auth/signin", {
        username: signin.username,
        password: signin.password,
      });
      console.log("response: ", response);
      if (response && response.token) {
        localStorage.setItem("token", response.token);
        setUser(response.data);
        setLoadingData(false);
        setSignin({
          password: "",
          username: "",
        });
        router.push("/main");
      } else {
        console.error("No token returned from backend:", user);
      }
    } catch (err) {
      setLoadingData(false);
      setSignin({
        username: "",
        password: "",
      });
      console.log("error: ", err);
    }
  };

  if (loading || user) {
    return <LoadingSpinner />;
  }

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

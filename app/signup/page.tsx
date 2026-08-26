/** @format */
"use client";

import { InputBox, LoadingSpinner, SubmitButton } from "@/comp/common";
import { apiPost } from "@/helpers/api";
import { Signup, User } from "@/models/user";
import { useAuth } from "@/providers/authContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const { user, setUser, loading } = useAuth();
  const [signup, setSignup] = useState<Signup>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    username: "",
  });

  const [loadingData, setLoadingData] = useState<boolean>(false);
  useEffect(() => {
    if (user) {
      router.push("/main");
    }
  }, [user, loading, router]);

  const signupUser = async () => {
    setLoadingData(true);

    try {
      const user = await apiPost<{ status: string; token: string; user: User }>(
        "/auth/signup",
        {
          firstname: signup.firstname,
          lastname: signup.lastname,
          email: signup.email,
          password: signup.password,
          username: signup.username,
        }
      );
      console.log("user: ", user);
      setUser(user.user);
      if (user && user.token) {
        localStorage.setItem("token", user.token);
        setUser(user.user);
        setLoadingData(false);
        setSignup({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          username: "",
        });
        router.push("/main");
      } else {
        console.error("No token returned from backend:", user);
      }
    } catch (err) {
      setLoadingData(false);
      setSignup({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        username: "",
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

/** @format */

export type Signin = {
  username: string;
  password: string;
};

export type Signup = {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
};

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  createdAt: string;
  usertype: "host" | "player";
};

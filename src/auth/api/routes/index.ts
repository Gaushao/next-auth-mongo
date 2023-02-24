import type { NextApiHandler } from "next";

import AuthDB from "../database";

import unregister from "./unregister";
import register from "./register";
import users from "./users";

const { adapter, getJwt, Token } = AuthDB;

export default {
  unregister,
  register,
  users,
};

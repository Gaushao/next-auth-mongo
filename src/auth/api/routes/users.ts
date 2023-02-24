import type { NextApiHandler } from "next";
import AuthDB from "../database";

const users: NextApiHandler = async (req, res) => {
  const { status } = res;
  try {
    return status(200).json(await AuthDB.listUsers());
  } catch (e) {
    return e
      ? status(400).json({
          error: `${e}`,
        })
      : status(500).json({
          error: "unknown error",
        });
  }
};
export default users;

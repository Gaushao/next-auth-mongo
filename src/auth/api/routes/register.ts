import type { NextApiHandler } from "next";
import AuthDB from "../database";
import Session from "../../class/session";

const { adapter, getJwt, Token } = AuthDB;

const register: NextApiHandler = async (req, res) => {
  const { status } = res;
  try {
    const found = await getJwt({ req });
    if (!found)
      return res.status(403).json({ error: "authentication required" });
    const jwt = new Token(found);
    const { name } = new Session.User(JSON.parse(req.body));
    if (jwt) {
      const { id } = (await adapter.getUser(jwt.user.id)) || {};
      const result = await adapter.updateUser({ id, name });
      if (result) return status(200).json(result);
    } else throw "already in use";
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
export default register;

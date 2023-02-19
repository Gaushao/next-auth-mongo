import type { NextApiHandler } from "next";

import AuthDB from "./database";
import Session from "../class/session";

const { adapter } = AuthDB;

export default class AuthRouter {
  static register: NextApiHandler = async (req, res) => {
    const { status } = res;
    try {
      const found = await AuthDB.getJwt({ req });
      if (!found)
        return res.status(403).json({ error: "authentication required" });
      const jwt = new AuthDB.Token(found);
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
}

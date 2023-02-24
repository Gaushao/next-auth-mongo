import type { NextApiHandler } from "next";

import AuthDB from "./database";
import Session from "../class/session";

const { adapter, getJwt, Token, unregister } = AuthDB;

const seed = Date.now();
const encrypt = (now: number) => String(now / seed);
const cache: Record<string, string> = {};

export default class AuthRouter {
  static unregister: NextApiHandler = async (req, res) => {
    try {
      const found = await getJwt({ req });
      if (!found)
        return res.status(403).json({ error: "authentication required" });
      const jwt = new Token(found);
      const id = jwt.user.id;
      if (cache[id] === req.query.token) {
        delete cache[id];
        return res.status(200).json({ done: await unregister(jwt.user) });
      }
      const token = encrypt(Date.now());
      cache[id] = token;
      return res.status(200).json({ token });
    } catch (e) {
      res.status(500).json({
        error: `delete account ${e}`,
      });
    }
  };
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

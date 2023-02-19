import type { NextApiHandler } from "next";
import AuthDB from "src/auth/api/database";

const seed = Date.now();
const encrypt = (now: number) => String(now / seed);
const cache: Record<string, string> = {};

const handler: NextApiHandler = async (req, res) => {
  try {
    const found = await AuthDB.getJwt({ req });
    if (!found)
      return res.status(403).json({ error: "authentication required" });
    const jwt = new AuthDB.Token(found);
    const id = jwt.user.id;
    if (cache[id] === req.query.token) {
      delete cache[id];
      return res.status(200).json({ done: await AuthDB.unregister(jwt.user) });
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

export default handler;

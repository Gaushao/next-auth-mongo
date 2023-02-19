import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import AuthDB from "./database";
import providers from "./providers";
import callbacks from "./callbacks";

const adapter = AuthDB.adapter;

const config: (req?: NextApiRequest) => NextAuthOptions = (req) => ({
  session: {
    strategy: "jwt",
  },
  adapter,
  providers,
  callbacks,
});

export default async function NextAuthAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return NextAuth(req, res, config(req));
}

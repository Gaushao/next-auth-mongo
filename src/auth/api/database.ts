import Mongo from "src/mongo";
import { ObjectId } from "src/mongo/lib";
import { getToken } from "next-auth/jwt";
import { getCsrfToken } from "next-auth/react";
import type { AdapterSession, AdapterUser } from "next-auth/adapters";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import Token from "./token";
import { Account } from "next-auth";

export default class AuthDB {
  static Mongo = Mongo;
  static Token = Token;
  static adapter = MongoDBAdapter(AuthDB.Mongo.connect());
  static getJwt = getToken;
  static getCsrf = getCsrfToken;
  static users = async () =>
    (await AuthDB.Mongo.db()).collection<AdapterUser>("users");
  static accounts = async () =>
    (await AuthDB.Mongo.db()).collection<Account>("accounts");
  static sessions = async () =>
    (await AuthDB.Mongo.db()).collection<AdapterSession>("sessions");
  static tokens = async () =>
    (await AuthDB.Mongo.db()).collection<{
      _id: ObjectId;
      identifier: string;
      token: string;
      expires: Date;
    }>("verification_tokens");
  static get getUserById() {
    return async (id?: string) => {
      return id ? await AuthDB.adapter.getUser(id) : null;
    };
  }
  static get findUser() {
    return async (filter: AdapterUser) => {
      const users = await AuthDB.users();
      return users.findOne(filter);
    };
  }
  static get getSession() {
    return async (userId: string) => {
      const sessions = await AuthDB.sessions();
      return sessions.findOne({
        userId: new ObjectId(userId) as unknown as string,
      });
    };
  }
  static get deleteSession() {
    return async (userId: string) => {
      const session = await AuthDB.getSession(userId);
      if (!session) return null;
      return AuthDB.adapter.deleteSession(session.sessionToken);
    };
  }
  static get deleteSessions() {
    return async (userId: string) => {
      while (await AuthDB.deleteSession(userId)) AuthDB.deleteSessions(userId);
    };
  }
  static get deleteAccount() {
    return async (userId: string) => {
      const accounts = await AuthDB.accounts();
      const _id = new ObjectId(userId);
      const { deletedCount } = await accounts.deleteMany({
        userId: _id,
      });
      return deletedCount;
    };
  }
  static get deleteToken() {
    return async (email: string) => {
      const tokens = await AuthDB.tokens();
      const { deletedCount } = await tokens.deleteMany({
        identifier: email,
      });
      return deletedCount;
    };
  }
  static get deleteUser() {
    return async (userId: string) => {
      const users = await AuthDB.users();
      const { deletedCount } = await users.deleteMany({
        _id: new ObjectId(userId),
      });
      return deletedCount;
    };
  }
  static get unregister() {
    return async (user: Token["user"]) => {
      await AuthDB.deleteAccount(user.id);
      await AuthDB.deleteSessions(user.id);
      await AuthDB.deleteToken(user.email || "");
      await AuthDB.deleteUser(user.id);
      return true;
    };
  }
}

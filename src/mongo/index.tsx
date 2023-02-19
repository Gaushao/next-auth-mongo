import connect from "./connect";

const { MONGODB_URI, MONGODB_DB } = process.env;

export default class Mongo {
  static connect = async (uri = MONGODB_URI) => connect(uri);
  static get db() {
    return async (name = MONGODB_DB) => (await Mongo.connect()).db(name);
  }
  static collection = async (name: string) =>
    (await Mongo.db()).collection(name);
}

import { MongoClient, MongoClientOptions } from "mongodb";

const { MONGODB_URI } = process.env;

const DEFAULT_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
} as MongoClientOptions;

let client: MongoClient;

export default async function MongoConnection(
  uri = MONGODB_URI,
  options: MongoClientOptions = DEFAULT_OPTIONS
) {
  if (client) return client;
  if (!uri) throw new Error("Missing Mongo URI");
  client = new MongoClient(uri, options);
  return client.connect();
}

import { MongoClient, type Collection } from "mongodb";

type ClickDoc = { _id: string; count: number };

declare global {
  // 개발 모드 HMR 시 연결이 계속 늘어나지 않도록 전역에 캐시
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> | null {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;

  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri).connect();
  }
  return global._mongoClientPromise;
}

async function getClicksCollection(): Promise<Collection<ClickDoc> | null> {
  const clientPromise = getClientPromise();
  if (!clientPromise) return null;

  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB ?? "linknamu").collection<ClickDoc>("clicks");
}

export async function getClickCounts(): Promise<Record<string, number>> {
  const clicks = await getClicksCollection();
  if (!clicks) return {};

  const docs = await clicks.find().toArray();
  return Object.fromEntries(docs.map((d) => [d._id, d.count]));
}

export async function incrementClick(linkId: string): Promise<boolean> {
  const clicks = await getClicksCollection();
  if (!clicks) return false;

  await clicks.updateOne({ _id: linkId }, { $inc: { count: 1 } }, { upsert: true });
  return true;
}

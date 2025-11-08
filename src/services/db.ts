import { DBSchema, IDBPDatabase, openDB } from "idb";

import { CryptoCurrency } from "@/types/crypto";

const DB_NAME = "CryptoDB";
const STORE_NAME = "CryptoStore";
const DB_VERSION = 1;

interface CryptoDB extends DBSchema {
  [STORE_NAME]: {
    key: number;
    value: CryptoCurrency;
    indexes: { "by-rank": "cmcRank" };
  };
}

let dbPromise: Promise<IDBPDatabase<CryptoDB>> | null = null;

function initDB() {
  if (dbPromise) return dbPromise;

  dbPromise = openDB<CryptoDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
        });

        store.createIndex("by-rank", "cmcRank");
      }
    },
  });
  return dbPromise;
}

export async function upsertCryptos(cryptos: CryptoCurrency[]) {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");

  await Promise.all([
    ...cryptos.map((crypto) => tx.store.put(crypto)),
    tx.done,
  ]);
}

export async function getCryptosFromDB(): Promise<CryptoCurrency[]> {
  const db = await initDB();
  const items = await db
    .transaction(STORE_NAME)
    .store.index("by-rank")
    .getAll();
  return items.sort((a, b) => a.cmcRank - b.cmcRank);
}

export async function countCryptosInDB(): Promise<number> {
  const db = await initDB();
  return db.count(STORE_NAME);
}

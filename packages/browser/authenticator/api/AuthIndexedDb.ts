import { IndexedDb } from "@edonec/indexed-db-class";

class AuthIndexedDb {
  _db: IndexedDb | undefined;

  init(domainName: string) {
    if (typeof window !== "undefined")
      this._db = new IndexedDb(`${domainName}_AUTH`, [
        { tableName: "auth", key: "id" },
      ]);
  }

  get db() {
    if (!this._db) throw new Error("AuthIndexedDb not initialized");

    return this._db;
  }
}

export default AuthIndexedDb;

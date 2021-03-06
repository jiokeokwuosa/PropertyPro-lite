import { Pool } from 'pg';
import { config } from 'dotenv';

config();

class Database {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL
    });
  }

  async queryRaw(rawQuery) {
    const res = await this.pool.query(rawQuery);
    return res;
  }

  async queryArg(text, params) {
    const res = await this.pool.query(text, params);
    return res;
  }
}

const db = new Database();

/* eslint no-console : 0 */
db.pool.on('connect', () => {
  console.log('connected to the db');
});

db.pool.on('error', () => {
  console.log('some database error have occurred');
  process.exit(-1);
});

export default db;

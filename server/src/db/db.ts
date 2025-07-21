import { Pool } from "pg";

const { DB_NAME, DB_USER, DB_PASSWORD, DB_PORT } = process.env;

// Create a reusable client connection pool for Postgres db.
// Each client connection is automatically managed by pg.
const pool = new Pool({
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  port: Number(DB_PORT) || 5432,
});

export const query = (queryText: string, values: (string | number)[] = []) =>
  pool.query(queryText, values);

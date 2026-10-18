import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

const pool = mysql.createPool(
    process.env.DATABASE_URL
);

const db = drizzle(pool);

export default db;
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

export const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
});

pool.on("connection", (connection) => {
    console.log("MySQL connection established");
});

pool.on("error", (err) => {
    console.error("MySQL connection error:", err);
});

const db = drizzle(pool);
export default db;
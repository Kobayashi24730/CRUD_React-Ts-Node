import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../database/schema";
import dotenv from "dotenv";
import dns from "dns";

dotenv.config();

const connectionString = process.env.DATABASE_URL || "";

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

export const db = drizzle(pool, { schema });

async function connectDB() {
    try {
        const res = await pool.query("SELECT NOW()");
        console.log("DB connected:", res.rows);
    } catch(err) {
        console.log("DB connection error:", err);
    }
}

connectDB();

import {
  varchar,
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  decimal,
  boolean,
  date,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: serial("id").primaryKey(),
    nome: text("nome").notNull(),
    email: varchar("email").notNull().unique(),
    senha: varchar("senha").notNull(),
    cargo: text("cargo").default("Usuário")
});
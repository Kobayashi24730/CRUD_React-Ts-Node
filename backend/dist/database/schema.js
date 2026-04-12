"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.user = (0, pg_core_1.pgTable)("user", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    nome: (0, pg_core_1.text)("nome").notNull(),
    email: (0, pg_core_1.varchar)("email").notNull().unique(),
    senha: (0, pg_core_1.varchar)("senha").notNull(),
    cargo: (0, pg_core_1.text)("cargo").default("Usuário")
});

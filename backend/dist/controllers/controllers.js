"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delUser = exports.editUser = exports.Adduser = exports.getUsers = void 0;
const schema_1 = require("#/database/schema");
const index_1 = require("#/database/index");
const drizzle_orm_1 = require("drizzle-orm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUsers = async (req, res) => {
    try {
        const returnUser = await index_1.db.select({
            id: schema_1.user.id,
            nome: schema_1.user.nome,
            email: schema_1.user.email,
            senha: schema_1.user.senha,
            cargo: schema_1.user.cargo
        }).from(schema_1.user);
        return res.status(200).json({
            sucess: true,
            message: "User listados com sucesso",
            data: returnUser,
        });
    }
    catch (err) {
        console.log("Erro real: ", err);
        return res.status(500).json({
            sucess: false,
            message: "Erro ao listar os usuários",
            data: err.message
        });
    }
};
exports.getUsers = getUsers;
const Adduser = async (req, res) => {
    try {
        const { nome, email, senha, cargo } = req.body;
        if (nome == null || email == null || senha == null || cargo == null) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }
        const hashSenha = await bcrypt_1.default.hash(senha, 10);
        const newUser = await index_1.db.insert(schema_1.user).values({
            nome,
            senha: hashSenha,
            email,
            cargo
        }).returning();
        return res.status(200).json({
            sucess: true,
            message: "Usuário adicionado com sucesso",
            data: newUser,
        });
    }
    catch (err) {
        console.log("Erro real: ", err);
        return res.status(500).json({
            sucess: false,
            message: "Erro ao adicionar o usuário",
            data: err.message
        });
    }
};
exports.Adduser = Adduser;
const editUser = async (req, res) => {
    try {
        const { id, nome, email, senhaAtual, novaSenha, cargo } = req.body;
        if (id == null || nome == null || email == null || cargo == null) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }
        const userExist = await index_1.db.select().from(schema_1.user).where((0, drizzle_orm_1.eq)(schema_1.user.id, id)).then(res => res[0]);
        if (!userExist) {
            return res.status(400).json({ message: "Usuário não encontrado" });
        }
        let senhaFinal = userExist.senha;
        if (senhaAtual && novaSenha) {
            const validSenha = await bcrypt_1.default.compare(senhaAtual, userExist.senha);
            if (!validSenha) {
                return res.status(400).json({ message: "Senha invalida" });
            }
            senhaFinal = await bcrypt_1.default.hash(novaSenha, 10);
        }
        const returnUser = await index_1.db.update(schema_1.user).set({
            nome,
            email,
            senha: senhaFinal,
            cargo
        }).where((0, drizzle_orm_1.eq)(schema_1.user.id, id)).returning();
        return res.status(200).json({
            sucess: true,
            message: "Usuário editado com sucesso",
            data: returnUser
        });
    }
    catch (err) {
        console.log("Erro real: ", err);
        return res.status(500).json({
            sucess: false,
            message: "Erro ao editar o usuário",
            data: err.message
        });
    }
};
exports.editUser = editUser;
const delUser = async (req, res) => {
    try {
        const { id } = req.body;
        if (id == null) {
            return res.status(400).json({ message: "ID é obrigatório" });
        }
        const returnUser = await index_1.db.delete(schema_1.user).where((0, drizzle_orm_1.eq)(schema_1.user.id, id)).returning();
        return res.status(200).json({
            sucess: true,
            message: "Usuário deletado com sucesso",
            data: returnUser
        });
    }
    catch (err) {
        console.log("Erro real: ", err);
        return res.status(500).json({
            sucess: false,
            message: "Erro ao deletar o usuário",
            data: err.message
        });
    }
};
exports.delUser = delUser;

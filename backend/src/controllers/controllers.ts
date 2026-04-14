import { user } from "../database/schema";
import { db } from "../database/index";
import type { Request, Response } from "express";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const getUsers = async ( req: Request, res: Response ) => {
    try {
        const returnUser = await db.select({
            id: user.id,
            nome: user.nome,
            email: user.email,
            senha: user.senha,
            cargo: user.cargo
        }).from(user);
        return res.status(200).json({
            sucess: true,
            message: "User listados com sucesso",
            data: returnUser,
        });
    } catch(err:any) {
        console.log("Erro real: ", err);
        return res.status(500).json({
            sucess: false,
            message: "Erro ao listar os usuários",
            data: err.message
        })
    }
};

export const Adduser = async ( req: Request, res: Response ) => {
    try {
        const { nome, email, senha, cargo } = req.body;
        if( nome == null || email == null || senha == null || cargo == null ) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }
        const hashSenha = await bcrypt.hash(senha, 10);
        const newUser = await db.insert(user).values({
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
    } catch(err:any) {
        console.log("Erro real: ", err);
        return res.status(500).json({
            sucess: false,
            message: "Erro ao adicionar o usuário",
            data: err.message
        })
    }
};

export const editUser = async ( req: Request, res: Response ) => {
    try {
        const { id, nome, email, senhaAtual, novaSenha, cargo} = req.body;

        if ( id == null || nome == null || email == null || cargo == null ) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }
        const userExist = await db.select().from(user).where(eq(user.id, id)).then(res => res[0]);
        if (!userExist){
            return res.status(400).json({ message: "Usuário não encontrado" });
        }

        let senhaFinal = userExist.senha;
        if(senhaAtual && novaSenha) {
            const validSenha = await bcrypt.compare(senhaAtual, userExist.senha);
            if(!validSenha){
                return res.status(400).json({ message: "Senha invalida" });
            }
            senhaFinal = await bcrypt.hash(novaSenha, 10);
        }

        const returnUser = await db.update(user).set({
            nome,
            email,
            senha: senhaFinal,
            cargo
        }).where(eq(user.id, id)).returning();
        return res.status(200).json({
            sucess: true,
            message: "Usuário editado com sucesso",
            data: returnUser
        });

    } catch(err:any) {
        console.log("Erro real: ", err);
        return res.status(500).json({
            sucess: false,
            message: "Erro ao editar o usuário",
            data: err.message
        });
    }
};

export const delUser = async ( req: Request, res: Response ) => {
    try {
        const id = Number(req.params.id);
        if ( id == null ){
            return res.status(400).json({ message: "ID é obrigatório" });
        }
        const returnUser = await db.delete(user).where(eq(user.id, id)).returning();
        return res.status(200).json({
            sucess: true,
            message: "Usuário deletado com sucesso",
            data: returnUser
        });
    } catch(err:any) {
        console.log("Erro real: ", err);
        return res.status(500).json({
            sucess: false,
            message: "Erro ao deletar o usuário",
            data: err.message
        });
    }
};

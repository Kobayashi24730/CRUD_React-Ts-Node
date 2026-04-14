import { API } from "@/api/urlApi";
import type { AddUserType, DelUserType, EditUserType } from "@/types/typesCrud";
export default async function getUsers() {
    const response = await fetch(`${API}/users`);
    if(!response.ok){
        throw new Error("Erro ao buscar usuários");
    }
    const data = await response.json()
    return data?.data ?? [];
}

export async function addUser(user: AddUserType){
    const response = await fetch(`${API}/users`, {
        method: "POST",
        headers: { "Content-type": "application/json", },
        body: JSON.stringify(user)
    })
    if(!response.ok){
        throw new Error("Erro ao adicionar usuário");
    }
    const data = await response.json();
    return data?.data ?? [];
}

export async function editUser(user: EditUserType){
    const response = await fetch(`${API}/users/${user.id}`,{
        method: "PUT",
        headers: { "Content-type": "application/json", },
        body: JSON.stringify(user)
    });
    if(!response.ok){
        throw new Error("Erro ao editar usuário");
    }
    const data = await response.json();
    return data?.data ?? [];
}

export async function delUser(user: DelUserType){
    const response = await fetch(`${API}/users/${user.id}`,{
        method: "DELETE",
    });
    if(!response.ok){
        throw new Error("Erro ao deletar usuário");
    }
    const data = await response.json();
    return data?.data ?? [];
}
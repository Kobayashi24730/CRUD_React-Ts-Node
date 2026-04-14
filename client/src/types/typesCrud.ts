export type userType = {
    id: number;
    nome: string;
    email: string;
    cargo: string;
}
export type AddUserType = {
    nome: string;
    email: string;
    senha: string;
    cargo: string;
}

export type EditUserType = {
    id: number;
    nome: string;
    email: string;
    senha: string;
    novaSenha?: string;
    cargo: string;
}

export type DelUserType = {
    id: number;
}

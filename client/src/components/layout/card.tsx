import { useState } from "react";
import type { DelUserType, EditUserType, AddUserType } from "@/types/typesCrud";
import { useAddHook, useDelHook, useEditHook } from "@/hooks";
import "@/styles/Card.css";

type Props = {
    variant: "del" | "edit" | "add";
    data: DelUserType | EditUserType | AddUserType;
    onClose: () => void;
};

export default function Card({ variant, data, onClose }: Props) {
    const { mutate: mutateDel } = useDelHook();
    const { mutate: mutateEdit } = useEditHook();
    const { mutate: mutateAdd } = useAddHook();
    const [dataNova, setDataNova] = useState<EditUserType>(() =>
        variant == "edit"
            ? (data as EditUserType)
            : {
                id: 0,
                nome: "",
                email: "",
                senha: "",
                novaSenha: "",
                cargo: ""
            }
    );
    const [dataAdd, setDataAdd] = useState<AddUserType>(() => 
        variant == "add" ? (data as AddUserType) : {
            nome: "",
            email: "",
            senha: "",
            cargo: ""
        }
    );

    function addUser(data: AddUserType){
        if ( !data.nome || !data.email || !data.senha || !data.cargo){
            alert("Dados do user incompletos. Verifique os dados e tente novamente.");
            return;
        }
        mutateAdd({
            nome: data.nome,
            senha: data.senha,
            email: data.email,
            cargo: data.cargo
        },{
            onSuccess: () => {
                alert("User adicionado com sucesso!");
                onClose();
            },
            onError: () => {
                alert("Erro ao adicionar o user. Verifique os dados e tente novamente.");
                onClose();
            }
        });
    }
    function deletarUser(data: DelUserType) {
        if (data.id === undefined || data.id === null) {
            alert("Id do user nao encontrado. Verifique os dados e tente novamente.");
            console.log("DELETE DATA:", data);
            return;
        }

        mutateDel({ id: data.id }, {
            onSuccess: () => {
                alert("User deletado com sucesso!");
                onClose();
            },
            onError: () => {
                alert("Erro ao deletar o user. Verifique os dados e tente novamente.");
            }
        });
    }

    function editarUser(dataNova: EditUserType) {
        if (dataNova.id == null || !dataNova.nome || !dataNova.email || !dataNova.senha || !dataNova.cargo) {
            alert("Dados do user incompletos. Verifique os dados e tente novamente.");
            return;
        }

        const payload: any = {
            id: dataNova.id,
            nome: dataNova.nome,
            email: dataNova.email,
            cargo: dataNova.cargo
        };

        if (dataNova.novaSenha) {
            payload.senha = dataNova.senha;
            payload.novaSenha = dataNova.novaSenha;
        }

        console.log(payload);
        mutateEdit(payload, {
            onSuccess: () => {
                alert("User editado com sucesso!");
                onClose();
            },
            onError: () => {
                alert("Erro ao editar o user. Verifique os dados e tente novamente.");
            }
        });
    }

    return (
        <div>
            {variant === "add" && (
                <div className="card-overlay">
                    <div className="card-del">
                        <button onClick={() => onClose()}>X</button>
                        <h2>Informe os dados do novo usuario</h2>
                        <div>
                            <input
                                type="text"
                                placeholder="Informe o nome do usuario"
                                value={dataAdd?.nome ?? ""}
                                onChange={(e) => setDataAdd({ ...dataAdd, nome: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Informe o email do usuario"
                                value={dataAdd?.email ?? ""}
                                onChange={(e) => setDataAdd({ ...dataAdd, email: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Informe o senha do usuario"
                                value={dataAdd?.senha ?? ""}
                                onChange={(e) => setDataAdd({ ...dataAdd, senha: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Informe o cargo do usuario"
                                value={dataAdd?.cargo ?? ""}
                                onChange={(e) => setDataAdd({ ...dataAdd, cargo: e.target.value })}
                            />
                        </div>
                        <button onClick={() => addUser(dataAdd)} className="button-del">Enviar</button>
                    </div>
                </div>
            )}

            {variant === "del" && (
                <div className="card-overlay">
                    <div className="card-del">
                        <button onClick={() => onClose()}>X</button>
                        <h2>Tem certeza que deseja deletar este usuario?</h2>
                        <button onClick={() => deletarUser(data as DelUserType)} className="button-del">Deletar</button>
                    </div>
                </div>
            )}

            {variant === "edit" && (
                <div className="card-overlay">
                    <div className="card-del">
                        <button onClick={() => onClose()}>X</button>
                        <h2>Informe novos dados para o usuario</h2>
                        <div>
                            <div>
                                <small>Importante</small>
                                <input
                                    type="text"
                                    placeholder="Informe sua senha atual"
                                    value={dataNova?.senha ?? ""}
                                    onChange={(e) => setDataNova({ ...dataNova, senha: e.target.value })}
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Informe o novo nome do usuario"
                                value={dataNova?.nome ?? ""}
                                onChange={(e) => setDataNova({ ...dataNova, nome: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Informe o novo email do usuario"
                                value={dataNova?.email ?? ""}
                                onChange={(e) => setDataNova({ ...dataNova, email: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Informe a nova senha do usuario"
                                value={dataNova?.novaSenha ?? ""}
                                onChange={(e) => setDataNova({ ...dataNova, novaSenha: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Informe o novo cargo do usuario"
                                value={dataNova?.cargo ?? ""}
                                onChange={(e) => setDataNova({ ...dataNova, cargo: e.target.value })}
                            />
                        </div>
                        <button onClick={() => editarUser(dataNova)} className="button-del">Editar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

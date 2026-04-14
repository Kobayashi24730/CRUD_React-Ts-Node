import { useState } from "react";
import "@/styles/button.css";
import "@/types/typesCrud";
import { useAddHook } from "@/hooks";

interface User {
    nome: string;
    email: string;
    senha: string;
    cargo: string;
}
export default function Button() {
    const { mutate } = useAddHook();
    const [toglebutton, setToggleButton] = useState(false);
    const [InfosUser, setInfosUser] = useState<User>({
        nome: "",
        email: "",
        senha: "",
        cargo: ""
    });

    function onSubmitInfos() {
        if(InfosUser.nome == null || InfosUser.email == null || InfosUser.senha == null || InfosUser.cargo == null) {
            alert("Preencha todos os campos para adicionar um user");
        }
        mutate({
            nome: InfosUser.nome,
            email: InfosUser.email,
            senha: InfosUser.senha,
            cargo: InfosUser.cargo
        },{
            onSuccess: () => {
                alert("User adicionado com sucesso!");
            },
            onError: () => {
                alert("Erro ao adicionar o user. Verifique os dados e tente novamente.");
            }
        });
    }
    return (
        <div className="button-panel">
            <button
                type="button"
                className="button-primary"
                onClick={() => setToggleButton(true)}
            >
                <span className="button-primary-icon" aria-hidden="true">+</span>
                <span>Add User</span>
            </button>

            {toglebutton && (
                <div className="form-overlay" onClick={() => setToggleButton(false)}>
                    <div className="form" onClick={(e) => e.stopPropagation()}>
                        <div className="form-header">
                            <h1 className="form-title">Adicione um user</h1>
                            <button
                                type="button"
                                className="button-close"
                                onClick={() => setToggleButton(false)}
                                aria-label="Fechar formulario"
                            >
                                X
                            </button>
                        </div>
                        <div className="form-fields">
                            <input
                                type="text"
                                placeholder="Informe o nome do user"
                                value={InfosUser.nome}
                                onChange={(e) => setInfosUser({ ...InfosUser, nome: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Informe o email do user"
                                value={InfosUser.email}
                                onChange={(e) => setInfosUser({ ...InfosUser, email: e.target.value })}
                            />
                            <input
                                type="password"
                                placeholder="Informe a senha do user"
                                value={InfosUser.senha}
                                onChange={(e) => setInfosUser({ ...InfosUser, senha: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Informe o cargo do user"
                                value={InfosUser.cargo}
                                onChange={(e) => setInfosUser({ ...InfosUser, cargo: e.target.value })}
                            />

                            <div>
                                <button
                                    type="button"
                                    className="button-close"
                                    onClick={() => onSubmitInfos()}
                                >
                                    Enviar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

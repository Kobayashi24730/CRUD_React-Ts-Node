import { useState } from "react";
import type { DelUserType, EditUserType } from '@/types/typesCrud';
import { useDelHook, useEditHook } from '@/hooks';

type Props = {
    variant: "del" | "edit";
    data: DelUserType | EditUserType;
};
export default function Card( { variant, data } : Props ) {
    const { mutate: mutateDel } = useDelHook();
    const { mutate: mutateEdit } = useEditHook();   
    const [ dataNova, setDataNova ] = useState<EditUserType>( () =>
        variant == "edit" ? data as EditUserType : {
            id: 0,
            nome: "",
            email: "",
            senha: "",
            novaSenha: "",
            cargo: ""
    });
    function deletarUser(data: DelUserType){
        if(data.id === undefined || data.id === null){
            alert("Id do user não encontrado. Verifique os dados e tente novamente.");
            console.log("DELETE DATA:", data);
            return;
        }
        mutateDel({id: data.id}, {
            onSuccess: () => {
                alert("User deletado com sucesso!");
            },
            onError: () => {
                alert("Erro ao deletar o user. Verifique os dados e tente novamente.");
            }
        });
    }
    function editarUser(dataNova: EditUserType){
        if( dataNova.id == null || !dataNova.nome || !dataNova.email || !dataNova.senha || !dataNova.cargo) {
            alert("Dados do user incompletos. Verifique os dados e tente novamente.");
            return;
        }
        const payload: any = {
            id: dataNova.id,
            nome: dataNova.nome,
            email: dataNova.email,
            cargo: dataNova.cargo
        };
    
        if(dataNova.novaSenha) {
            payload.senha = dataNova.senha;
            payload.novaSenha = dataNova.novaSenha;
        }
        console.log(payload);
        mutateEdit(payload,
        {
            onSuccess: () => {
                alert("User editado com sucesso!");
            },
            onError: () => {
                alert("Erro ao editar o user. Verifique os dados e tente novamente.");
            }
        });
    }
    return (
        <div>
            {variant === "del" && (
                <div className="card-del">
                    <h2>Tem certeza que deseja deletar este usuário?</h2>
                    <button onClick={() => deletarUser(data as DelUserType)} className="button-del">Deletar</button>
                </div>
            )}
            {variant === "edit" && (
                <div className="card-del">
                    <h2>Informe novos dados para o usuário</h2>
                    <div>
                        <div>
                            <small>Inportante</small>
                            <input type="text" placeholder="Informe sua senha atual" value={dataNova?.senha ?? ""} onChange={(e) => setDataNova({ ...dataNova, senha: e.target.value })} />
                        </div>
                        <input type="text" placeholder='Informe o novo nome do usuario' value={dataNova?.nome ?? ""} onChange={(e) => setDataNova({ ...dataNova, nome: e.target.value })} />
                        <input type="text" placeholder="Informe o novo emial do usuario" value={dataNova?.email ?? ""} onChange={(e) => setDataNova({ ...dataNova, email: e.target.value })} />
                        <input type="text" placeholder="Informe a nova senha do usuario" value={dataNova?.novaSenha ?? ""} onChange={(e) => setDataNova({ ...dataNova, novaSenha: e.target.value })} />
                        <input type="text" placeholder="Informe o novo cargo do usuario" value={dataNova?.cargo ?? ""} onChange={(e) => setDataNova({ ...dataNova, cargo: e.target.value })} />
                    </div>
                    <button onClick={() => editarUser(dataNova)} className="button-del">Editar</button>
                </div>
            )}
        </div>
    );
}
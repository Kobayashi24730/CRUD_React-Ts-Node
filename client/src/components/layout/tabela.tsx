import "@/styles/tabela.css";
import { useState } from "react";
import { useGetHook }  from "@/hooks";
import type { DelUserType, EditUserType } from "@/types/typesCrud";
import Card from "@/components/layout/card";

export default function Tabela() {
    const { data, isLoading, isError } = useGetHook();
    const [ editdata, setEditData ] = useState<EditUserType | null>(null);
    const [ delData, setDelData ] = useState<DelUserType | null>(null);
    const [ tipo, setTipo ] = useState<"edit" | "del" | null >(null);

    if (isLoading) return <p className="task-list-message">Carregando...</p>;
    if (isError) return <p className="task-list-message">Erro ao carregar os dados.</p>;
    return (
        <section className="task-list" aria-label="Lista de tarefas">
            {data && data.map((user: EditUserType) => (
                <article className="task-card" key={user.id}>
                    <div className="task-info">
                        <span className="task-label">Nome do usuario</span>
                        <h2 className="task-name">{user.nome}</h2>
                    </div>
                    <div className="task-priority-block">
                        <span className="task-label">Cargo do usuario</span>
                        <span className={`task-priority task-priority-${user.cargo.toLowerCase().replace(" ", "-")}`}>
                            {user.cargo}
                        </span>
                    </div>

                    <div className="task-actions">
                        <button type="button" className="task-icon-button" aria-label={`Editar ${user.nome}`} onClick={() => {setTipo("edit"); setEditData(user)}} >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M16.86 3.49a2.1 2.1 0 0 1 2.97 2.97L8.24 18.06l-4.1 1.12 1.12-4.1L16.86 3.5Z" />
                                <path d="M14.5 5.85l3.65 3.65" />
                                <path d="M20 21H4" />
                            </svg>
                        </button>

                        <button type="button" className="task-icon-button task-icon-button-delete" aria-label={`Excluir ${user.nome}`} onClick={() => {setTipo("del"); setDelData(user)}} >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M3 6h18" />
                                <path d="M8 6V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V6" />
                                <path d="M18 6l-1 13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 6" />
                                <path d="M10 11v6" />
                                <path d="M14 11v6" />
                            </svg>
                        </button>
                    </div>
                </article>
            ))}

            {tipo == "edit" && editdata && <Card variant="edit" data={editdata} /> }
            {tipo == "del" && delData && <Card variant="del" data={delData} /> }
        </section>
    );
}

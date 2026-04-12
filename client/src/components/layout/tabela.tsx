import "@/styles/tabela.css";

const tasks = [
    { id: 1, task: "Go to gym", priority: "High", status: "To Do", done: false },
    { id: 2, task: "Read a book", priority: "Low", status: "Done", done: true },
    { id: 3, task: "Go to market", priority: "Medium", status: "In Progress", done: true },
    { id: 4, task: "Restart learning Solidworks", priority: "High", status: "To Do", done: false },
    { id: 5, task: "change slider to scroll", priority: "High", status: "Done", done: true },
    { id: 6, task: "To publish the article", priority: "Medium", status: "In Progress", done: true }
];

export default function Tabela() {
    return (
        <section className="task-list" aria-label="Lista de tarefas">
            {tasks.map((item) => (
                <article className="task-card" key={item.id}>
                    <div className="task-info">
                        <span className="task-label">Task</span>
                        <h2 className="task-name">{item.task}</h2>
                    </div>

                    <div className="task-priority-block">
                        <span className="task-label">Priority</span>
                        <span className={`task-priority task-priority-${item.priority.toLowerCase().replace(" ", "-")}`}>
                            {item.priority}
                        </span>
                    </div>

                    <div className="task-status-block">
                        <span className={`task-status task-status-${item.status.toLowerCase().replace(" ", "-")}`}>
                            {item.status}
                        </span>
                    </div>

                    <div className="task-check-column" aria-label={item.done ? "Concluida" : "Pendente"}>
                        <span className={`task-check ${item.done ? "is-done" : ""}`} />
                    </div>

                    <div className="task-actions">
                        <button type="button" className="task-icon-button" aria-label={`Editar ${item.task}`}>
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M16.86 3.49a2.1 2.1 0 0 1 2.97 2.97L8.24 18.06l-4.1 1.12 1.12-4.1L16.86 3.5Z" />
                                <path d="M14.5 5.85l3.65 3.65" />
                                <path d="M20 21H4" />
                            </svg>
                        </button>

                        <button type="button" className="task-icon-button task-icon-button-delete" aria-label={`Excluir ${item.task}`}>
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
        </section>
    );
}

import { useNavigate } from "react-router-dom";
import { updateTask, deleteTask } from "../../services/taskService";
import { CATEGORIES, PRIORITIES } from "../../utils/constants";
import { getDueDateLabel, isOverdue } from "../../utils/dateHelpers";
import toast from "react-hot-toast";
import { useUIStore } from "../../store/uiStore";

export default function TaskCard({ task }) {
    const navigate = useNavigate();
    const { theme } = useUIStore();

    const category = CATEGORIES.find((c) => c.id === task.category);
    const categoryColor = category ? category.color : "gray";
    const categoryLabel = category ? category.label : "Otro";

    const priority = PRIORITIES.find((p) => p.id === task.priority);
    const priorityColor = priority ? priority.color : "gray";
    const priorityLabel = priority ? priority.label : "Normal";

    const taskIsOverdue = isOverdue(task.dueDate, task.completed);

    const handleToggleComplete = async (e) => {
        e.preventDefault();
        const result = await updateTask(task.id, {
            completed: !task.completed,
        });
        if (result.success) {
            toast.success(
                task.completed ? "Marcada como pendiente" : "Tarea completada",
            );
        } else {
            toast.error("Error al actualizar el estado");
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        if (window.confirm("¿Estás seguro de eliminar esta tarea?")) {
            const result = await deleteTask(task.id);
            if (result.success) {
                toast.success("Tarea eliminada correctamente");
            } else {
                toast.error("Error al eliminar la tarea");
            }
        }
    };

    return (
        <div
            className={`card flex flex-col md:flex-row items-center md:items-center text-center md:text-left gap-4 md:gap-5 hover:shadow-lg transition-all duration-200 
          ${
              task.completed
                  ? theme === "dark"
                      ? "opacity-75 bg-gray-900 border-gray-800"
                      : "opacity-75 bg-gray-50 border-transparent"
                  : theme === "dark"
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-transparent"
          } 
          ${taskIsOverdue ? "border-red-500 border-2" : "border"}
        `}
        >
            <button
                onClick={handleToggleComplete}
                title={
                    task.completed
                        ? "Desmarcar tarea"
                        : "Marcar como completada"
                }
                className={`group shrink-0 w-9 h-9 flex items-center justify-center rounded-lg border-[2.5px] transition-all ${
                    task.completed
                        ? "bg-green-500 border-green-500 text-white hover:bg-gray-200 hover:border-gray-400 hover:text-gray-600 shadow-sm"
                        : `bg-transparent text-transparent hover:border-green-500 hover:text-green-500 ${theme === "dark" ? "border-gray-500" : "border-gray-300"}`
                }`}
            >
                {task.completed ? (
                    <>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 block group-hover:hidden"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="3.5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 hidden group-hover:block"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="3"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                )}
            </button>

            <div className="grow min-w-0 w-full flex flex-col items-center md:items-start">
                <h3
                    className={`text-xl font-bold truncate w-full transition-colors ${
                        task.completed
                            ? theme === "dark"
                                ? "line-through text-gray-500"
                                : "line-through text-gray-400"
                            : theme === "dark"
                              ? "text-white"
                              : "text-gray-800"
                    }`}
                >
                    {task.title}
                </h3>

                {task.description && (
                    <p
                        className={`text-sm mt-1 line-clamp-2 w-full transition-colors ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                    >
                        {task.description}
                    </p>
                )}

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-3">
                    <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${task.completed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                        <span className="font-bold opacity-60 mr-1">
                            Estado:
                        </span>
                        {task.completed ? "Completada" : "Pendiente"}
                    </span>

                    <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-${categoryColor}-100 text-${categoryColor}-800`}
                    >
                        <span className="font-bold opacity-60 mr-1">
                            Categoría:
                        </span>
                        {categoryLabel}
                    </span>

                    <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-${priorityColor}-100 text-${priorityColor}-800`}
                    >
                        <span className="font-bold opacity-60 mr-1">
                            Prioridad:
                        </span>
                        {priorityLabel}
                    </span>

                    {task.dueDate && (
                        <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${isOverdue(task.dueDate, task.completed) ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}
                        >
                            <span className="font-bold opacity-60 mr-1">
                                Vence:
                            </span>
                            {getDueDateLabel(task.dueDate)}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex gap-2.5 shrink-0 mt-3 md:mt-0 w-full md:w-auto justify-center md:justify-end">
                <button
                    onClick={() => navigate(`/tasks/${task.id}`)}
                    title="Ver detalles"
                    className={`w-11 h-11 flex items-center justify-center rounded-xl border-2 transition-colors ${
                        theme === "dark"
                            ? "border-gray-500 text-gray-400 hover:bg-gray-700 hover:text-gray-200 hover:border-gray-400"
                            : "border-gray-400 text-gray-500 hover:bg-gray-100 hover:text-gray-700 hover:border-gray-500"
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                    </svg>
                </button>

                <button
                    onClick={() =>
                        navigate(`/tasks/${task.id}`, {
                            state: { openEdit: true },
                        })
                    }
                    title="Editar tarea"
                    className={`w-11 h-11 flex items-center justify-center rounded-xl border-2 border-blue-500 text-blue-500 transition-colors ${theme === "dark" ? "hover:bg-blue-900/30" : "hover:bg-blue-50"}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                    </svg>
                </button>

                <button
                    onClick={handleDelete}
                    title="Eliminar tarea"
                    className={`w-11 h-11 flex items-center justify-center rounded-xl border-2 border-red-500 text-red-500 transition-colors ${theme === "dark" ? "hover:bg-red-900/30" : "hover:bg-red-50"}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}

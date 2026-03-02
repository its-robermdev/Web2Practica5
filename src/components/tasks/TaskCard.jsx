import { Link } from "react-router-dom";
import { updateTask, deleteTask } from "../../services/taskService";
import { CATEGORIES } from "../../utils/constants";
import { getDueDateLabel, isOverdue } from "../../utils/dateHelpers";
import toast from "react-hot-toast";

export default function TaskCard({ task }) {
    // Encontrar la categoría correspondiente de las constantes
    const category = CATEGORIES.find((c) => c.id === task.category);

    // Validaciones de seguridad por si la categoría no se encuentra
    const categoryColor = category ? category.color : "gray";
    const categoryLabel = category ? category.label : "Otro";

    // Verificar si la tarea está vencida usando el helper
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
        <Link to={`/tasks/${task.id}`} className="block">
            <div
                className={`card hover:shadow-lg transition-all duration-200 relative 
          ${task.completed ? "opacity-60" : ""} 
          ${taskIsOverdue ? "border-2 border-red-500" : "border border-transparent"}
        `}
            >
                {/* Encabezado de la tarjeta: Título y Estado */}
                <div className="flex justify-between items-start mb-2">
                    <h3
                        className={`text-xl font-bold ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}
                    >
                        {task.title}
                    </h3>
                    <span
                        className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                            task.completed
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                        {task.completed ? "Completada" : "Pendiente"}
                    </span>
                </div>

                {/* Descripción (si existe) */}
                {task.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {task.description}
                    </p>
                )}

                {/* Etiquetas de Categoría y Fecha */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium bg-${categoryColor}-100 text-${categoryColor}-800`}
                    >
                        {categoryLabel}
                    </span>

                    {task.dueDate && (
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                taskIsOverdue
                                    ? "bg-red-100 text-red-800"
                                    : "bg-blue-100 text-blue-800"
                            }`}
                        >
                            Vence: {getDueDateLabel(task.dueDate)}
                        </span>
                    )}
                </div>

                {/* Botones de acción (detienen la propagación hacia el Link) */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                    <button
                        onClick={handleToggleComplete}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex-1 ${
                            task.completed
                                ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                        }`}
                    >
                        {task.completed
                            ? "Marcar pendiente"
                            : "Marcar completada"}
                    </button>

                    <button
                        onClick={handleDelete}
                        className="px-3 py-1.5 rounded-md text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </Link>
    );
}

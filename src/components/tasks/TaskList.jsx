import { useState } from "react";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import { useUIStore } from "../../store/uiStore";

export default function TaskList({ tasks }) {
    const [showForm, setShowForm] = useState(false);
    const { theme } = useUIStore();

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2
                    className={`text-2xl font-bold transition-colors ${theme === "dark" ? "text-white" : "text-gray-800"}`}
                >
                    Mis Tareas ({tasks.length})
                </h2>
                <button
                    onClick={() => setShowForm(true)}
                    className="btn-primary"
                >
                    + Nueva Tarea
                </button>
            </div>

            {showForm && (
                <div className="mb-6">
                    <TaskForm onClose={() => setShowForm(false)} />
                </div>
            )}

            {tasks.length === 0 ? (
                <div
                    className={`card text-center py-12 transition-colors ${theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white"}`}
                >
                    <p
                        className={`text-lg transition-colors ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                    >
                        No hay tareas para mostrar
                    </p>
                    <p
                        className={`mt-2 transition-colors ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}
                    >
                        Crea una nueva tarea para comenzar
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            )}
        </div>
    );
}

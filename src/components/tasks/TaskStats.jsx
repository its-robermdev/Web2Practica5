import { useTaskStore } from "../../store/taskStore";
import { isOverdue } from "../../utils/dateHelpers";

export default function TaskStats() {
    const tasks = useTaskStore((state) => state.tasks);

    // Cálculos de stats
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const overdue = tasks.filter((t) =>
        isOverdue(t.dueDate, t.completed),
    ).length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="card text-center p-4">
                <p className="text-gray-500 text-sm font-medium">Total</p>
                <p className="text-2xl font-bold text-blue-600">{total}</p>
            </div>
            <div className="card text-center p-4">
                <p className="text-gray-500 text-sm font-medium">Completadas</p>
                <p className="text-2xl font-bold text-green-600">{completed}</p>
            </div>
            <div className="card text-center p-4">
                <p className="text-gray-500 text-sm font-medium">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-600">{pending}</p>
            </div>
            <div className="card text-center p-4">
                <p className="text-gray-500 text-sm font-medium">Vencidas</p>
                <p className="text-2xl font-bold text-red-600">{overdue}</p>
            </div>
            <div className="card text-center p-4 col-span-2 md:col-span-1">
                <p className="text-gray-500 text-sm font-medium">Progreso</p>
                <p className="text-2xl font-bold text-indigo-600">
                    {percentage}%
                </p>
            </div>
        </div>
    );
}

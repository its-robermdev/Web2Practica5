import { useTaskStore } from "../../store/taskStore";
import { useUIStore } from "../../store/uiStore";
import { isOverdue } from "../../utils/dateHelpers";

export default function TaskStats() {
    const tasks = useTaskStore((state) => state.tasks);
    const { theme } = useUIStore();

    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const overdue = tasks.filter((t) =>
        isOverdue(t.dueDate, t.completed),
    ).length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    const cardClasses = `card text-center p-4 transition-colors ${theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white"}`;
    const textClasses = `text-sm font-medium transition-colors ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`;

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className={cardClasses}>
                <p className={textClasses}>Total</p>
                <p className="text-2xl font-bold text-blue-600">{total}</p>
            </div>
            <div className={cardClasses}>
                <p className={textClasses}>Completadas</p>
                <p className="text-2xl font-bold text-green-600">{completed}</p>
            </div>
            <div className={cardClasses}>
                <p className={textClasses}>Pendientes</p>
                <p className="text-2xl font-bold text-yellow-600">{pending}</p>
            </div>
            <div className={cardClasses}>
                <p className={textClasses}>Vencidas</p>
                <p className="text-2xl font-bold text-red-600">{overdue}</p>
            </div>
            <div className={`${cardClasses} col-span-2 md:col-span-1`}>
                <p className={textClasses}>Progreso</p>
                <p className="text-2xl font-bold text-indigo-600">
                    {percentage}%
                </p>
            </div>
        </div>
    );
}

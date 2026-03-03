import { useTaskStore } from "../../store/taskStore";
import { useUIStore } from "../../store/uiStore";
import { FILTERS, CATEGORIES } from "../../utils/constants";

export default function TaskFilters() {
    const { theme } = useUIStore();
    const {
        currentFilter,
        currentCategory,
        setFilter,
        setCategory,
        searchQuery,
        setSearchQuery,
    } = useTaskStore();

    return (
        <div
            className={`card mb-6 transition-colors ${theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white"}`}
        >
            <div className="mb-4">
                <label
                    className={`block text-sm font-medium mb-2 transition-colors ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}
                >
                    Buscar tarea
                </label>
                <input
                    type="text"
                    placeholder="Buscar por título o descripción..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`input-field transition-colors ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : ""}`}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label
                        className={`block text-sm font-medium mb-2 transition-colors ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}
                    >
                        Filtrar por estado
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {FILTERS.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setFilter(filter.id)}
                                className={`flex-1 sm:flex-none whitespace-nowrap px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                                    currentFilter === filter.id
                                        ? "bg-blue-600 text-white shadow-sm"
                                        : theme === "dark"
                                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label
                        className={`block text-sm font-medium mb-2 transition-colors ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}
                    >
                        Filtrar por categoría
                    </label>
                    <select
                        value={currentCategory}
                        onChange={(e) => setCategory(e.target.value)}
                        className={`input-field transition-colors ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                    >
                        <option value="all">Todas las categorías</option>
                        {CATEGORIES.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

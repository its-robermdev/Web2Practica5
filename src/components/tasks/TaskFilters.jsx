import { useTaskStore } from "../../store/taskStore";
import { FILTERS, CATEGORIES } from "../../utils/constants";

export default function TaskFilters() {
    const {
        currentFilter,
        currentCategory,
        setFilter,
        setCategory,
        searchQuery,
        setSearchQuery,
    } = useTaskStore();

    return (
        <div className="card mb-6">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buscar tarea
                </label>
                <input
                    type="text"
                    placeholder="Buscar por título o descripción..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Filtrar por categoría
                    </label>
                    <select
                        value={currentCategory}
                        onChange={(e) => setCategory(e.target.value)}
                        className="input-field"
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

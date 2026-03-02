import { create } from "zustand";

export const useTaskStore = create((set) => ({
    // Estado
    tasks: [],
    loading: false,
    error: null,

    // Filtros activos
    currentFilter: "all", // 'all' | 'completed' | 'pending'
    currentCategory: "all", // 'all' | 'work' | 'personal' | 'shopping' | 'other'
    searchQuery: "",

    // Reemplazar todas las tareas (Firestore)
    setTasks: (tasks) => set({ tasks, loading: false, error: null }),

    // Agregar una nueva tarea
    addTask: (task) =>
        set((state) => ({
            tasks: [...state.tasks, task],
        })),

    // Actualizar una tarea
    updateTask: (taskId, updatedTask) =>
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === taskId ? { ...task, ...updatedTask } : task,
            ),
        })),

    // Eliminar una tarea
    deleteTask: (taskId) =>
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== taskId),
        })),

    // Cambiar filtro activo
    setFilter: (filter) => set({ currentFilter: filter }),

    // Cambiar categoría activa
    setCategory: (category) => set({ currentCategory: category }),

    // Función de buscador
    setSearchQuery: (query) => set({ searchQuery: query }),

    // Estado de carga
    setLoading: (loading) => set({ loading }),
    // Manejo de errores
    setError: (error) => set({ error, loading: false }),
}));

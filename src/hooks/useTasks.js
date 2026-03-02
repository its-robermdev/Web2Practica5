import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useTaskStore } from '../store/taskStore';
import { subscribeToTasks } from '../services/taskService';

/**
* Hook personalizado para actualizar las tareas en tiempo real (cuando cambia el firestore, se actualiza el estado)
*/
export const useTasks = () => {
    const user = useAuthStore((state) => state.user);
    const { setTasks, setLoading } = useTaskStore();
    useEffect(() => {
        if (!user) return;
        setLoading(true);
        // Suscribirse a cambios en tiempo real
        const unsubscribe = subscribeToTasks(
            user.uid,
            (tasks) => {
                setTasks(tasks);
            }
        );
        // Cleanup: desuscribirse cuando se desmonta el componente
        return () => {
            unsubscribe();
        };
    }, [user, setTasks, setLoading]);
};

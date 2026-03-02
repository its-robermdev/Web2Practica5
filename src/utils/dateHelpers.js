import { format, formatDistanceToNow, isPast, isToday, isTomorrow } from 'date-fns';
import { es } from 'date-fns/locale';

//Formatear fecha
export const formatDate = (date) => {
    if (!date) return '';
    return format(date, 'dd/MM/yyyy', { locale: es });
};

//Formatear fecha y hora
export const formatDateTime = (date) => {
    if (!date) return '';
    return format(date, 'dd/MM/yyyy HH:mm', { locale: es });
};

//Obtener tiempo relativo (ej. "hace 3 días")
export const getRelativeTime = (date) => {
    if (!date) return '';
    return formatDistanceToNow(date, { addSuffix: true, locale: es });
};

// Verificar si una tarea está vencida (fecha de vencimiento pasada y no completada)
export const isOverdue = (dueDate, completed) => {
    if (!dueDate || completed) return false;
    return isPast(dueDate) && !isToday(dueDate);
};

// Obtener etiqueta de fecha de vencimiento (Hoy, Mañana, Vencida o fecha formateada)
export const getDueDateLabel = (dueDate) => {
    if (!dueDate) return null;
    if (isToday(dueDate)) return 'Hoy';
    if (isTomorrow(dueDate)) return 'Mañana';
    if (isPast(dueDate)) return 'Vencida';
    return formatDate(dueDate);
};

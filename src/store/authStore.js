import { create } from 'zustand';
import { auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const useAuthStore = create((set) => ({
    // Estado inicial
    user: null,
    loading: true, // mientras se verifica si hay sesion activa

    // Actualizar usuario
    setUser: (user) => set({ user, loading: false }),

    // Cerrar sesión
    clearUser: () => set({ user: null, loading: false }),

    // Verificar cambios en la autenticación (iniciar sesion, cerrar sesion, recargar pagina)
    initializeAuth: () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                set({
                    user: {
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName
                    },
                    loading: false
                });
            } else {
                set({ user: null, loading: false });
            }
        });
    }
}));
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create(
    // persist → guarda automáticamente en localStorage
    persist(
        (set) => ({
            theme: 'light',
            sidebarOpen: true,

            // Cambiar tema
            toggleTheme: () => set((state) => ({
                theme: state.theme === 'light' ? 'dark' : 'light'
            })),

            toggleSidebar: () => set((state) => ({
                sidebarOpen: !state.sidebarOpen
            })),

            setSidebarOpen: (open) => set({ sidebarOpen: open })
        }),
        {
            name: 'ui-preferences', // clave en localStorage
            // Solo persiste el tema, el sidebar no
            partialize: (state) => ({
                theme: state.theme
            })
        }
    )
);
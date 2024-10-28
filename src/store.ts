import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserStore, SettingsStore } from './types';

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      logged: false,
      changeLogged: () => set((state) => ({ logged: !state.logged })),
    }),
    {
      name: 'user-storage', // Le nom de la clé dans le localStorage
    }
  )
);
export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      loading: false,
      changeLoading: () => set((state) => ({ loading: !state.loading })),
    }),
    {
      name: 'settings-storage',
    }
  )
);

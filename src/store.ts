import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserStore, SettingsStore } from './types';

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      logged: false,
      setLogged: (isLogged) => set(() => ({ logged: isLogged })),
    }),
    {
      name: 'user-storage', // Le nom de la clé dans le localStorage
    }
  )
);
export const useSettingsStore = create<SettingsStore>()((set) => ({
  loading: false,
  setLoading: (isLoading) => set(() => ({ loading: isLoading })),
  backError: '',
  setError: (errorMessage) => set(() => ({ backError: errorMessage })),
}));

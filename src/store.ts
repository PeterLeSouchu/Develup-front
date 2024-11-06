import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserStore, SettingsStore } from './types';

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      logged: true,
      setLogged: (isLogged) => set(() => ({ logged: isLogged })),
      darkTheme: true,
      setDarkTheme: (isDarkTheme) => set(() => ({ darkTheme: isDarkTheme })),
    }),
    {
      name: 'user-storage', // Le nom de la clé dans le localStorage
    }
  )
);
export const useSettingsStore = create<SettingsStore>()((set) => ({
  loading: false,
  setLoading: (isLoading) => set(() => ({ loading: isLoading })),
}));

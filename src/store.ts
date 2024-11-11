import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserStoreType, SettingsStoreType } from './types';

export const useUserStore = create<UserStoreType>()(
  persist(
    (set) => ({
      logged: false,
      setLogged: (isLogged) => set(() => ({ logged: isLogged })),
      darkTheme: false,
      setDarkTheme: (isDarkTheme) => set(() => ({ darkTheme: isDarkTheme })),
    }),
    {
      name: 'user-storage', // Le nom de la clé dans le localStorage
    }
  )
);
export const useSettingsStore = create<SettingsStoreType>()((set) => ({
  loading: false,
  setLoading: (isLoading) => set(() => ({ loading: isLoading })),
  globalErrorMessage: '',
  setGlobalErrorMessage: (message) =>
    set(() => ({ globalErrorMessage: message })),
}));

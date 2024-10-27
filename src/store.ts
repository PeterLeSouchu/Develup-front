import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppStore } from './types';

const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      logged: false,
      changeLogged: () => set((state) => ({ logged: !state.logged })),
    }),
    {
      name: 'app-storage', // Le nom de la clé dans le localStorage
    }
  )
);

export default useAppStore;

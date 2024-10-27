import { create } from 'zustand';
import { AppStore } from './types';

const useAppStore = create<AppStore>()((set) => ({
  logged: false,
  changeLogged: () => set((state) => ({ logged: !state.logged })),
}));

export default useAppStore;

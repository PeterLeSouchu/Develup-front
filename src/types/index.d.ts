import { FieldError } from 'react-hook-form';

export interface FormSignupType {
  email: string;
  pseudo: string;
  password: string;
  passwordConfirm: string;
  cgu: boolean;
}

export interface ResetPasswordFormType {
  password: string;
  passwordConfirm: string;
}

export interface UserStore {
  logged: boolean;
  setLogged: (isLogged: boolean) => void;
  darkTheme: boolean;
  setDarkTheme: (isDarkTheme: boolean) => void;
}

export interface SettingsStore {
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
  authErrorMessage: string;
  setAuthErrorMessage: (message: string) => void;
}

export interface HookFormErrorType {
  error: FieldError | undefined;
  message: string | undefined;
}

export interface BackErrorType {
  message: string | undefined;
}

export interface Technologie {
  id: number;
  name: string;
  image: string;
}

export interface Project {
  id: number;
  title: string;
  rhythm: string;
  description: string;
  image: string;
  author: string;
  techno: Technologie[];
}

export interface ProjectsAndTechnos {
  Projects: Project[];
  Technologies: Technologie[];
}

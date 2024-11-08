import { FieldError } from 'react-hook-form';

export interface FormSignup {
  email: string;
  pseudo: string;
  password: string;
  passwordConfirm: string;
  cgu: boolean;
}

export interface FormSignin {
  email: string;
  password: string;
}

export interface ResetPasswordForm {
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
}

export interface FrontErrorType {
  error: FieldError | undefined;
  message: string | undefined;
}

export interface BackErrorType {
  message: string | undefined;
}

export interface ApiResponse {
  message: string;
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
  url: string;
  user_id: number;
  user_id: number;
  techno: Technologie[];
}

export interface ProjectsAndTechnos {
  projects: Project[];
  technologies: Technologie[];
}

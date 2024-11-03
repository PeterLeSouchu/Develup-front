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
}

export interface SettingsStore {
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
  backError: string;
  setError: (errorMessage: string) => void;
}

export interface ErrorComponent {
  frontError: FieldError | undefined;
  errorMessage: string | undefined;
}

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
  changeLogged: () => void;
}

export interface SettingsStore {
  loading: boolean;
  changeLoading: () => void;
}

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

export interface AppStore {
  logged: boolean;
  changeLogged: () => void;
}

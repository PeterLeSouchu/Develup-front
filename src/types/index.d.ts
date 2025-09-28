import { FieldError } from 'react-hook-form';

export interface FormSignupType {
  email: string;
  pseudo: string;
  password: string;
  passwordConfirm: string;
  cgu: boolean;
}

export interface FormProjectType {
  title: string;
  rhythm: string;
  image?: File | null;
  description: string;
}

export interface FormEditProfileType {
  pseudo: string;
  type: string;
  image?: File | null;
  description: string;
}

export interface ProfileType {
  email: string;
  pseudo: string;
  description: string;
  type: string | undefined;
  image: string | undefined;
  techno: TechnologieType[];
  slug: string;
}

export interface ResetPasswordFormType {
  password: string;
  passwordConfirm: string;
}

export interface UserStoreType {
  logged: boolean;
  setLogged: (isLogged: boolean) => void;
  darkTheme: boolean;
  setDarkTheme: (isDarkTheme: boolean) => void;
}

export interface SettingsStoreType {
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
  globalErrorMessage: string;
  setGlobalErrorMessage: (message: string) => void;
}

export interface HookFormErrorType {
  error: FieldError | undefined;
  message: string | undefined;
}

export interface BackErrorType {
  message: string | undefined;
}

export interface TechnologieType {
  id: number;
  name: string;
  image: string;
}

export interface ProjectType {
  id: string;
  user_id: string;
  title: string;
  rhythm: string;
  description: string;
  image: string;
  slug: string;
  user_slug: string;
  pseudo: string;
  techno: TechnologieType[];
  created_at: string;
  ownProject: boolean;
  isAlreadyConversation: string;
}

export interface ProjectsAndTechnosType {
  projects: ProjectType[];
  technologies: TechnologieType[];
}

export interface UserType {
  id: string;
  pseudo: string;
  image: string;
  slug: string;
  type: string;
  description: string;
  techno: TechnologieType[];
}

export interface DeleteModalType {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
  setProjectId: React.Dispatch<React.SetStateAction<string>>;
  setResults: React.Dispatch<React.SetStateAction<ProjectType[]>>;
}

export interface EditModalType {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  projectSlug: string;
  setProjectSlug: React.Dispatch<React.SetStateAction<string>>;
  setResults: React.Dispatch<React.SetStateAction<ProjectType[]>>;
}

export interface CreateModalType {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setResults: React.Dispatch<React.SetStateAction<ProjectType[]>>;
}

export interface EditImageProfileModalType {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  image: string | undefined;
  changeImage: React.Dispatch<React.SetStateAction<ProfileType | undefined>>;
}

export interface FormProfileImageType {
  image?: File | null;
}

export interface ImageEditComponentType {
  image: string | undefined;
  changeImage: React.Dispatch<React.SetStateAction<ProfileType | undefined>>;
}

export interface EditProfileModalType {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setResults: React.Dispatch<React.SetStateAction<ProfileType | undefined>>;
}

export interface DeleteAccountModalType {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SendMessageModalType {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
  userId: string;
}

export interface EditPasswordModalType {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface EditPasswordFormType {
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface ConversationType {
  id: string;
  title: string;
  image: string;
  message: string;
  author_message_pseudo: string;
  user_project_pseudo: sring;
}

export interface ConversationWithMessagesType {
  id: string;
  title: string;
  image: string;
  pseudo: string;
  messages: MessageType[];
  project_slug: string;
  user_slug: string;
}

export interface MessageType {
  id: string;
  date: string;
  content: string;
  isMe: boolean;
}

export interface MessageWebSocketType {
  id: string;
  date: string;
  content: string;
  user_id: string;
}

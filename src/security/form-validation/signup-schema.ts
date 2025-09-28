import { z } from 'zod';

const passwordMessage =
  'Le mot de passe doit contenir au minimum 8 caractères, 1 majuscule, 1 chiffre et un caractère spécial';

const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, "L'email est requis")
      .email("L'email n'est pas valide"),
    pseudo: z
      .string()
      .min(1, 'Le pseudo est requis')
      .min(2, 'Le pseudo doit contenir au moins 2 caractères')
      .max(30, 'Le pseudo ne doit pas dépasser 30 caractères')
      .regex(/^\S*$/, "Le pseudo ne doit pas contenir d'espaces"),
    password: z
      .string()
      .min(1, 'Le mot de passe est requis')
      .min(8, passwordMessage)
      .regex(/[A-Z]/, passwordMessage)
      .regex(/[0-9]/, passwordMessage)
      .regex(/[!@#$%^&*(),.?":{}|<>.]/, passwordMessage),
    passwordConfirm: z.string().min(1, 'Veuillez confirmer votre mot de passe'),
    cgu: z.boolean().refine((val) => val === true, {
      message: "Vous devez accepter les Conditions Générales d'Utilisation",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Les mots de passe ne correspondent pas',
  });

export default signupSchema;

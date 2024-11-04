import { z } from 'zod';

const passwordMessage =
  'Le mot de passe doit contenir au minimum 8 caractères, 1 majuscule, 1 chiffre et un caractère spécial';

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, passwordMessage)
      .regex(/[A-Z]/, passwordMessage)
      .regex(/[0-9]/, passwordMessage)
      .regex(/[!@#$%^&*(),.?":{}|<>.]/, passwordMessage),
    passwordConfirm: z.string().min(1, 'Veuillez confirmer votre mot de passe'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Les mots de passe ne correspondent pas',
  });

export default resetPasswordSchema;

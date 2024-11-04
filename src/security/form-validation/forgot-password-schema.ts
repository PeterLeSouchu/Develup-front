import { z } from 'zod';

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("L'email n'est pas valide"),
});

export default forgotPasswordSchema;

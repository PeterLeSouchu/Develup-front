import { z } from 'zod';

const otpCodeSchema = z.object({
  userOTPcode: z.string().length(6, 'Le code OTP doit contenir 6 caractères'),
});

export default otpCodeSchema;

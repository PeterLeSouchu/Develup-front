import { z } from 'zod';

const profileImageSchema = z.object({
  image: z
    .union([z.instanceof(File).optional(), z.instanceof(FileList).optional()])
    .refine(
      (image) => {
        if (image instanceof File) {
          return (
            (image.type === 'image/png' ||
              image.type === 'image/jpeg' ||
              image.type === 'image/webp') &&
            image.size <= 5 * 1024 * 1024
          );
        }
        return true;
      },
      {
        message:
          'Le fichier doit être au format PNG, JPEG ou webp et ne doit pas dépasser 5 Mo',
      }
    ),
});
export default profileImageSchema;

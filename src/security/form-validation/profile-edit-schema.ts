import { z } from 'zod';

// Here we have to make an union in image input because React hook form send "FileList[]" when user send form without image ,after that if he put an image the value type is "File" and then if he  delete image before send form, the value is "undefined" so we have to check File type "instanceof(File)" when there's an image, FileList type "instanceof(FileList)" when no image sent, and undefined type "optional()" when user delete image

const profileEditSchema = z.object({
  pseudo: z
    .string()
    .min(1, 'Le pseudo est requis')
    .max(30, 'Le pseudo ne peut pas posséder plus de 30 caractères'),
  type: z.union([z.string(), z.null()]).optional(),
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
  description: z.union([z.string(), z.null()]).optional(),
});
export default profileEditSchema;

// // import React from 'react';
// // import { useForm, Controller } from 'react-hook-form';
// // import ReactQuill from 'react-quill';
// // import 'react-quill/dist/quill.snow.css'; // Import du style de Quill
// // import HookFormError from '../../all/errors/Hook-form-error';

// // function MyForm() {
// //   const {
// //     control,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm();

// //   const onSubmit = (data) => {
// //     console.log('Données soumises:', data); // Affichage des données soumises
// //   };

// //   return (
// //     <form onSubmit={handleSubmit(onSubmit)}>
// //       <div>
// //         <p>Description</p>
// //         <Controller
// //           name="description" // Nom du champ dans le formulaire
// //           control={control}
// //           rules={{
// //             required: 'La description est obligatoire',
// //             minLength: {
// //               value: 10,
// //               message: 'La description doit contenir au moins 10 caractères',
// //             },
// //           }}
// //           render={({ field }) => (
// //             <ReactQuill
// //               {...field} // Récupère toutes les props nécessaires de RHF
// //               theme="snow"
// //               value={field.value || ''} // Gère la valeur de l'éditeur
// //               onChange={field.onChange} // Gère le changement de valeur
// //             />
// //           )}
// //         />
// //         {errors.description && <p>{errors.description.message}</p>}
// //         {/* Affichage des erreurs */}
// //       </div>

// //       <button type="submit">Envoyer</button>
// //     </form>
// //   );
// // }

// // export default MyForm;

import { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';

export default function MyForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    register('emailContent', { required: true, minLength: 11 });
  }, [register]);

  const onEditorStateChange = (editorState: string) => {
    setValue('emailContent', editorState);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const editorContent = watch('emailContent');

  return (
    <div className="text-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ReactQuill
          theme="snow"
          value={editorContent}
          onChange={(e) => onEditorStateChange(e)}
        />
        <p className="Error">{errors.emailContent && 'Enter valid content'}</p>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

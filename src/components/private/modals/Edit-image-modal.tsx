/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MdDelete } from 'react-icons/md';
import { useSettingsStore } from '../../../store';
// import BackError from '../../all/errors/Back-error';
import {
  EditImageProfileModalType,
  FormProfileImageType,
  ProfileType,
} from '../../../types';
import LoaderWrapper from '../../all/loader/Loader-wrapper';
import profileImageSchema from '../../../security/form-validation/profile-image-schema';
import defaultUserImage from '../../../assets/images/default-user-image.png';
import HookFormError from '../../all/errors/Hook-form-error';
import BackError from '../../all/errors/Back-error';
import axiosWithCSRFtoken from '../../../utils/request/axios-with-csrf-token';

function EditImageModal({
  setModal,
  image,
  changeImage,
}: EditImageProfileModalType) {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { setGlobalErrorMessage, setLoading } = useSettingsStore();
  const [imagePreview, setImagePreview] = useState<string | undefined>('');
  const [imageChanged, setImageChanged] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    resetField,
  } = useForm<FormProfileImageType>({
    resolver: zodResolver(profileImageSchema),
  });

  async function onSubmit(data: FormProfileImageType) {
    const formData = new FormData();

    // Here i have to do with Object.entries because if i append with condition 'if (imageChanged)' when user delete image and send it to back server (in order to don't have profile picture), form is send without image input and in back we can't delete image in cloudinary cause we use a condition in back server to watch if input value is 'undefined'
    Object.entries(data).forEach(([key, value]) => {
      if (imageChanged && key === 'image') {
        formData.append(key, value);
      }
    });
    try {
      setLoading(true);
      const { data: dataEdit } = await axiosWithCSRFtoken.patch(
        '/edit-profile-image',
        formData
      );
      const newImage = dataEdit.result.image;
      changeImage((prev) => {
        return { ...prev, image: newImage } as ProfileType;
      });
      setLoading(false);
      return setModal(false);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message;
        if (message === 'Votre session a expiré, veuillez vous reconnecter') {
          return setGlobalErrorMessage(message);
        }
        return setErrorMessage(message);
      }
      return setGlobalErrorMessage(
        'Erreur innatendu, essayez de vous reconnecter'
      );
    }
  }

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageChanged(true);
    const file = event.target.files?.[0];
    if (file) {
      setValue('image', file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDeleteImage = () => {
    setImageChanged(true);
    setImagePreview('');
    resetField('image');
  };

  useEffect(() => {
    setImagePreview(image);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [image]);

  return (
    <div
      aria-label="close modal"
      onKeyDown={() => setModal(false)}
      role="button"
      tabIndex={0}
      className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center cursor-default"
      onClick={() => setModal(false)}
    >
      <div
        className="p-3 z-50 bg-white rounded-lg min-w-80 h-4/5 max-h-35 overflow-hidden  flex justify-center items-center dark:text-black flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full h-full overflow-auto"
        >
          <LoaderWrapper>
            <div className="flex md:items-center justify-around md:flex-row flex-col w-full">
              <div className="flex flex-col items-center mb-7 md:pb-0 ">
                <div className=" relative w-72 h-72 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center bg-gray-100 mb-10">
                  <BackError message={errorMessage} />
                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        alt="Prévisualisation"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleDeleteImage}
                        className="absolute top-5 right-16 "
                      >
                        <MdDelete className=" bg-white2 p-1 rounded-2xl text-4xl hover:scale-125 transition" />
                      </button>
                    </>
                  ) : (
                    <img
                      src={defaultUserImage}
                      alt="Prévisualisation"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <label
                  htmlFor="image"
                  className="mt-4 px-4 py-2 bg-gold hover:bg-darkgold transition rounded-xl cursor-pointer"
                >
                  Choisir une image
                </label>
                <HookFormError
                  error={errors.image}
                  message={errors.image?.message}
                />
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  accept="image/*"
                  {...register('image')}
                  onChange={(e) => handleChangeImage(e)}
                />
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                className="p-2 mt-5 bg-red-400  rounded-lg hover:bg-red-500 transition"
                onClick={() => setModal(false)}
              >
                annuler
              </button>
              <button
                type="submit"
                className="p-2 mt-5 bg-green-400  rounded-lg hover:bg-green-500 transition"
              >
                Enregistrer
              </button>
            </div>
          </LoaderWrapper>
        </form>
      </div>
    </div>
  );
}

export default EditImageModal;

import axios from 'axios';

export default async function tryCatchWrapper<T>(asyncFunc: () => Promise<T>) {
  try {
    return await asyncFunc();
  } catch (error) {
    console.log('VOICI LEREURRRR');
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.message);
      return { success: false, message: error.message };
    }
    console.error('Erreur inattendue:', error);
    return { success: false, message: 'Une erreur inattendue est survenue.' };
  }
}

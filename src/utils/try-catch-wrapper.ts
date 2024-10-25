import axios from 'axios';

export default async function tryCatchWrapper<T>(asyncFunc: () => Promise<T>) {
  try {
    return await asyncFunc();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erreur lors de la requête:', error.message);
      return { success: false, message: error.message };
    }
    console.error('Erreur inattendue:', error);
    return { success: false, message: 'Une erreur inattendue est survenue.' };
  }
}

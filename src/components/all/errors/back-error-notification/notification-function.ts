import { Slide, toast } from 'react-toastify';

const errorNotification = (errorMessage: string) => {
  toast.error(errorMessage, {
    position: 'top-left',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Slide,
  });
};

export default errorNotification;

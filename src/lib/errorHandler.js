import { toast, Bounce } from 'react-toastify';

const handleServerError = (errorStatus, message, navigate = null) => {
  const toastProp = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    transition: Bounce,
  };

  if (message.includes('password')) {
    return toast.warning(message, { ...toastProp });
  }

  if (message.includes('jwt')) {
    navigate ? navigate('/login') : (window.location.href = '/login');
    return;
  }

  switch (errorStatus) {
    case 400:
      toast.warning(message, { ...toastProp });
      break;
    case 403:
      // Redirect to login for unauthorized access (JWT issues)
      toast.error('Unauthorized. Redirecting to login...', { ...toastProp });
      navigate ? navigate('/login') : (window.location.href = '/login');
      break;

    case 404:
      toast.error(message, { ...toastProp });
      break;

    case 500:
    default:
      // Handles general server errors and any unspecified status
      toast.error('Something went really wrong. Try again later.', {
        ...toastProp,
      });
      break;
  }
};

export { handleServerError };

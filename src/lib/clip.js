import { toastProp } from './toast_prop';
import { toast } from 'react-toastify';
export const copyToClipboard = (text) => {
  // console.log(text);
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success('Text copied to clipboard!', { ...toastProp });
    })
    .catch((error) => {
      toast.warning('Failed to copy text to clipboard: ', { ...toastProp });
    });
};

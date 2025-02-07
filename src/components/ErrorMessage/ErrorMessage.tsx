import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const ErrorMessage = () => {
  const hasToastShown = useRef(false);

  useEffect(() => {
    if (!hasToastShown.current) {
      toast.error('Something went wrong 🤦‍♂️, try again...');
      hasToastShown.current = true;
    }
  }, []);

  return null;
};

export default ErrorMessage;

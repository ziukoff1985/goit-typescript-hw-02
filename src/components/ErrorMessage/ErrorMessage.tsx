import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const ErrorMessage: React.FC = () => {
  const hasToastShown = useRef<boolean>(false);

  useEffect(() => {
    if (!hasToastShown.current) {
      toast.error('Something went wrong 🤦‍♂️, try again...');
      hasToastShown.current = true;
    }
  }, []);

  return null;
};

export default ErrorMessage;

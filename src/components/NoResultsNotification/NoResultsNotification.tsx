import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

interface ErrorNotificationProps {
  message?: string;
}

const ErrorNotification = ({
  message,
}: ErrorNotificationProps): JSX.Element | null => {
  const hasToastShown = useRef<boolean>(false);

  useEffect(() => {
    if (!hasToastShown.current) {
      toast.error(
        message || 'No results found. Please try a different query. 🤷‍♂️'
      );
      hasToastShown.current = true;
    }
  }, [message]);

  return null;
};

export default ErrorNotification;

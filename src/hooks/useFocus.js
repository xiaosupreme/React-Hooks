import { useRef } from 'react';

const useFocus = () => {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return inputRef;
};

export default useFocus;

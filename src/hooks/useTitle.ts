import { useEffect } from 'react';

const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, []);

  return;
};

export default useTitle;

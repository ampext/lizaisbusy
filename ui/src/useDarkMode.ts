import { useEffect, useState } from 'react';

const darkClassName = 'dark';
const localStorageKey = 'dark-mode';

function useDarkMode(): [boolean, (boolean) => void] {
  const [isDark, setDarkMode] = useState(!!window.localStorage.getItem(localStorageKey));
  
  if (isDark) {
    document.body.classList.add(darkClassName);
    window.localStorage.setItem(localStorageKey, 'true');
  } else {
    document.body.classList.remove(darkClassName);
    window.localStorage.removeItem(localStorageKey);
  }

  useEffect(() => {
    return () => {
      document.body.classList.remove(darkClassName);
    }
  }, []);

  return [isDark, setDarkMode];
}

export default useDarkMode;
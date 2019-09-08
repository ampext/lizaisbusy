import { useEffect } from "react";

const darkClassName = 'dark';

function useDarkTheme(isDark) {
  useEffect(() => {
    
    if (isDark) {
      document.body.classList.add(darkClassName);
    } else {
      document.body.classList.remove(darkClassName);
    }

    return () => {
      document.body.classList.remove(darkClassName);
    };
  }, [isDark]);
}

export default useDarkTheme;
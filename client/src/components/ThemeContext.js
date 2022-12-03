import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {

  const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
    if (theme === 'light') {
    setTheme('dark');
    } else {
    setTheme('light');
    }
    };
    useEffect(() => {
    document.body.className = theme;
    }, [theme]);


  return (
    <ThemeContext.Provider value={{theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

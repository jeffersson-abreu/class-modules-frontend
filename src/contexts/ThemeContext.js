import React, { createContext, useEffect, useState } from 'react';
import { darkTheme, lightTheme } from '../theme';
import { ThemeProvider } from 'styled-components';


export const CustomThemeContext = createContext({
  toggleTheme: () => { },
  isDarkTheme: null,
  theme: {}
});

export const CustomThemeProvider = ({ children }) => {

  // Verify the system theme. Here we always start with the system theme
  let isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // The user preference is most important thing so we override 
  // the system theme and start with the user theme like
  const userPreference = localStorage.getItem('theme');
  if (userPreference !== null) {
    isSystemDark = userPreference === 'dark' ? true : false;
  }

  const [isDarkTheme, setIsDarkTheme] = useState(isSystemDark);
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    setTheme(isDarkTheme ? darkTheme : lightTheme);
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme])

  // Switch dark mode state
  const toggleTheme = () => {
    setIsDarkTheme(prevState => !prevState);
  }

  return (
    <CustomThemeContext.Provider value={{ isDarkTheme, toggleTheme, theme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </CustomThemeContext.Provider>
  )
}
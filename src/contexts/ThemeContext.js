import React, { createContext, useEffect, useState } from 'react';
import { darkTheme, lightTheme } from '../theme';
import { ThemeProvider } from 'styled-components';


export const CustomThemeContext = createContext({
  toggleTheme: () => { },
  isDarkTheme: null,
  theme: {}
});

export const CustomThemeProvider = ({ children }) => {

  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    setTheme(isDarkTheme ? darkTheme : lightTheme)
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
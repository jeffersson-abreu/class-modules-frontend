import { ThemeContext } from '../contexts';
import { useContext } from 'react';


const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) throw new Error('Theme context must be use inside ThemeProvider');
  return { ...context };
};

export default useTheme;
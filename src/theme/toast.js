import { ToastContainer } from 'react-toastify';
import { useTheme } from '../hooks';


export const ToastThemed = () => {
  const { isDarkTheme } = useTheme();

  return (
    <ToastContainer
      theme={isDarkTheme ? 'dark' : 'light'}
    />
  )
}
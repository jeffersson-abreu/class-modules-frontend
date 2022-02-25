import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  image: '/bg-form-light.png',
  primary: '#ffffff',
  secondary: '#25cbd3',
  tertiary: '#24124b',
  quaternary: '#f7f7f7',
  error: '#ff7563'
}

export const darkTheme = {
  image: '/bg-form-dark.png',
  primary: '#1c0c3f',
  secondary: '#9cf27f',
  tertiary: '#fafafa',
  quaternary: '#24124b',
  error: '#ff7563'
}


export const GlobalStyle = createGlobalStyle`
  :root {
    --toastify-font-family: Nunito;

    --toastify-color-light: #434343;
    --toastify-color-dark: #434343;

    --toastify-text-color-light: #FFF;
    --toastify-text-color-dark: #FFF;
  }

  font-family: Nunito;
`;

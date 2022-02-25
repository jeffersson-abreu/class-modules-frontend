import { AuthProvider, ThemeProvider, ModulesProvider, ClassesProvider } from './contexts';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';
import { ToastThemed } from './theme/toast';
import { GlobalStyle } from './theme';
import ReactDOM from 'react-dom';
import AppRoutes from './routes';
import React from 'react';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <ToastThemed />
        <GlobalStyle />
        <ModulesProvider>
          <ClassesProvider>
            <AppRoutes />
          </ClassesProvider>
        </ModulesProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

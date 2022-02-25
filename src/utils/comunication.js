import { toast } from 'react-toastify';
import axios from 'axios';


const api = axios.create({
  baseURL: 'http://192.168.0.2:8000',
});

// Add a request interceptor to insert user token
api.interceptors.request.use(async config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, (error) => Promise.reject(
  toast.error("Falha na conexão", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
));

api.interceptors.response.use(
  (response) => response,
  (error) => {
    Promise.reject(
      // Server return a message in some requests
      // make sure it is on reponse to display it
      (error && error.response && error.response.data) ?
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        :
        toast.error("Falha na comunicação com o banco de dados", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
    )
  }
);

export default api;
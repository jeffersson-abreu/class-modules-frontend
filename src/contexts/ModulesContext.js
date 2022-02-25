import React, { createContext, useState, useEffect } from 'react';
import { api } from '../utils';


export const ModulesContext = createContext({
  update_module: async () => { },
  delete_module: async () => { },
  create_module: async () => { },
  get_modules: async () => { },
  modules: []
});


export const ModulesProvider = ({ children }) => {
  const [modules, setModules] = useState([]);


  const get_modules = async () => {
    const response = await api.get('/modules');
    setModules(response.data);
  };

  useEffect(() => {
    get_modules();
  }, [])


  const delete_module = async (id) => {
    const response = await api.delete(`/modules/${id}`);
    response && (await get_modules())
    return response;
  };

  const update_module = async (id, data) => {
    const response = await api.patch(`/modules/${id}`, data);
    response && (await get_modules())
    return response;
  };

  const create_module = async (data) => {
    const response = await api.post('/modules', data);
    response && (await get_modules())
    return response;
  };

  return (
    <ModulesContext.Provider value={{
      delete_module,
      create_module,
      update_module,
      get_modules,
      modules
    }}>
      {children}
    </ModulesContext.Provider>
  )
}
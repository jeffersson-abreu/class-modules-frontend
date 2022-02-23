import React, { createContext, useState, useEffect } from 'react';
import { api } from '../utils';


export const ModulesContext = createContext({
  get_module_classes: () => { },
  update_module: () => { },
  delete_module: () => { },
  create_module: () => { },
  get_modules: () => { },
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

  const get_module_classes = async (module) => {
    const response = await api.get(`/modules/${module}/classes`);
    setModules(response.data);
  };


  const delete_module = async (id) => {
    await api.delete(`/module/${id}`);
    await get_modules();
  };

  const update_module = async (id, data) => {
    await api.patch(`/modules/${id}`, data);
    await get_modules();
  };

  const create_module = async (data) => {
    await api.patch(`/modules/`, data);
    await get_modules();
  };

  return (
    <ModulesContext.Provider value={{
      get_module_classes,
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
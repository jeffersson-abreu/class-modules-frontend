import React, { createContext, useState } from 'react';
import { useModules } from '../hooks';
import { api } from '../utils';


export const ClassesContext = createContext({
  get_module_classes: async () => { },
  update_class: async () => { },
  delete_class: async () => { },
  create_class: async () => { },
  classes: []
});


export const ClassesProvider = ({ children }) => {
  const [classes, setClasses] = useState([]);

  const { get_modules } = useModules();

  const get_module_classes = async (module) => {
    const response = await api.get(`/modules/${module}/classes`);
    response && (setClasses(response.data))
    return response;
  };

  const delete_class = async (module, _class) => {
    const response = await api.delete(`/class/${_class}`);
    response && (await get_module_classes(module)) && await get_modules();
    return response;
  };

  const update_class = async (module, _class, data) => {
    const response = await api.patch(`/class/${_class}`, data);
    response && (await get_module_classes(module)) && await get_modules()
    return response;
  };

  const create_class = async (module, data) => {
    const response = await api.post('/class', data);
    response && (await get_module_classes(module)) && await get_modules()
    return response;
  };

  return (
    <ClassesContext.Provider value={{
      get_module_classes,
      delete_class,
      create_class,
      update_class,
      classes
    }}>
      {children}
    </ClassesContext.Provider>
  )
}
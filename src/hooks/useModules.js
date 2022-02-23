import { ModulesContext } from '../contexts';
import { useContext } from 'react';


const useModules = () => {
  const context = useContext(ModulesContext);

  if (!context) throw new Error('Modules context must be use inside ModulesProvider');
  return { ...context };
};

export default useModules;
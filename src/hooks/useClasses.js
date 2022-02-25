import { ClassesContext } from '../contexts';
import { useContext } from 'react';


const useClasses = () => {
  const context = useContext(ClassesContext);

  if (!context) throw new Error('Classes context must be use inside ClassesProvider');
  return { ...context };
};

export default useClasses;
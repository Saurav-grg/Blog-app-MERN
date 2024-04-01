import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error('context must be inside auth provider');
  }
  return context;
};

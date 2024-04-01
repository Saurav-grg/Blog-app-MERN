import { useContext } from 'react';
import { BlogsContext } from '../context/BlogsContext';

export const useBlogsContext = () => {
  const context = useContext(BlogsContext);
  if (!context) {
    throw Error('context must be inside auth provider');
  }
  return context;
};

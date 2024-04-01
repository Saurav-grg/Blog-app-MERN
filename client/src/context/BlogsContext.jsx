import { createContext, useReducer } from 'react';

export const BlogsContext = createContext();

export const blogsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return {
        blogs: action.payload,
      };
    case 'CREATE_BLOG':
      return {
        blogs: [action.payload, ...state.blogs],
      };
    case 'DELETE_BLOG':
      let idToDelete = action.payload._id;
      return {
        blogs: state.blogs.filter((blog) => blog._id !== idToDelete),
      };
    default:
      return state;
  }
};

export const BlogsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogsReducer, {
    blogs: null,
  });
  console.log(state);
  return (
    <BlogsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BlogsContext.Provider>
  );
};

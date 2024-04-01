import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BlogsContextProvider } from './context/BlogsContext.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BlogsContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BlogsContextProvider>
  </React.StrictMode>
);

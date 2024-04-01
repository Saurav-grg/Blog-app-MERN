import './index.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateBlog from './components/CreateBlog';
import FullBlog from './pages/FullBlog';
import Signin from './pages/Signin';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import CategoryAll from './pages/CategoryAll';
import { useBlogsContext } from './hooks/useBlogsContext';
import PrivateRoute from './PrivateRoute';
import Errorpage from './pages/Errorpage';

function App() {
  const { dispatch } = useBlogsContext();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoading(false);
    } else {
      const getUser = async () => {
        try {
          const url = 'http://localhost:5000/api/auth/login/success';
          const response = await axios.get(url, { withCredentials: true });
          const { displayName, photos, role } = await response.data.user;
          const userData = {
            displayName,
            photos: photos[0].value,
            role,
          };
          // console.log(userData);
          setUser(userData);
          setIsLoading(false);
          localStorage.setItem('user', JSON.stringify(userData)); // Store for future use
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }
  }, []);
  useEffect(() => {
    const allBlogs = async () => {
      const response = await axios.get('http://localhost:5000/api/blogs');
      const data = await response.data;
      dispatch({ type: 'SET_BLOGS', payload: data });
    };
    allBlogs();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar user={user} />
      <div className="max-w-[1400px] min-h-screen mx-auto my-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<Signin />} />
          {isLoading ? null : (
            <Route path="/private/*" element={<PrivateRoute user={user} />}>
              <Route path="create-blog" element={<CreateBlog />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          )}
          <Route path="/:category/:slug" element={<FullBlog />} />
          <Route path="/:category" element={<CategoryAll />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

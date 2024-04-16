import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateBlog from './components/CreateBlog';
import FullBlog from './pages/FullBlog';
import Signin from './pages/Signin';
import axios from 'axios';
import { useEffect } from 'react';
import Footer from './components/Footer';
import CategoryAll from './pages/CategoryAll';
import { useBlogsContext } from './hooks/useBlogsContext';
import PrivateRoute from './other/PrivateRoute';
import Errorpage from './pages/Errorpage';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { dispatch } = useBlogsContext();
  const { dispatch: authDispatch } = useAuthContext();

  const getUser = async () => {
    try {
      const storedUser = localStorage.getItem('user');

      if (storedUser) {
        authDispatch({ type: 'LOGIN', payload: JSON.parse(storedUser) });
      } else {
        const url = '/api/auth/login/success';
        const response = await axios.get(url, { withCredentials: true });
        const { displayName, photos, role } = await response.data.user;
        const userData = {
          displayName,
          photos: photos[0].value,
          role,
        };
        authDispatch({ type: 'LOGIN', payload: userData });
        localStorage.setItem('user', JSON.stringify(userData)); // Store for future use
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const allBlogs = async () => {
      const response = await axios.get('/api/blogs');
      const data = await response.data;
      dispatch({ type: 'SET_BLOGS', payload: data });
    };
    allBlogs();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />

      <div className="max-w-[1400px] min-h-screen mx-auto my-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/sign-in" element={<Signin />} />

          <Route path="/private/*" element={<PrivateRoute />}>
            <Route path="create-blog" element={<CreateBlog />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

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

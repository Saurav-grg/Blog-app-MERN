import './index.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import axios from 'axios';
import { useEffect } from 'react';
import Footer from './components/Footer';
import { useBlogsContext } from './hooks/useBlogsContext';
import { useAuthContext } from './hooks/useAuthContext';
const Signin = lazy(() => import('./pages/Signin'));
const FullBlog = lazy(() => import('./pages/FullBlog'));
const CategoryAll = lazy(() => import('./pages/CategoryAll'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CreateBlog = lazy(() => import('./components/CreateBlog'));
const Errorpage = lazy(() => import('./pages/Errorpage'));
const PrivateRoute = lazy(() => import('./other/PrivateRoute'));
function App() {
  const { dispatch } = useBlogsContext();
  const { dispatch: authDispatch } = useAuthContext();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('/api/auth/check-auth', {
          withCredentials: true,
        });
        authDispatch({ type: 'LOGIN', payload: response.data.user });
        // console.log(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [authDispatch]);

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
        <Suspense>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/sign-in" element={<Signin />} />
            <Route path="/:category/:slug" element={<FullBlog />} />
            <Route path="/:category" element={<CategoryAll />} />
            <Route path="/private/*" element={<PrivateRoute />}>
              <Route path="create-blog" element={<CreateBlog />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>

            <Route path="*" element={<Errorpage />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

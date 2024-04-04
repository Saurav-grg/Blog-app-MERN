import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

function Navbar() {
  const { user } = useAuthContext();
  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Economics', path: '/economics' },
    { name: 'Fitness & Health', path: '/fitness&health' },
    { name: 'Technology', path: '/technology' },
    { name: 'Self Improvement', path: '/self-improvement' },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const logout = () => {
    localStorage.clear();
    window.open('http://localhost:5000/api/auth/logout', '_self');
  };
  return (
    <>
      <nav className=" max-h-[210px] min-h[50px] bg-light z-10 py-2">
        <div className="px-6 py-3 mx-auto md:flex  md:items-center justify-around">
          <div className="flex items-center ">
            {/* Mobile menu button 3line btn  */}
            <div className="flex md:hidden">
              <button
                type="button"
                className="
                       text-black
                       dark:text-blue-800
                       hover:text-gray-600
                       
                       focus:outline-none focus:text-gray-600
                       dark:focus:text-gray-400
                       "
                aria-label="toggle menu"
                onClick={toggleMenu}
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="mx-auto">
              <a
                className="
                  text-xl
                  font-bold
                  text-primary
                  
                  md:text-2xl
                  hover:font-extrabold
                  dark:hover:text-gray-300
                  "
                href="/"
              >
                ZenQuest
              </a>
            </div>
            <div className="absolute md:right-20 right-5">
              {user ? (
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 bg-gray-200 rounded-md p-1">
                    <img
                      className="w-9 h-9 rounded-full"
                      src={user.photos}
                      alt="profile"
                    />
                    <div>{user.displayName}</div>
                  </div>
                  <Link to={'/private/create-blog'}>Write</Link>
                  <button
                    className="border-2 p-2 rounded-md bg-red-100 text-red-700 font-semibold "
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                ''
                // <Link to="/sign-in">
                //   <button className="border-2 px-2 py-1 rounded-md text-primary font-semibold border-blue-900">
                //     Sign in
                //   </button>
                // </Link>
              )}
            </div>
          </div>

          {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
          <div
            className={`items-center md:flex ${isOpen ? 'block' : 'hidden'}`}
          >
            <div className="flex flex-col md:flex-row md:mx-6">
              {pages.map((page, index) => (
                <NavLink
                  key={index}
                  className={({ isActive }) => {
                    return (
                      'my-1 text-blue-900 font-bold md:mx-4 md:my-0' +
                      (!isActive
                        ? 'bg-white '
                        : 'bg-black underline underline-offset-8')
                    );
                  }}
                  to={page.path}
                >
                  {page.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div></div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;

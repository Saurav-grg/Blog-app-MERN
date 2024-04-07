import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
// import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useAuthContext } from '../hooks/useAuthContext';
import { IoCreateSharp } from 'react-icons/io5';
import { RiDashboardFill } from 'react-icons/ri';
import { MdLogout } from 'react-icons/md';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProfileBox() {
  const { user } = useAuthContext();
  const logout = () => {
    // localStorage.clear();
    window.open('http://localhost:5000/api/auth/logout', '_self');
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className="w-full justify-center gap-x-1.5 text-sm 
        font-semibold text-gray-900 shadow-sm"
        >
          <img
            className="w-10 h-10 outline outline-primary  rounded-full"
            src={user.photos}
            alt="profile"
          />
          {/* <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          /> */}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div className="flex items-center justify-around p-2">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user.photos}
                    alt="profile"
                  />
                  <div>
                    <p className="font-semibold text-blue-800">
                      {user.displayName}
                    </p>
                    <p className="text-gray-600">{user.role}</p>
                  </div>
                </div>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={'private/create-blog'}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 ',
                    ' px-4 py-2 text-sm flex items-center gap-1'
                  )}
                >
                  <span className="text-lg text-primary">
                    <IoCreateSharp />
                  </span>
                  Create Post
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={'private/dashboard'}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    ' px-4 py-2 text-sm flex items-center  gap-1'
                  )}
                >
                  <span className="text-lg text-blue-800">
                    <RiDashboardFill />
                  </span>
                  Dashboard
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={logout}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    ' px-4 py-2 text-sm w-full text-left flex items-center gap-1'
                  )}
                >
                  <span className="text-lg text-red-600">
                    <MdLogout />
                  </span>
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

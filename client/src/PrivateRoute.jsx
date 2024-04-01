import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ user }) => {
  // user && console.log(user);
  if (user && user.role == 'developer') {
    return <Outlet />;
  } else {
    return <Navigate to="/sign-in" />;
  }
};

export default PrivateRoute;

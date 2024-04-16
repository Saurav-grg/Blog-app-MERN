import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const PrivateRoute = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== undefined) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  if (user && user.role === 'developer') {
    return <Outlet />;
  } else {
    return <Navigate to="/admin/sign-in" />;
  }
};

export default PrivateRoute;

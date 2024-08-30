import React from 'react';
import { Outlet , Navigate } from 'react-router-dom';
import {useSelector} from 'react-redux'


const PrivateRoutes = () => {
    const {IsAuthenticated} = useSelector(state => state.auth);
    
    if (IsAuthenticated ) {
      return <Outlet />;  
    } else {
      return <Navigate to="/login" replace />;  // redirects to login
    }

   
  };

export default PrivateRoutes;
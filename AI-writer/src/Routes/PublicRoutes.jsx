import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import {useSelector} from 'react-redux'

function PublicRoutes() {
    const {IsAuthenticated} = useSelector(state => state.auth);
    if (IsAuthenticated) {
        return <Navigate to="/" replace />; 
      } else {
        return <Outlet />; 
      }
}

export default PublicRoutes
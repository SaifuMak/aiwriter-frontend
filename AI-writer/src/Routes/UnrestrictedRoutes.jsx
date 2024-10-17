import React from 'react'

import { Outlet } from 'react-router-dom';

const UnrestrictedRoutes = () => {
  return <Outlet />;  // No redirection, just renders the component
};

export default UnrestrictedRoutes
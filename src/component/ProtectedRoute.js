import React from "react";
import { Outlet } from "react-router-dom";
import Login from '../Pages/Login/Login';

const ProtectedRoute = () => {
  //  this auth shuld be controled through authorized user. it is true for now
  const auth = true;
  return auth ? <Outlet /> : <Login />;
};
export default ProtectedRoute;

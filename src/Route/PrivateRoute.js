import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ChatContext } from "../Context/ChatProvider";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(ChatContext);
  const location = useLocation();
  
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;

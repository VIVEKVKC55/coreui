import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token"); // or from Redux if you store auth there

    return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;

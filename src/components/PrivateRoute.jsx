import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (token) {
        try {
            const decoded = jwtDecode(token);
            if (decoded.sub !== currentUser.email) {
                // Not the same user
                localStorage.removeItem("token");
                localStorage.removeItem("currentUser");
                return <Navigate to="/login" replace />;
            }
            // console.log("Decoded JWT:", decoded);
            return children;
        } catch (err) {
            console.error("Invalid token");
            localStorage.removeItem("token");
            localStorage.removeItem("currentUser");
            return <Navigate to="/login" replace />;
        }
    }
    return <Navigate to="/login" replace />;
};

export default PrivateRoute;

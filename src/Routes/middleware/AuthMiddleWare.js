import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {

    return (
        localStorage.getItem('adminToken') ? <Outlet /> : <Navigate to="/admin-auth" />
    );
};

// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; 

const PrivateRoute = ({ children }) => {
    //const { isAuthenticated } = useAuth();
    const token = localStorage.getItem('token');
     
    if (token == null) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;

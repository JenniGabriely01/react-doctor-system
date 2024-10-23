import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const validateToken = async () => {
            if (token) {
                try {
                    const response = await fetch('http://localhost:3000/validate', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (response.ok) {
                        setIsAuthenticated(true);
                    } else {
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    console.error('Erro ao validar token:', error);
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false);
            }
        };

        validateToken();
    }, [token]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Ou um spinner de carregamento
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

// src/hooks/useAuth.js
import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Verifique a autenticação do usuário (por exemplo, através de um token ou sessão)
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    return { isAuthenticated };
};

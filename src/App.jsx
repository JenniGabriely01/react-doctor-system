// src/App.jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home';
import Login from './pages/Login/login';
import Livraria from './pages/Livraria/livraria';
import Clientes from './pages/Clientes/clientes';
import Prazos from './pages/Prazos/prazos';
import api from '../Api'; 
import { useEffect, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute'; 
import CadClientes from './pages/CadClientes/cadClientes';

function App() {
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/testeApi');
                console.log(res.data);
            } catch (error) {
                console.error('Erro ao chamar a API:', error);
                setError(error.response ? error.response.data : 'Erro desconhecido');
            }
        };

        fetchData();
    }, []);

    return (
        <BrowserRouter>
            {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/Home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/livraria" element={<PrivateRoute><Livraria /></PrivateRoute>} />
                <Route path="/cadClientes" element={<PrivateRoute><CadClientes/></PrivateRoute>} />
                <Route path="/clientes" element={<PrivateRoute><Clientes /></PrivateRoute>} />
                <Route path="/prazos" element={<PrivateRoute><Prazos /></PrivateRoute>} />
                <Route path="/" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

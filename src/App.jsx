// src/App.jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home';
import Login from './pages/Login/login';
import Livraria from './pages/Livraria/livraria';
import Clientes from './pages/Clientes/clientes';
import Prazos from './pages/Prazos/prazos';
import api from '../Api';
import { useEffect } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute'; 

function App() {
    useEffect(() => {
        api.get('/testeApi').then(res => {
            console.log(res.data);
        }).catch(error => {
            console.error('Erro ao chamar a API:', error);
        });
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/livraria" element={<PrivateRoute><Livraria /></PrivateRoute>} />
                <Route path="/clientes" element={<PrivateRoute><Clientes /></PrivateRoute>} />
                <Route path="/prazos" element={<PrivateRoute><Prazos /></PrivateRoute>} />
                <Route path="/" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

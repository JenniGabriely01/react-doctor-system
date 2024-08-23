import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home/home';
import Login from './pages/Login/login';
import './global.css';
import Livraria from "./pages/Livraria/livraria";
import Clientes from "./pages/Clientes/clientes";
import Prazos from "./pages/Prazos/prazos";
import axios from "axios";
import api from '../Api';
import { useEffect } from "react";

function App() {

    useEffect(() => {
        api.get('/testeApi').then(res=>{
            console.log(res.data);
        })
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Livraria" element={<Livraria/>} />
                <Route path="/Clientes" element={<Clientes/>} />
                <Route path="/Prazos" element={<Prazos/>} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;

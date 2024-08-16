import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home/home';
import Login from './pages/Login/login';
import './global.css';
import Livraria from "./pages/Livraria/livraria";
import Clientes from "./pages/Clientes/clientes";
import Prazos from "./pages/Prazos/prazos";

function App() {
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

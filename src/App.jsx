import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home';
import Login from './pages/Login/login';
import Livraria from './pages/Livraria/livraria';
import Clientes from './pages/Clientes/clientes';
import Prazos from './pages/Prazos/prazos';
import PrivateRoute from './components/PrivateRoute/PrivateRoute'; 
import CadClientes from './pages/CadClientes/cadClientes';
import Emprestimo from './pages/Emprestimo/emprestimo';
import CadLivros from './pages/CadLivros/cadLivros';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/Home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/Livraria" element={<PrivateRoute><Livraria /></PrivateRoute>} />
                <Route path="/CadLivros" element={<PrivateRoute><CadLivros /></PrivateRoute>} />
                <Route path="/cadClientes" element={<PrivateRoute><CadClientes/></PrivateRoute>} />
                <Route path="/clientes" element={<PrivateRoute><Clientes /></PrivateRoute>} />
                <Route path="/prazos" element={<PrivateRoute><Prazos /></PrivateRoute>} />
                <Route path="/Emprestimo" element={<PrivateRoute><Emprestimo /></PrivateRoute>} />
                <Route path="/" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

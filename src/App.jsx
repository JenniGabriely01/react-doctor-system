import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/dashboard';
import Login from './pages/Login/login';
import Acervo from './pages/Livraria/livraria';
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
                <Route path="/Dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/Acervo" element={<PrivateRoute><Acervo /></PrivateRoute>} />
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

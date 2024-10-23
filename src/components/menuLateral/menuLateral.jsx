import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './menuLateral.css';
import logoMenuLateral from '../../assets/imagens/logoMenu.svg';
import dashboardIcon from '../../assets/icons/dashboardIcon.svg';
import livrariaIcon from '../../assets/icons/livrariaIcon.svg';
import prazosIcon from '../../assets/icons/prazosIcon.svg';
import userIcon from '../../assets/icons/userIcon.svg';
import emprestimosIcon from '../../assets/icons/emprestimoIcon.svg';
import saidaIcon from '../../assets/icons/saidaIcon.svg';

export default function MenuLateral() {
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();

    const handleLogout = () => {
        // Limpa o token do sessionStorage
        sessionStorage.removeItem('token');
        // Redireciona para a página de login ou página inicial
        navigate('/login'); // Mude '/login' para a rota apropriada
    };

    return (
        <aside>
            <div className="logo">
                <img src={logoMenuLateral} alt="Logo" />
            </div>

            <nav>
                <ul>
                    <li>
                        <Link to="/Home" className={currentPath === "/Home" ? "active" : ""}>
                            {currentPath === "/Home" && <div className="highlight"></div>}
                            <img src={dashboardIcon} alt="Icon Dashboard" />
                            Dashboard
                        </Link>
                    </li>

                    <li>
                        <Link to="/Livraria" className={currentPath === "/Livraria" ? "active" : ""}>
                            {currentPath === "/Livraria" && <div className="highlight"></div>}
                            <img src={livrariaIcon} alt="Icon Livraria" />
                            Livraria
                        </Link>
                    </li>

                    <li>
                        <Link to="/Clientes" className={currentPath === "/Clientes" ? "active" : ""}>
                            {currentPath === "/Clientes" && <div className="highlight"></div>}
                            <img src={userIcon} alt="Icon Clientes" />
                            Clientes
                        </Link>
                    </li>

                    <li>
                        <Link to="/prazos" className={currentPath === "/prazos" ? "active" : ""}>
                            {currentPath === "/prazos" && <div className="highlight"></div>}
                            <img src={prazosIcon} alt="Icon Prazos" />
                            Prazos
                        </Link>
                    </li>

                    <li>
                        <Link to="/Emprestimo" className={currentPath === "/Emprestimo" ? "active" : ""}>
                            {currentPath === "Emprestimos" && <div className="highlight"></div>}
                            <img src={emprestimosIcon} alt="Icon Empréstimos" />
                            Empréstimos
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="saida" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                <img src={saidaIcon} alt="Icon Saida" />
                <span>Log out</span>
            </div>
        </aside>
    );
}

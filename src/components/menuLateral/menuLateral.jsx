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
       
        sessionStorage.removeItem('token');
       
        navigate('/login');
        console.log('Current Path:', location.pathname);

    };

    return (
        <aside>
            <div className="logo">
                <img src={logoMenuLateral} alt="Logo" />
            </div>

            <nav>
                <ul>
                    <li className="liMenu">
                        <Link to="/Dashboard" className={currentPath === "/Dashboard" ? "active" : ""}>
                            {currentPath === "/Dashboard" && <div className="highlight"></div>}
                            <img className="iconLi" src={dashboardIcon} alt="Icon Dashboard" />
                            Dashboard
                        </Link>
                    </li>

                    <li className="liMenu">
                        <Link to="/Acervo" className={currentPath === "/Acervo" ? "active" : ""}>
                            {currentPath === "/Acervo" && <div className="highlight"></div>}
                            <img className="iconLi" src={livrariaIcon} alt="Icon Acervo" />
                            Acervo
                        </Link>
                    </li>

                    <li className="liMenu">
                        <Link to="/Clientes" className={currentPath === "/Clientes" ? "active" : ""}>
                            {currentPath === "/Clientes" && <div className="highlight"></div>}
                            <img className="iconLi" src={userIcon} alt="Icon Clientes" />
                            Clientes
                        </Link>
                    </li>

                    <li className="liMenu">
                        <Link to="/Prazos" className={currentPath === "/Prazos" ? "active" : ""}>
                            {currentPath === "/Prazos" && <div className="highlight"></div>}
                            <img className="iconLi" src={prazosIcon} alt="Icon Prazos" />
                            Prazos
                        </Link>
                    </li>

                    <li className="liMenu">
                        <Link to="/Emprestimo" className={currentPath === "/Emprestimo" ? "active" : ""}>
                            {currentPath === "/Emprestimo" && <div className="highlight"></div>}
                            <img className="iconLi" src={emprestimosIcon} alt="Icon Empréstimos" />
                            Empréstimos
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="saida">
                <li className="liMenu">
                    <button onClick={handleLogout} className="logoutButton">
                        <img src={saidaIcon} alt="Icon Saida" />
                            Log out
                    </button>
                </li>
            </div>
        </aside>
    );
}

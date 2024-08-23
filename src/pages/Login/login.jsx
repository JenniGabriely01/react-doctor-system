import { Link } from 'react-router-dom';
import './login.css'
import logoMain from '../../assets/imagens/logo-main.svg'

export default function Login() {
    return (
        <section className="login">
            <div className="center-login">
                <div className="conteudo-login">
                    <img src={logoMain} alt="" />
                    <input type="text" placeholder="Digite seu e-mail" />
                    <input type="text" placeholder="Digite sua senha" />
                    <Link to="/Home">
                        <button>
                            Entrar
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
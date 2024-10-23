import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import imagemDireita from '../../assets/imagens/imagemFundoLogin.png';
import logoVertical from '../../assets/imagens/logoVertical.svg';
import logoForm from '../../assets/imagens/logoMenu.svg';
import Input from '../../components/input/inpux';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (!email || !password) {
            setError('*Por favor, insira todos os campos.');
            return;
        }

        setLoading(true);
        
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Login bem-sucedido!');
                sessionStorage.setItem('token', data.token);
            
                // Valida o token
                await validateToken();

                setTimeout(() => {
                    setLoading(false);
                    navigate('/Home');
                }, 1000); // 1 segundo
            } else {
                setError(data.error || 'Erro ao realizar login');
                setLoading(false);
            }
        } catch (err) {
            console.error('*Erro ao fazer login:', err);
            setError('*Erro ao fazer login');
            setLoading(false);
        }
    };

    const validateToken = async () => {
        const token = sessionStorage.getItem('token');

        if (!token) {
            console.error('Token não encontrado');
            return;
        }

        const response = await fetch('http://localhost:3000/validate', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Token válido:', data);
        } else {
            console.error('Token inválido ou expirado');
        }
    };

    return (
        <section className="login">
            <div className="conteiner-login">
                <div className="conetudo-login">
                    <img src={logoForm} alt="Logo" />
                    <h1>Bem-vindo de Volta!</h1>
                    <p className="p-title">Por favor, entre em sua conta.</p>
                    <form onSubmit={handleLogin}>
                        <Input 
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-label="Email" // Acessibilidade
                        />
                        <Input
                            placeholder="Senha"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            aria-label="Senha" // Acessibilidade
                        />
                        {error && <p className="error-message">{error}</p>}
                        {success && <p className="success-message">{success}</p>}
                        {loading ? (
                            <div className="loading-container">
                                <l-ring size="100" color="white"></l-ring> 
                            </div>
                        ) : (
                            <button type="submit">Entrar</button>
                        )}
                    </form>
                </div>
            </div>
            <div className="img-login">
                <img className="background-imagem" src={imagemDireita} alt="Imagem lateral" />
                <img className="logo-background" src={logoVertical} alt="Logo" />
            </div>
        </section>
    );
}

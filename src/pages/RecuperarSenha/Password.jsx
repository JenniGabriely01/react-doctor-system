import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './password.css';

export default function Password() {
    const [email, setEmail] = useState('');
    const [codigo, setCodigo] = useState(new Array(6).fill(''));
    const [novaSenha, setNovaSenha] = useState('');
    const [etapa, setEtapa] = useState(1);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showCheck, setShowCheck] = useState(false);
    const navigate = useNavigate();

    const handleEnviarCodigo = async () => {
        setError('');
        setSuccess('');
        try {
            const response = await fetch('http://localhost:3000/api/enviar-codigo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setSuccess('Código enviado com sucesso!');
                setEtapa(2);
            } else {
                const data = await response.json();
                setError(data.message || 'Erro ao enviar código.');
            }
        } catch (error) {
            console.error('Erro ao conectar com o servidor:', error);
            setError('Erro ao conectar com o servidor.');
        }
    };

    const handleAlterarSenha = async () => {
        setError('');
        setSuccess('');

        if (codigo.includes('') || !novaSenha) {
            setError("Por favor, insira o código completo e a nova senha.");
            return;
        }

        try {
            const codigoString = codigo.join('');
            const response = await fetch('http://localhost:3000/api/redefinir-senha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, codigo: codigoString, novaSenha }),
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.error || 'Erro ao alterar a senha.');
                return;
            }

            setSuccess('Senha alterada com sucesso!');
            setShowCheck(true);

            // Redireciona após 3 segundos
            setTimeout(() => {
                setShowCheck(false);
                navigate('/login');
            }, 3000);
        } catch (error) {
            console.error('Erro ao conectar com o servidor:', error);
            setError('Erro ao conectar com o servidor.');
        }
    };

    const handleCodigoChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;  // Permitir apenas números

        const newCodigo = [...codigo];
        newCodigo[index] = value;
        setCodigo(newCodigo);

        // Focar no próximo campo automaticamente se o valor for preenchido
        if (value && index < codigo.length - 1) {
            document.getElementById(`codigo-${index + 1}`).focus();
        }

        // Caso o usuário apague, foca no campo anterior
        if (!value && index > 0) {
            document.getElementById(`codigo-${index - 1}`).focus();
        }
    };

    const handleKeyDown = (e, index) => {
        const key = e.key;

        // Navegação entre os campos com as setas esquerda e direita
        if (key === 'ArrowRight' && index < codigo.length - 1) {
            document.getElementById(`codigo-${index + 1}`).focus();
        } else if (key === 'ArrowLeft' && index > 0) {
            document.getElementById(`codigo-${index - 1}`).focus();
        }
    };

    return (
        <div className="recuperar-senha">
            <div className="recuperar-senha-container">
                <h1>Recuperar Senha</h1>
                {etapa === 1 ? (
                    <>
                        <p>Insira seu email para receber um código.</p>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error && <p className="error-message">{error}</p>}
                        {success && <p className="success-message">{success}</p>}
                        <button onClick={handleEnviarCodigo}>Enviar Código</button>
                    </>
                ) : (
                    <>
                        <p>Digite o código recebido e sua nova senha.</p>
                        <div className="codigo-inputs">
                            {codigo.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`codigo-${index}`}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleCodigoChange(e.target.value, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}  // Adiciona navegação com setas
                                    onFocus={(e) => e.target.select()}
                                    className="codigo-input"
                                />
                            ))}
                        </div>
                        <p className="reenviar-codigo">
                            Não recebeu o código?{' '}
                            <button type="button" onClick={handleEnviarCodigo}>
                                Clique aqui!
                            </button>
                        </p>
                        <input
                            type="password"
                            placeholder="Nova senha"
                            value={novaSenha}
                            onChange={(e) => setNovaSenha(e.target.value)}
                        />
                        {error && <p className="error-message">{error}</p>}
                        {success && <p className="success-message">{success}</p>}
                        <button onClick={handleAlterarSenha}>Alterar Senha</button>
                        
                    </>
                )}
            </div>
        </div>
    );
}

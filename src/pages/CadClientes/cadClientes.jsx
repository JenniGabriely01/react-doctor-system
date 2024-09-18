import React, { useState } from 'react';
import './cadClientes.css';
import { useNavigate } from 'react-router-dom'; // Importa o useNavigate
import imagemDireita from '../../assets/imagens/ImagemFundoCad.png';
import logoVertical from '../../assets/imagens/logoVertical.svg';
import Input from '../../components/input/inpux';
import CadButton from '../../components/cadButtons/cadButtons';

export default function CadClientes() {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    
    const navigate = useNavigate(); // Hook para redirecionar

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/api/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, sobrenome, email, telefone }),
        });

        if (response.ok) {
            alert('Cliente cadastrado com sucesso!');
            navigate('/Clientes'); // Redireciona para a rota /clientes
        } else {
            alert('Erro ao cadastrar cliente');
        }
    };

    return (
        <>
            <section className='main-content'>
                <div className='cliente-conteiner'>
                    <div className='cli-content'>
                        <h1 className='cli-title'>Cadastro</h1>
                        <p className='p-title'>Insira as informações do cliente.</p>
                        
                        <form className='form-cadClientes' onSubmit={handleSubmit}> {/* Adicionando o form */}
                            <Input
                                placeholder="Nome"
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <Input
                                placeholder="Sobrenome"
                                type="text"
                                value={sobrenome}
                                onChange={(e) => setSobrenome(e.target.value)}
                            />
                            <Input
                                placeholder="E-mail"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                placeholder="Telefone"
                                type="text"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                            />

                            <div className='buttons'>
                                <CadButton
                                    legendaBotao="Inserir"
                                    margem="0 0 0 0"
                                    type="submit"
                                />
                                <CadButton
                                    legendaBotao="Voltar"
                                    cor="50%"
                                    margem="0 0 0 5%"
                                    rota="/Clientes"
                                />
                            </div>
                        </form>
                    </div>
                </div>

                <div className="img-cli">
                    <img className="background-imagem" src={imagemDireita} alt="Imagem lateral" />
                    <img className="logo-background" src={logoVertical} alt="Logo" />
                </div>
            </section>
        </>
    );
}

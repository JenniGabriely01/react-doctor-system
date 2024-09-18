import React, { useState } from 'react';
import './cadLivros.css';
import iconeLivro from '../../assets/icons/AddBook.svg';
import imagemDireita from '../../assets/imagens/cadLivros-img.png';
import logoVertical from '../../assets/imagens/logoVertical.svg';
import Input from '../../components/input/inpux';
import CadButton from '../../components/cadButtons/cadButtons';
import { useNavigate } from 'react-router-dom'; // Adicionar importação do useNavigate

export default function CadLivros() {
    const [nome, setNome] = useState('');
    const [autor, setAutor] = useState('');
    const [genero, setGenero] = useState('');
    const [data, setData] = useState('');
    const [quant, setQuant] = useState('');

    const navigate = useNavigate(); // Hook para redirecionar

    // Função para lidar com o submit do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/livros', { // Corrigido para 5000
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, autor, genero, data, quant }),
            });

            if (response.ok) {
                alert('Livro cadastrado com sucesso!');
                navigate('/Livraria'); // Redireciona para a rota /Livraria após o sucesso
            } else {
                alert('Erro ao cadastrar livro');
            }
        } catch (error) {
            alert('Erro de conexão: ' + error.message);
        }
    };

    return (
        <>
            <section className='main-content'>
                <div className='info-conteiner'>
                    <div className='cad-content'>
                        <h1 className='cad-title'>Cadastro</h1>
                        <p className='p-title'>Insira as informações do livro.</p>

                        {/* Formulário de cadastro */}
                        <form className='formLivros' onSubmit={handleSubmit}>
                            <Input
                                placeholder="Nome do Livro"
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <Input
                                placeholder="Autor"
                                type="text"
                                value={autor}
                                onChange={(e) => setAutor(e.target.value)}
                            />
                            <Input
                                placeholder="Gênero"
                                type="text"
                                value={genero}
                                onChange={(e) => setGenero(e.target.value)}
                            />
                            <Input
                                placeholder="Data de Lançamento"
                                type="text"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                            />
                            <Input
                                placeholder="Quantidade de Cópias"
                                type="text"
                                value={quant}
                                onChange={(e) => setQuant(e.target.value)}
                            />
                            
                            <button type="submit" className='addBook-btn'>
                                <img className='icon-book' src={iconeLivro} alt="" />
                                <h1 className='addBook-h1'>
                                    Inserir imagem do livro
                                </h1>
                            </button>
                        </form>

                        {/* Botões de Ação */}
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
                                rota="/Livraria"
                            />
                        </div>
                    </div>
                </div>

                <div className="img-cad">
                    <img className="background-imagem" src={imagemDireita} alt="Imagem lateral" />
                    <img className="logo-background" src={logoVertical} alt="Logo" />
                </div>
            </section>
        </>
    );
}
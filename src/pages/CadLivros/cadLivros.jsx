import React, { useState } from 'react';
import './cadLivros.css';
import iconeLivro from '../../assets/icons/AddBook.svg';
import imagemDireita from '../../assets/imagens/cadLivros-img.png';
import logoVertical from '../../assets/imagens/logoVertical.svg';
import Input from '../../components/input/inpux';
import CadButton from '../../components/cadButtons/cadButtons';
import { useNavigate } from 'react-router-dom';

export default function CadLivros() {
    const [nomeLivro, setNome] = useState('');
    const [autor, setAutor] = useState('');
    const [genero, setGenero] = useState('');
    const [dataLancamento, setDataLancamento] = useState('');
    const [qtdCopias, setQtdCopias] = useState('');
    const [image, setImage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nomeLivro || !autor || !genero || !dataLancamento || !qtdCopias || !image) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/livros', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nomeLivro,
                    autor,
                    genero,
                    dataLancamento,
                    qtdCopias,
                    image
                }),
            });

            // Verifique se a resposta é válida
            if (!response.ok) {
                const errorData = await response.json();
                alert(`Erro ao cadastrar o livro: ${errorData.message || 'Erro desconhecido'}`);
                return;
            }

            alert('Livro cadastrado com sucesso!');
            navigate('/Livraria');
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert(`Erro na requisição: ${error.message}`);
        }
    };

    const convertToBase64 = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.onerror = (error) => {
            console.log("Erro ao ler arquivo:", error);
        };
    };

    return (
        <section className='main-content'>
            <div className='info-conteiner'>
                <div className='cad-content'>
                    <h1 className='cad-title'>Cadastro</h1>
                    <p className='p-title'>Insira as informações do livro.</p>
                    <form className='formLivros' onSubmit={handleSubmit}>
                        <Input
                            placeholder="Nome do Livro"
                            type="text"
                            value={nomeLivro}
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
                            type="date"
                            value={dataLancamento}
                            onChange={(e) => setDataLancamento(e.target.value)}
                        />
                        <Input
                            placeholder="Quantidade de Cópias"
                            type="number"
                            value={qtdCopias}
                            onChange={(e) => setQtdCopias(e.target.value)}
                        />
                        <div className='addBook-btn'>
                            <label className='custom-file-upload'>
                                <img className='icon-book' src={iconeLivro} alt="" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={convertToBase64}
                                />
                                Inserir imagem do livro
                            </label>
                            {image && <img width={100} height={100} src={image} alt="Preview" />}
                        </div>
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
                    </form>
                </div>
            </div>
            <div className="img-cad">
                <img className="background-imagem" src={imagemDireita} alt="Imagem lateral" />
                <img className="logo-background" src={logoVertical} alt="Logo" />
            </div>
        </section>
    );
}

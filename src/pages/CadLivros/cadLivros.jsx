import React, { useState } from 'react';
import './cadLivros.css';
import iconeLivro from '../../assets/icons/AddBook.svg';
import imagemDireita from '../../assets/imagens/cadLivros-img.png';
import logoVertical from '../../assets/imagens/logoVertical.svg';
import Input from '../../components/input/inpux';
import CadButton from '../../components/cadButtons/cadButtons';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CadLivros() {
    const [nomeLivro, setNome] = useState('');
    const [autor, setAutor] = useState('');
    const [genero, setGenero] = useState('');
    const [isbn, setISBN] = useState('');
    const [editora, setEditora] = useState('');
    const [dataLancamento, setDataLancamento] = useState('');
    const [qtdCopias, setQtdCopias] = useState('');
    const [image, setImage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                    isbn,
                    editora,
                    dataLancamento, // A data será enviada no formato correto (yyyy-MM-dd)
                    qtdCopias,
                    image
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Livro cadastrado com sucesso!');
                navigate('/Acervo');
            } else {
                toast.error(`${data.message}`);
            }
        } catch (error) {
            toast.error(`Erro na requisição: ${error.message}`);
        }
    };

    /* convertendo imagem para base6e */
    function convertToBase64(e) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.onerror = error => {
            console.log("error:", error);
        };
    }


    return (
        <>
            <ToastContainer/>
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
                                placeholder="ISBN"
                                type="text"
                                value={isbn}
                                onChange={(e) => setISBN(e.target.value)}
                            />
                            <Input
                                placeholder="Editora"
                                type="text"
                                value={editora}
                                onChange={(e) => setEditora(e.target.value)}
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
                                {image && <img width={100} height={100} src={image} />}
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
        </>
    );
} 
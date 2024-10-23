import React, { useEffect, useState } from 'react';
import './emprestimo.css'
import CadButton from '../../components/cadButtons/cadButtons';
import imagemDireita from '../../assets/imagens/Emprestimo-img.png';
import logoVertical from '../../assets/imagens/logoVertical.svg';
import emprestarOutroLivro from '../../assets/icons/img-emprestar-outro-livro.svg'
import axios from 'axios';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Emprestimo() {
    const [clientes, setClientes] = useState([]);
    const [livros, setLivros] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [selectedLivros, setSelectedLivros] = useState([{ livro: null }]);
    const [dataEmprestimo, setDataEmprestimo] = useState('');

    useEffect(() => {
        // Buscar clientes
        axios.get('http://localhost:3000/api/clientes')
            .then(response => {
                const options = response.data.map(cliente => ({
                    value: cliente._id,
                    label: `${cliente.nome} ${cliente.sobrenome}`
                }));
                setClientes(options);
            })
            .catch(error => {
                console.error('Erro ao buscar clientes:', error);
            });

        // Buscar livros
        axios.get('http://localhost:3000/api/livros')
            .then(response => {
                const options = response.data.map(livro => ({
                    value: livro._id,
                    label: `${livro.nomeLivro} (${livro.qtdCopias} disponível(is))`,
                    isDisabled: livro.qtdCopias < 1 // Desabilita se não houver cópias
                }));
                setLivros(options);
            })
            .catch(error => {
                console.error('Erro ao buscar livros:', error);
            });
    }, []);

    const handleAddLivro = () => {
        setSelectedLivros([...selectedLivros, { livro: null }]);
    };

    const handleRemoveLivro = (index) => {
        const novosLivros = selectedLivros.filter((_, i) => i !== index);
        setSelectedLivros(novosLivros);
    };

    const handleLivroChange = (selectedOption, index) => {
        const novosLivros = [...selectedLivros];
        novosLivros[index].livro = selectedOption ? selectedOption.value : null;

        // Certifique-se de que o livro seja atualizado corretamente
        setSelectedLivros(novosLivros);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validações básicas
        if (!selectedCliente) {
            toast.error('Por favor, selecione um cliente.');
            return;
        }

        const livrosSelecionados = selectedLivros.map(item => item.livro).filter(livro => livro !== null);
        if (livrosSelecionados.length === 0) {
            toast.error('Por favor, selecione pelo menos um livro.');
            return;
        }

        if (!dataEmprestimo) {
            toast.error('Por favor, selecione a data do empréstimo.');
            return;
        }

        // Prepara os dados para envio
        const data = {
            cliente: selectedCliente.value,  // Captura o ID do cliente
            dataEmprestimo,  // Data de empréstimo selecionada
            livros: livrosSelecionados       // IDs dos livros selecionados
        };

        try {
            const response = await fetch('http://localhost:3000/api/emprestimos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Envia os dados dinamicamente
            });

            if (response.status === 201) {
                toast.success('Empréstimo realizado com sucesso!');
                setTimeout(() => {
                    window.location.href = '/prazos';
                }, 2000); // Atraso de 2 segundos (2000 ms)
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Erro ao realizar empréstimo.');
            }
        } catch (error) {
            toast.error('Erro ao realizar empréstimo.');
        }

        console.log('Dados enviados:', data);
    };

    return (
        <>
            <ToastContainer />
            <section className="Emprestimo">
                <div className="container-Emprestimo">
                    <div className="conteudo-Emprestimo">
                        <h1 className='emp-title'>Empréstimo</h1>
                        <p className='p-Title'>Insira as informações do cliente.</p>
                        <form className="form-emprestimo" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Nome do cliente</label>
                                <Select
                                    options={clientes}
                                    value={selectedCliente}
                                    onChange={setSelectedCliente}
                                    placeholder="Selecione um cliente"
                                    isSearchable
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                        }),
                                        menu: (provided) => ({
                                            ...provided,
                                        }),
                                        dropdownIndicator: (provided) => ({
                                            ...provided,
                                            color: '#F8F8D8',  // Define a cor da seta
                                        }),
                                        placeholder: (provided) => ({
                                            ...provided,
                                            color: '#F8F8D8',
                                            marginLeft: '8px',
                                            marginTop: '15px',
                                            fontSize: '1rem',
                                            fontWeight: '700'
                                        }),
                                        singleValue: (provided) => ({
                                            ...provided,
                                            color: '#F8F8D8',
                                            fontWeight: '700',
                                            marginLeft: '8px',
                                            marginTop: '15px',
                                        }),
                                        option: (provided, state) => ({
                                            ...provided,
                                            color: state.isSelected ? '#8C2A2A' : '#8C2A2A', // Cor do texto da opção
                                            backgroundColor: state.isSelected ? '#F8F8D8' : 'transparent', // Cor de fundo ao selecionar
                                            ':hover': {
                                                backgroundColor: '#F8F8D8', // Cor de fundo ao passar o mouse
                                            },
                                        }),
                                    }}
                                />
                            </div>

                            {selectedLivros.map((item, index) => (
                                <div key={index} className="form-group">
                                    <label>Livro {index + 1}</label>
                                    <Select
                                        options={livros}
                                        value={livros.find(livro => livro.value === item.livro) || null}
                                        onChange={(selectedOption) => handleLivroChange(selectedOption, index)}
                                        placeholder="Selecione um livro"
                                        isSearchable
                                        isDisabled={item.livro !== null && livros.find(l => l.value === item.livro)?.isDisabled}
                                        styles={{
                                            control: (provided, state) => ({
                                                ...provided,
                                                backgroundColor: 'transparent',
                                                border: 'none',
                                                borderColor: state.isFocused ? 'none' : 'none',
                                            }),
                                            menu: (provided) => ({
                                                ...provided,
                                            }),
                                            dropdownIndicator: (provided) => ({
                                                ...provided,
                                                color: '#F8F8D8',  // Define a cor da seta
                                            }),
                                            placeholder: (provided) => ({
                                                ...provided,
                                                color: '#F8F8D8',
                                                marginLeft: '8px',
                                                marginTop: '15px',
                                                fontSize: '1rem',
                                                fontWeight: '700'
                                            }),
                                            singleValue: (provided) => ({
                                                ...provided,
                                                color: '#F8F8D8',
                                                fontWeight: '700',
                                                marginLeft: '8px',
                                                marginTop: '15px',
                                            }),
                                            option: (provided, state) => ({
                                                ...provided,
                                                color: state.isSelected ? '#8C2A2A' : '#8C2A2A', // Cor do texto da opção
                                                backgroundColor: state.isSelected ? '#F8F8D8' : 'transparent', // Cor de fundo ao selecionar
                                                ':hover': {
                                                    backgroundColor: '#F8F8D8', // Cor de fundo ao passar o mouse
                                                },
                                            }),
                                        }}
                                    />
                                    {selectedLivros.length > 1 && (
                                        <button type="button" onClick={() => handleRemoveLivro(index)} className="remove-livro-btn">
                                            Remover
                                        </button>
                                    )}
                                </div>
                            ))}

                            <div className="form-group">
                                <label>Data do Empréstimo</label>
                                <input
                                    className="input-data"
                                    type="date"
                                    value={dataEmprestimo}
                                    onChange={(e) => setDataEmprestimo(e.target.value)}
                                />
                            </div>

                            <button type="button" onClick={handleAddLivro} className="add-livro-btn">
                                <img className='img-emprestarOutroLivro' src={emprestarOutroLivro} alt="Adicionar outro livro" />
                                Emprestar outro livro
                            </button>


                            <div className='buttons'>
                                <CadButton
                                    legendaBotao="Inserir"
                                    margem="0 0 0 0"
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

                <div className='img-Emprestimo'>
                    <img className="background-imagem" src={imagemDireita} alt="Imagem lateral" />
                    <img className="logo-background" src={logoVertical} alt="Logo" />
                </div>

            </section>
        </>
    )
}
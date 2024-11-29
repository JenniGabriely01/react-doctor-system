import BarraSearch from "../../components/barraSearch/barraSearch";
import MenuLateral from "../../components/menuLateral/menuLateral";
import TituloGrande from "../../components/tituloGrande/tituloGrande";
import EstatisticBlock from "../../components/EstatisticBlock/estatisticblock";
import Button from "../../components/button/button";
import { useState, useEffect } from 'react';
import './clientes.css';
import axios from "axios";

export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [mostrarTodos, setMostrarTodos] = useState(false);
    const [totalClientes, setTotalClientes] = useState(0);
    const [clientesRecentes, setClientesRecentes] = useState(0); // Contagem de clientes adicionados nos últimos 7 dias
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClientes, setFilteredClientes] = useState([]);
    const [livrosEmprestadosCount, setLivrosEmprestadosCount] = useState(0);
    const [livrosCount, setLivrosCount] = useState(0);
    
    // Buscar todos os clientes
    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/clientes`);
                const data = await response.json();
                setTotalClientes(data.length);
                setClientes(data);

                // Filtrar clientes para exibição
                setFilteredClientes(data.slice(0, mostrarTodos ? data.length : 6));

                // Buscar quantidade de livros emprestados para cada cliente
                const emprestimosPorCliente = {};
                for (const cliente of data) {
                    const responseEmprestimos = await fetch(`http://localhost:3000/api/emprestimos/count?clienteId=${cliente._id}`);
                    const dataEmprestimos = await responseEmprestimos.json();
                    emprestimosPorCliente[cliente._id] = dataEmprestimos.count || 0;
                }

                setClientes((prevClientes) =>
                    prevClientes.map((cliente) => ({
                        ...cliente,
                        livrosEmprestados: emprestimosPorCliente[cliente._id] || 0,
                    }))
                );
            } catch (error) {
                console.log("Erro ao buscar clientes ou empréstimos", error);
            }
        };
        fetchClientes();
    }, [mostrarTodos]);


    useEffect(() => {
        const filtered = clientes.filter(cliente =>
            cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cliente.sobrenome.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredClientes(filtered.slice(0, mostrarTodos ? filtered.length : 6));
    }, [searchTerm, clientes, mostrarTodos]);


    useEffect(() => {
        axios.get('http://localhost:3000/api/estatisticas/livros-emprestados')
            .then(response => {
                setLivrosEmprestadosCount(response.data.totalLivrosEmprestados);
            })
            .catch(error => {
                console.error('Erro ao buscar estatísticas de livros emprestados:', error);
            });
    }, []);

    useEffect(() => {
        // Buscar a contagem de livros cadastrados
        axios.get('http://localhost:3000/api/livros/count')
            .then(response => {
                setLivrosCount(response.data.count);
            })
            .catch(error => {
                console.error('Erro ao buscar contagem de livros:', error);
            });
    }, []);
    
    return (
        <main className="clientes">
            <div>
                <MenuLateral />
            </div>

            <section className="conteudo-clientes">
                <header className="header-clientes">
                    <TituloGrande tituloG="Clientes da Biblioteca" />

                    <BarraSearch
                        placeholder="Pesquisar Clientes..."
                        onSearch={setSearchTerm}
                    />

                    <Button legendaBotao="Cadastrar" rota="/CadClientes" />
                </header>

                <section className="banner-container">
                    <div className="banner">
                        <div className="textoB" id="textoB">
                            <h1>{clientesRecentes} Novos Clientes</h1>
                            <h2>Adicionados essa semana</h2>
                        </div>
                        <div className="book"></div>
                    </div>
                </section>

                <div className="conteudo-cards">

                    <div className="titulos-cliente">
                        <h2>Clientes Recentes</h2>
                        {totalClientes > 6 && (
                            <button onClick={() => setMostrarTodos(!mostrarTodos)}>
                                {mostrarTodos ? "Mostrar menos" : "Ver mais"}
                            </button>
                        )}
                    </div>

                    <div className="cards-clientes">
                        {filteredClientes.length > 0 ? (
                            filteredClientes.map((cliente) => (
                                <div className="card-cliente" key={cliente._id}>
                                    <h3>{cliente.nome} {cliente.sobrenome}</h3>
                                    <div className="bottom-info">
                                        <p> {cliente.livrosEmprestados || 0} Livro(s) emprestados</p>
                                        <p>Cliente cadastro em: <span className="data-cliente-cadastrado">{cliente.createdAt ? new Date(cliente.createdAt).toLocaleDateString() : 'Data não disponível'}</span></p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="div-aviso">
                                <h3 className="main-aviso">Onde estão os leitores?</h3>
                                <p className="aviso">Não há clientes cadastrados no momento.</p>
                            </div>
                        )}
                    </div>

                    <div className="titulos-cliente" id="titulo-cliente">
                        <h2>Estatísticas</h2>
                    </div>

                    <div className="cards-estatistica">
                        <EstatisticBlock
                            title="Clientes cadastrados"
                            amount={totalClientes || 0}
                        />

                        <EstatisticBlock
                            title="Livros emprestados"
                            amount={livrosEmprestadosCount || 0}
                        />

                        <EstatisticBlock
                            title="Livros Cadastrados"
                            amount={livrosCount || 0}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}

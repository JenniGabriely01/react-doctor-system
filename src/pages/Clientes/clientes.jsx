import BarraSearch from "../../components/barraSearch/barraSearch";
import MenuLateral from "../../components/menuLateral/menuLateral";
import TituloGrande from "../../components/tituloGrande/tituloGrande";
import EstatisticBlock from "../../components/EstatisticBlock/estatisticBlock";
import Button from "../../components/button/button";
import { useState, useEffect } from 'react';
import './clientes.css';

export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [mostrarTodos, setMostrarTodos] = useState(false);
    const [totalClientes, setTotalClientes] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClientes, setFilteredClientes] = useState([]);
    const [livrosCount, setLivrosCount] = useState(0);
    const [livrosEmprestadosCount, setLivrosEmprestadosCount] = useState(0);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/clientes`);
                const data = await response.json();
                setTotalClientes(data.length);
                setClientes(data);
                setFilteredClientes(data.slice(0, mostrarTodos ? data.length : 6));
            } catch (error) {
                console.log("Erro ao buscar clientes", error);
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

    const fetchLivrosCount = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/livros/count');
            const data = await response.json();
            setLivrosCount(data.count);
        } catch (error) {
            console.log("erro ao buscar contagem de livros", error);
        }
    };

    const fetchLivrosEmprestadosCount = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/livros/emprestados/count');
            const data = await response.json();
            setLivrosEmprestadosCount(data.count);
        } catch (error) {
            console.log("Erro ao buscar contagem de livros emprestados", error);
        }
    };

    // Chama as funções de contagem apenas na montagem
    useEffect(() => {
        fetchLivrosCount();
        fetchLivrosEmprestadosCount();
    }, []);

    const handleCadastrarCliente = async (clienteData) => {
        try {
            const response = await fetch('http://localhost:3000/api/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clienteData),
            });

            if (response.ok) {
                const novoCliente = await response.json();
                setClientes(prev => [...prev, novoCliente]); // Adiciona o novo cliente à lista
                setTotalClientes(prev => prev + 1); // Atualiza a contagem total
                // Recarregar estatísticas
                fetchLivrosCount();
                fetchLivrosEmprestadosCount();
            } else {
                console.log("Erro ao cadastrar cliente");
            }
        } catch (error) {
            console.log("Erro ao cadastrar cliente:", error);
        }
    };

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

                    <Button
                        legendaBotao="Cadastrar"
                        rota="/CadClientes"
                        onClick={() => handleCadastrarCliente({/* dados do cliente */})} // Passar dados do cliente ao cadastrar
                    />
                </header>

                <section className="banner-container">
                    <div className="banner">
                        <div className="textoB" id="textoB">
                            <h1>{filteredClientes.length} Novos Clientes</h1>
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
                        {filteredClientes.map((cliente) => (
                            <div className="card-cliente" key={cliente._id}>
                                <h3>{cliente.nome} {cliente.sobrenome}</h3>
                                <div className="bottom-info">
                                    <p>2 Livro(s) emprestados</p> {/* texto temporário */}
                                    <p>{cliente.createdAt ? new Date(cliente.createdAt).toLocaleDateString() : 'Data não disponível'}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="titulos-cliente" id="titulo-cliente">
                        <h2>Estatísticas</h2>
                    </div>

                    <div className="cards-estatistica">
                        <EstatisticBlock
                            title="Clientes cadastrados"
                            amount={totalClientes}
                        />

                        <EstatisticBlock
                            title="Livros emprestados"
                            amount={livrosEmprestadosCount}
                        />

                        <EstatisticBlock
                            title="Livros cadastrados"
                            amount={livrosCount}
                        />
                    </div>

                </div>
            </section>
        </main>
    );
}

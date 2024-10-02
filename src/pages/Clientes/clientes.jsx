import BarraSearch from "../../components/barraSearch/barraSearch";
import MenuLateral from "../../components/menuLateral/menuLateral";
import TituloGrande from "../../components/tituloGrande/tituloGrande";
import Button from "../../components/button/button";
import { useState, useEffect } from 'react';
import './clientes.css'

export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [mostrarTodos, setMostrarTodos] = useState(false);
    const [totalClientes, setTotalClientes] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClientes, setFilteredClientes] = useState([]); // Nova lista filtrada

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                // Faz a requisição sem o termo de pesquisa
                const response = await fetch(`http://localhost:3000/api/clientes`);
                const data = await response.json();
                setTotalClientes(data.length);
                setClientes(data); // Armazena todos os clientes
                setFilteredClientes(data.slice(0, mostrarTodos ? data.length : 6)); // Inicializa lista filtrada
            } catch (error) {
                console.log("Erro ao buscar clientes", error);
            }
        };
        fetchClientes();
    }, [mostrarTodos]);

    useEffect(() => {
        // Filtra os clientes localmente sempre que searchTerm mudar
        const filtered = clientes.filter(cliente => 
            cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cliente.sobrenome.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredClientes(filtered.slice(0, mostrarTodos ? filtered.length : 6)); // Atualiza lista filtrada
    }, [searchTerm, clientes, mostrarTodos]);

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
                        onSearch={setSearchTerm} // Passa a função de atualização corretamente
                    />

                    <Button legendaBotao="Cadastrar" rota="/CadClientes" />
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
                                    <p>2 Livro(s) emprestados</p> {/* texto temporario */}
                                    <p>{cliente.createdAt ? new Date(cliente.createdAt).toLocaleDateString() : 'Data não disponível'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

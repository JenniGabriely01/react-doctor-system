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


    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/clientes`);
                const data = await response.json();
                setTotalClientes(data.length);
                setClientes(data.slice(0, mostrarTodos ? totalClientes : 6)); /* limita os clientes exibidos */
            } catch (error) {
                console.log("Erro ao buscar clientes", error);
            }
        };
        fetchClientes();
    }, [mostrarTodos]); // Atualiza a lista quando "mostrarTodos" mudar


    return (
        <>
            <main className="clientes">
                <div>
                    <MenuLateral />
                </div>

                <section className="conteudo-clientes">
                    <header className="header-clientes">
                        <TituloGrande
                            tituloG="Clientes da Biblioteca" />

                        <BarraSearch
                            placeholder="Pesquisar Clientes..." />

                        <Button
                            legendaBotao="Cadastrar"
                            rota="/CadClientes"
                        />
                    </header>

                    <section className="banner-container">
                        <div className="banner">
                            <div className="textoB" id="textoB">
                                <h1>{clientes.length} Novos Clientes</h1>
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
                            {clientes.map((cliente) => (
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
        </>
    )
}
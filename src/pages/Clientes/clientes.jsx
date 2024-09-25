import BarraSearch from "../../components/barraSearch/barraSearch";
import MenuLateral from "../../components/menuLateral/menuLateral";
import TituloGrande from "../../components/tituloGrande/tituloGrande";
import Button from "../../components/button/button";
import { useState, useEffect } from 'react';
import './clientes.css'
import { Link } from "react-router-dom";

export default function Clientes() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const fetchClientes = async () => {
            const response = await fetch('http://localhost:3000/api/clientes');
            const data = await response.json();
            setClientes(data);
        };
        fetchClientes();
    }, []);


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
                            <Link>
                                Ver mais
                            </Link>
                        </div>

                        <div className="cards-clientes">
                            {clientes.map((cliente) => (
                                <div className="card-cliente" key={cliente._id}>
                                    <h3>{cliente.nome} {cliente.sobrenome}</h3>
                                    {/* <p>Email: {cliente.email}</p>
                                    <p>Telefone: {cliente.telefone}</p> */}
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
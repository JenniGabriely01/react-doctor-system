import BarraSearch from "../../components/barraSearch/barraSearch";
import MenuLateral from "../../components/menuLateral/menuLateral";
import TituloGrande from "../../components/tituloGrande/tituloGrande";
import ClienteCadastro from "../../components/clienteCadastro/ClienteCadastro";
import ClienteCadastroE from "../../components/clienteCadastroE/clienteCadastroE";
import Button from "../../components/button/button";
import { useState, useEffect } from 'react';
import './clientes.css'

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

                    <section className="secondContent">
                        <div className="TituloSecondC">
                            <h3>Clientes Recentes</h3>
                        </div>
                    </section>

                    <ul className="clientes-lista">
                        {clientes.map((cliente) => (
                            <li key={cliente._id}>
                                <ClienteCadastro
                                    nome={cliente.nome}
                                    sobrenome={cliente.sobrenome}
                                />
                            </li>
                        ))}
                    </ul>

                    <div className="botaoShowMore">
                        <h1>Ver mais</h1>
                    </div>

                    <section className="ThirdContent">
                        <div className="TituloThirdC">
                            <h3>Estatísticas</h3>
                        </div>
                    </section>

                    <div className="testeTemporario">
                        <ClienteCadastroE
                            legendaEstatistica="Estatística"
                            legendaTemporaria="2.803"
                        />

                        <ClienteCadastroE
                            legendaEstatistica="Livros Emprestados"
                            legendaTemporaria="472"
                        />

                        <ClienteCadastroE
                            legendaEstatistica="Livros Cadastrados"
                            legendaTemporaria="6.059"
                        />
                    </div>

                </section>
            </main>


        </>
    )
}
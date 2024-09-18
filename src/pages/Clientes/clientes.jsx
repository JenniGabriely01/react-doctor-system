import BarraSearch from "../../components/barraSearch/barraSearch";
import MenuLateral from "../../components/menuLateral/menuLateral";
import TituloGrande from "../../components/tituloGrande/tituloGrande";
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

                    {/* estrtutura da página de clientes aqui */}
                    <ul>
                        {clientes.map((cliente) => (
                            <li key={cliente._id}>
                                {cliente.nome} - {cliente.sobrenome} - {cliente.email} - {cliente.telefone}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>


        </>
    )
}
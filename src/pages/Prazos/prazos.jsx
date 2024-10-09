import { useEffect, useState } from "react";
import BarraSearch from "../../components/barraSearch/barraSearch";
import MenuLateral from "../../components/menuLateral/menuLateral";
import TituloGrande from "../../components/tituloGrande/tituloGrande";
import './prazos.css'
import axios from "axios";
import { Link } from "react-router-dom";

export default function Prazos() {
    const [emprestimos, setEmprestimos] = useState([]);

    useEffect(() => {
        // Buscar os empréstimos da API
        axios.get('http://localhost:3000/api/emprestimos')
            .then(response => {
                setEmprestimos(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar empréstimos:', error);
            });
    }, []);

    return (
        <main className="prazos">
            <div>
                <MenuLateral />
            </div>

            <section className="conteudo-prazos">
                <header className="header-prazos">
                    <TituloGrande
                        tituloG="Prazos de Devolução" />

                    <BarraSearch
                        placeholder="Pesquisar Clientes..." />
                </header>

                <div className="clientes-emprestimo">
                    {emprestimos.map(emprestimo => (
                        <li className="card-prazo" key={emprestimo._id}>
                            <h3>{emprestimo.cliente.nome} {emprestimo.cliente.sobrenome}</h3>
                            <p className="detalhes">Ver Detalhes</p>
                            <p> <span className="emprestimo">Empréstimo:</span> {new Date(emprestimo.dataEmprestimo).toLocaleDateString()}</p>
                            <p> <span className="entrega">Entrega:</span> 18/10/24 {/* temporario */}</p>
                            {/* <ul>
                            mostra livros
                                {emprestimo.livros.map(livro => (
                                    <li key={livro._id}>{livro.nomeLivro}</li>
                                ))}
                            </ul> */}
                        </li>
                    ))}
                </div>

            </section>
        </main>
    )
}
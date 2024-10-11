import { useEffect, useState } from "react";
import BarraSearch from "../../components/barraSearch/barraSearch";
import MenuLateral from "../../components/menuLateral/menuLateral";
import TituloGrande from "../../components/tituloGrande/tituloGrande";
import './prazos.css';
import axios from "axios";

export default function Prazos() {
    const [emprestimos, setEmprestimos] = useState([]);
    const [expandedCard, setExpandedCard] = useState(null);

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

    const handleVerDetalhes = (emprestimoId) => {
        // Expande ou retrai o card com base no ID clicado
        setExpandedCard(expandedCard === emprestimoId ? null : emprestimoId);
    };

    const handleDevolucao = (emprestimoId, livros) => {
        // Atualizar o banco de dados removendo o empréstimo e devolvendo cópias
        axios.put(`http://localhost:3000/api/emprestimos/${emprestimoId}/devolucao`, { livros })
            .then(() => {
                // Atualiza o estado local após a devolução
                setEmprestimos(emprestimos.filter(e => e._id !== emprestimoId));
                setExpandedCard(null);
            })
            .catch(error => {
                console.error('Erro ao processar devolução:', error);
            });
    };

    const calcularPrazoEntrega = (dataEmprestimo) => {
        const dataEntrega = new Date(dataEmprestimo);
        dataEntrega.setDate(dataEntrega.getDate() + 15); // Adiciona 15 dias
        return dataEntrega.toLocaleDateString();
    };

    return (
        <main className="prazos">
            <div>
                <MenuLateral />
            </div>

            <section className="conteudo-prazos">
                <header className="header-prazos">
                    <TituloGrande tituloG="Prazos de Devolução" />
                    <BarraSearch placeholder="Pesquisar Clientes..." />
                </header>

                <div className="clientes-emprestimo">
                    {emprestimos.map(emprestimo => (
                        <li className="card-prazo" key={emprestimo._id}>
                            <h3>{emprestimo.cliente.nome} {emprestimo.cliente.sobrenome}</h3>
                            <p className="detalhes" onClick={() => handleVerDetalhes(emprestimo._id)}>
                                {expandedCard === emprestimo._id ? "Ver Menos" : "Ver Detalhes"}
                            </p>
                            <p><span className="emprestimo">Empréstimo:</span> {new Date(emprestimo.dataEmprestimo).toLocaleDateString()}</p>
                            <p><span className="entrega">Entrega:</span> {calcularPrazoEntrega(emprestimo.dataEmprestimo)}</p>

                            {expandedCard === emprestimo._id && (
                                // Exibir detalhes apenas para o card expandido
                                <>
                                    <ul>
                                        {emprestimo.livros.map(livro => (
                                            <li key={livro._id}>{livro.nomeLivro}</li>
                                        ))}
                                    </ul>
                                    <p>Esse cliente devolveu o(s) livro(s)?</p>
                                    <button onClick={() => handleDevolucao(emprestimo._id, emprestimo.livros)}>Sim</button>
                                    <button onClick={() => setExpandedCard(null)}>Não</button>
                                </>
                            )}
                        </li>
                    ))}
                </div>
            </section>
        </main>
    );
}

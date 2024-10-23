import { useEffect, useState } from "react";
import BarraSearch from "../../components/barraSearch/barraSearch";
import MenuLateral from "../../components/menuLateral/menuLateral";
import TituloGrande from "../../components/tituloGrande/tituloGrande";
import './prazos.css';
import axios from "axios";

export default function Prazos() {
    const [emprestimos, setEmprestimos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmprestimos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/emprestimos');
                setEmprestimos(response.data);
            } catch (error) {
                console.error('Erro ao buscar empréstimos:', error);
                setError(error.response ? error.response.data.message : 'Não foi possível carregar os empréstimos.');
            } finally {
                setLoading(false);
            }
        };

        fetchEmprestimos();
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <main className="prazos">
            <MenuLateral />
            <section className="conteudo-prazos">
                <header className="header-prazos">
                    <TituloGrande tituloG="Prazos de Devolução" />
                    <BarraSearch placeholder="Pesquisar Clientes..." />
                </header>

                <div className="clientes-emprestimo">
                    {emprestimos.length === 0 ? (
                        <p>Nenhum empréstimo encontrado.</p>
                    ) : (
                        emprestimos.map(emprestimo => (
                            <li className="card-prazo" key={emprestimo._id}>
                                <h3>{emprestimo.cliente.nome} {emprestimo.cliente.sobrenome}</h3>
                                <p className="detalhes">Ver Detalhes</p>
                                <p>
                                    <span className="emprestimo">Empréstimo:</span> {new Date(emprestimo.dataEmprestimo).toLocaleDateString()}
                                </p>
                                <p>
                                    <span className="entrega">Entrega:</span> 18/10/24 {/* temporário */}
                                </p>
                            </li>
                        ))
                    )}
                </div>
            </section>
        </main>
    );
}

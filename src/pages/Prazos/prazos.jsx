import { useEffect, useState } from "react";
import BarraSearch from "../../components/barraSearch/barraSearch";
import MenuLateral from "../../components/menuLateral/menuLateral";
import TituloGrande from "../../components/tituloGrande/tituloGrande";
import Sim from "../../assets/icons/sim.svg";
import Não from "../../assets/icons/não.svg";
import './prazos.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Prazos() {
    const [emprestimos, setEmprestimos] = useState([]);
    const [expandedCard, setExpandedCard] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEmp, setFilteredEmp] = useState([]); // Nova lista filtrada
    const [mostrarTodos, setMostrarTodos] = useState(false); // Adiciona estado para controle de "Ver Mais" ou "Ver Menos"

    // Buscar os empréstimos da API
    useEffect(() => {
        axios.get('http://localhost:3000/api/emprestimos')
            .then(response => {
                setEmprestimos(response.data);
                setFilteredEmp(response.data.slice(0, mostrarTodos ? response.data.length : 6)); // Inicializa lista filtrada
            })
            .catch(error => {
                console.error('Erro ao buscar empréstimos:', error);
            });
    }, [mostrarTodos]);

    // Filtra os empréstimos localmente sempre que searchTerm ou emprestimos mudar
    useEffect(() => {
        const filtered = emprestimos.filter(emprestimo =>
            emprestimo.cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emprestimo.cliente.sobrenome.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEmp(filtered.slice(0, mostrarTodos ? filtered.length : 6)); // Atualiza lista filtrada
    }, [searchTerm, emprestimos, mostrarTodos]);

    const handleVerDetalhes = (emprestimoId) => {
        setExpandedCard(expandedCard === emprestimoId ? null : emprestimoId);
    };

    const handleDevolucao = (emprestimoId, livros) => {
        axios.put(`http://localhost:3000/api/emprestimos/${emprestimoId}/devolucao`, { livros })
            .then(() => {
                setEmprestimos(emprestimos.filter(e => e._id !== emprestimoId));
                setExpandedCard(null);

                toast.success('Devolução realizada com sucesso!');
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
        <>
            <ToastContainer />
            <main className="prazos">
                <div>
                    <MenuLateral />
                </div>

                <section className="conteudo-prazos">
                    <header className="header-prazos">
                        <TituloGrande tituloG="Prazos de Devolução" />
                        <BarraSearch
                            placeholder="Pesquisar Clientes..."
                            onSearch={setSearchTerm} // Passa a função de atualização corretamente
                        />
                     </header>

                    <div className="clientes-emprestimo">
                        {filteredEmp.map(emprestimo => (
                            <li className="card-prazo" key={emprestimo._id}>
                                <h3>{emprestimo.cliente.nome} {emprestimo.cliente.sobrenome}</h3>
                                <p className="detalhes" onClick={() => handleVerDetalhes(emprestimo._id)}>
                                    {expandedCard === emprestimo._id ? "Mostrar Menos" : "Ver Detalhes"}
                                </p>
                                <p><span className="emprestimo">Empréstimo:</span> {new Date(emprestimo.dataEmprestimo).toLocaleDateString()}</p>
                                <p><span className="entrega">Entrega:</span> {calcularPrazoEntrega(emprestimo.dataEmprestimo)}</p>

                                {expandedCard === emprestimo._id && (
                                    <>
                                        <hr />
                                        <h4>Livros emprestados</h4>
                                        <ul>
                                            {emprestimo.livros.map(livro => (
                                                <li key={livro._id}>{livro.nomeLivro}</li>
                                            ))}
                                        </ul>
                                        <hr />
                                        <div className="devolucao">
                                            <h5>O(s) livro(s) foram devolvido(s)?</h5>

                                            <div className="btn-escolha">
                                                <button
                                                    onClick={() => handleDevolucao(emprestimo._id, emprestimo.livros)}>
                                                    <img src={Sim} alt="SIm" />
                                                </button>
                                                <button
                                                    onClick={() => setExpandedCard(null)}>
                                                    <img src={Não} alt="Não" />
                                                </button>
                                            </div>

                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                        {emprestimos.length > 6 && (
                            <button onClick={() => setMostrarTodos(!mostrarTodos)}>
                                {mostrarTodos ? "Mostrar menos" : "Ver mais"}
                            </button>
                        )}
                    </div>
                </section>
            </main>
        </>

    );
}

import BarraSearch from "../../components/barraSearch/barraSearch";
import MenuLateral from "../../components/menuLateral/menuLateral";
import Button from "../../components/button/button";
import Exit from "../../assets/icons/exit.svg";
import './livraria.css';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Livraria() {
    const [livros, setLivros] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [mostrarTodos, setMostrarTodos] = useState({});
    const [totalLivros, setTotalLivros] = useState(0);
    const [filteredLivros, setFilteredLivros] = useState([]);
    const [livroSelecionado, setLivroSelecionado] = useState(null);
    const [showModal, setShowModal] = useState(false); // Estado para controlar o modal
    const [livroARemover, setLivroARemover] = useState(null); // Estado para armazenar o livro a ser removido
    

    // Fetch de todos os livros ao carregar a página
    useEffect(() => {
        const fetchLivros = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/livros`);
                const data = await response.json();
                setTotalLivros(data.length);
                setLivros(data);
                setFilteredLivros(data); // Inicializa a lista filtrada com todos os livros
            } catch (error) {
                console.log("Erro ao buscar livros", error);
            }
        };
        fetchLivros();
    }, []);

    // Atualiza a lista de livros filtrados conforme o termo de pesquisa
    useEffect(() => {
        const filtered = livros.filter(livro =>
            livro.nomeLivro.toLowerCase().includes(searchTerm.toLowerCase()) ||
            livro.autor.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredLivros(filtered);
    }, [searchTerm, livros]);

    // Função para formatar o gênero
    const formatarGenero = (genero) => {
        return genero.charAt(0).toUpperCase() + genero.slice(1).toLowerCase();
    };

    // Função para alternar a visualização de "Mostrar mais" para cada gênero
    const toggleMostrarTodos = (genero) => {
        setMostrarTodos(prevState => ({
            ...prevState,
            [genero]: !prevState[genero]
        }));
    };

    // Agrupar livros por gênero
    const livrosPorGenero = filteredLivros.reduce((acc, livro) => {
        const generoFormatado = formatarGenero(livro.genero);
        if (!acc[generoFormatado]) {
            acc[generoFormatado] = [];
        }
        acc[generoFormatado].push(livro);
        return acc;
    }, {});

    const removerLivro = async () => {
        try {
            console.log("Removendo livro:", livroARemover);
            const response = await fetch(`http://localhost:3000/api/livros/${livroARemover._id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Remover o livro do estado local após sucesso
                setLivros(livros.filter(livro => livro._id !== livroARemover._id));
                setFilteredLivros(filteredLivros.filter(livro => livro._id !== livroARemover._id));
                setShowModal(false);
                setLivroARemover(null);  // Limpar o estado do livro a ser removido
                setLivroSelecionado(null); // Fechar os detalhes
            } else {
                console.log("Erro ao remover livro:", response.status);
            }
            
        } catch (error) {
            console.error("Erro ao tentar remover livro:", error);
        }
    };


    // Mostra Barra lateral após clicar em um livro
    const handleVerDetalhesLivro = (livro) => {
        setLivroSelecionado(livroSelecionado === livro ? null : livro);
    };

    // Função para formatar a data no formato "dd/mm/aaaa"
    const formatarData = (dataISO) => {
        const data = new Date(dataISO);
        return data.toLocaleDateString('pt-BR'); // Formato dd/mm/aaaa
    };

    const HandleCloseDetalhes = () => {
        setLivroSelecionado(null)
    };

    return (
        <main className="livraria">
            <div>
                <MenuLateral />
            </div>

            <section className="conteudo-livraria">
                <section>
                    <header className={`header-livraria ${livroSelecionado ? 'detalhes-abertos' : ''}`}>
                        <BarraSearch
                            placeholder="Pesquisar por título e autores..."
                            onSearch={setSearchTerm}
                        />
                        <Button
                            legendaBotao="Cadastrar"
                            rota="/CadLivros"
                        />
                    </header>

                    <div className={`livros ${livroSelecionado ? 'detalhes-abertos' : ''}`}>
                        {Object.keys(livrosPorGenero).map((genero) => (
                            <div key={genero} className="categoria">
                                <div className="flex-cat">
                                    <div className="cat-width">
                                        <h2 className="cat-titulo">{genero}</h2>
                                    </div>
                                    <div className="cat-width">
                                        {livrosPorGenero[genero].length > 4 && (
                                            <button className="maisbtn" onClick={() => toggleMostrarTodos(genero)}>
                                                {mostrarTodos[genero] ? "Mostrar menos" : "Ver mais"}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="livros">
                                    {livrosPorGenero[genero]
                                        .slice(0, mostrarTodos[genero] ? livrosPorGenero[genero].length : 4)
                                        .map((livro) => (
                                            <div onClick={() => handleVerDetalhesLivro(livro)} className="livro" key={livro._id}>
                                                <img className="livro-imagem" src={livro.image} alt={livro.nomeLivro} />
                                                <h3 className="livro-titulo">{livro.nomeLivro}</h3>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {livroSelecionado && (
                    <>
                        <div className="detalhes-livro">
                            <div className="conteudo-detalhes">
                                <div className="top-detalhes">
                                    <h3>{livroSelecionado.nomeLivro}</h3>
                                    <img className="exit" onClick={HandleCloseDetalhes} src={Exit} alt="" />
                                </div>
                                <img className="img-livro" src={livroSelecionado.image} alt={livroSelecionado.nomeLivro} />
                                <h2>
                                    <span className="title-detalhe">
                                        Autor:</span> <span className="info-detalhe">{livroSelecionado.autor}
                                    </span>
                                </h2>
                                <h2>
                                    <span className="title-detalhe">
                                        Gênero:</span> <span className="info-detalhe">{livroSelecionado.genero}
                                    </span>
                                </h2>
                                <h2>
                                    <span className="title-detalhe">
                                        ISBN:</span> <span className="info-detalhe">{livroSelecionado.isbn}
                                    </span>
                                </h2>
                                <h2>
                                    <span className="title-detalhe">
                                        Editora:</span> <span className="info-detalhe">{livroSelecionado.editora}
                                    </span>
                                </h2>
                                <h2>
                                    <span className="title-detalhe">
                                        Data de Lançamento:</span> <span className="info-detalhe">{formatarData(livroSelecionado.dataLancamento)}
                                    </span>
                                </h2>
                                <h2>
                                    <span className="title-detalhe">
                                        Estoque:</span> <span className="info-detalhe">{livroSelecionado.qtdCopias}
                                    </span>
                                </h2>

                                <Link className="link" to="/Emprestimo">Emprestar</Link>
                                <button className="link remover" onClick={() => { setLivroARemover(livroSelecionado); setShowModal(true); }}>Remover Livro</button>
                            </div>
                        </div>
                    </>
                )}
            </section>

            {/* Modal de confirmação */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>Tem certeza que deseja remover esse livro?</p>
                        <div className="btn-modal">
                            <button onClick={removerLivro}>Sim</button>
                            <button onClick={() => setShowModal(false)}>Não</button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

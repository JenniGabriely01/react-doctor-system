import BarraSearch from "../../components/barraSearch/barraSearch";
import MenuLateral from "../../components/menuLateral/menuLateral";
import Button from "../../components/button/button";
import './livraria.css';
import { useEffect, useState } from "react";

export default function Livraria() {
    const [livros, setLivros] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [mostrarTodos, setMostrarTodos] = useState({});
    const [totalLivros, setTotalLivros] = useState(0);
    const [filteredLivros, setFilteredLivros] = useState([]);

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

    return (
        <main className="livraria">
            <div>
                <MenuLateral />
            </div>

            <section className="conteudo-livraria">
                <header className="header-livraria">
                    <BarraSearch
                        placeholder="Pesquisar por título e autores..."
                        onSearch={setSearchTerm}
                    />
                    <Button
                        legendaBotao="Cadastrar"
                        rota="/CadLivros"
                    />
                </header>

                <div className="livros">
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
                                {/* Exibe até 4 livros por padrão ou todos se "mostrarTodos" for true */}
                                {livrosPorGenero[genero].slice(0, mostrarTodos[genero] ? livrosPorGenero[genero].length : 4).map((livro) => (
                                    <div className="livro" key={livro._id}>
                                        <img className="livro-imagem" src={livro.image} alt={livro.nomeLivro} />
                                        <h3 className="livro-titulo">{livro.nomeLivro}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
import BarraSearch from "../../components/barraSearch/barraSearch";
import MenuLateral from "../../components/menuLateral/menuLateral";
import Button from "../../components/button/button";
import './livraria.css';
import { useEffect, useState } from "react";

export default function Livraria() {
    const [livros, setLivros] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchLivros = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/livros?search=${searchTerm}`);
                const data = await response.json();
                setLivros(data);
            } catch (error) {
                console.error("Erro ao buscar livros:", error);
            }
        };
        fetchLivros();
    }, [searchTerm]);

    // Função para formatar o gênero
    const formatarGenero = (genero) => {
        return genero.charAt(0).toUpperCase() + genero.slice(1).toLowerCase();
    };

    // Agrupar livros por gênero
    const livrosPorGenero = livros.reduce((acc, livro) => {
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
                            <h2 className="cat-titulo">{genero}</h2>
                            <div className="livros">
                                {livrosPorGenero[genero].map((livro) => (
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

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
                const url = searchTerm
                    ? `http://localhost:3000/api/livros?search=${searchTerm}`
                    : 'http://localhost:3000/api/livros';

                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setLivros(data);
            } catch (error) {
                console.error("Erro ao buscar livros:", error);
            }
        };

        fetchLivros();
    }, [searchTerm]);

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
                    {livros.map((livro) => (
                        <div className="livro" key={livro._id}>
                            <img className="livro-imagem" src={livro.image} alt={livro.nomeLivro} /> 
                            <h3 className="livro-titulo">{livro.nomeLivro}</h3> 
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );  
}
    
import BarraSearch from "../../components/barraSearch/barraSearch";
import MenuLateral from "../../components/menuLateral/menuLateral";
import Button from "../../components/button/button";
import './livraria.css';
import { useEffect, useState } from "react";

export default function Livraria() {
    const [livros, setLivros] = useState([]);

    useEffect(() => {
        const fetchLivros = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/livros');
                const data = await response.json();
                setLivros(data);
            } catch (error) {
                console.error("Erro ao buscar livros:", error);
            }
        };
        fetchLivros();
    }, []);

    return (
        <main className="livraria">
            <div>
                <MenuLateral />
            </div>

            <section className="conteudo-livraria">
                <header className="header-livraria">
                    <BarraSearch
                        placeholder="Pesquisar por título e autores..."
                    />
                    <Button
                        legendaBotao="Cadastrar"
                        rota="/CadLivros"
                    />
                </header>

                <div className="livros">
                    {livros.map((livro) => (
                        <div className="livro" key={livro._id}>
                            <img className="livro-imagem" src={livro.image} /> 
                            <h3 className="livro-titulo">{livro.nomeLivro}</h3> 
                        </div>
                    ))}
                </div>

            </section>
        </main>
    );
}

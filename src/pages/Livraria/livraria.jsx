import BarraSearch from "../../components/barraSearch/barraSearch";
import MenuLateral from "../../components/menuLateral/menuLateral";
import Button from "../../components/button/button";
import './livraria.css';

export default function Livraria() {
    return (
        <>
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
                        />
                    </header>
                </section>
            </main>
        </>
    )
}

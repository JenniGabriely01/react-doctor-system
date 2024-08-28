import BarraSearch from "../../components/barraSearch/barraSearch";
import MenuLateral from "../../components/menuLateral/menuLateral";
import Button from "../../components/button/button";
import './livraria.css';

export default function Livraria() {
    return (
        <>
            <section className="container-livraria">
                <div>
                    <MenuLateral />
                </div>

                <div>
                    <BarraSearch
                        placeholder="Pesquisar por título e autores..."
                    />
                </div>

                <div>
                    <Button
                        legendaBotao="
                        Cadastrar"
                    />
                </div>

            </section>

        </>
    )
}
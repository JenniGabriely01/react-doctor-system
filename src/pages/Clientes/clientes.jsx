import BarraSearch from "../../components/barraSearch/barraSearch";
import MenuLateral from "../../components/menuLateral/menuLateral";
import TituloGrande from "../../components/tituloGrande/tituloGrande";
import Button from "../../components/button/button";
import './clientes.css'

export default function Clientes() {
    return (
        <>
            <main className="clientes">
                <div>
                    <MenuLateral />
                </div>

                <section className="conteudo-clientes">
                    <header className="header-clientes">
                        <TituloGrande
                            tituloG="Clientes da Biblioteca" />

                            <BarraSearch
                                placeholder="Pesquisar Clientes..." />

                            <Button
                                legendaBotao="Cadastrar"
                            />

                    </header>
                </section>
            </main>


        </>
    )
}
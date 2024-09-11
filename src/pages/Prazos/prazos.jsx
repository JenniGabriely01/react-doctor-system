import BarraSearch from "../../components/barraSearch/barraSearch";
import MenuLateral from "../../components/menuLateral/menuLateral";
import TituloGrande from "../../components/tituloGrande/tituloGrande";
import './prazos.css'

export default function Prazos() {
    return (
        <main className="prazos">
            <div>
                <MenuLateral />
            </div>

            <section className="conteudo-prazos">
                <header className="header-prazos">
                    <TituloGrande
                        tituloG="Prazos de Devolução" />

                    <BarraSearch
                        placeholder="Pesquisar Clientes..." />
                </header>

            </section>
        </main>
    )
}
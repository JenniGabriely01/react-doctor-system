import MenuLateral from "../../components/menuLateral/menuLateral";
import TituloGrande from "../../components/tituloGrande/tituloGrande";
import BarraSearch from "../../components/barraSearch/barraSearch";
import './prazos.css'

export default function Prazos() {
    return (
        <>
            <section className="container-prazos">
                <div>
                    <MenuLateral />
                </div>

                <div>
                    <TituloGrande
                        tituloG="Prazos de Devolução"
                    />
                </div>

                <div>
                    <BarraSearch
                        placeholder="Pesquisar prazos..."
                    />
                </div>
            </section>

        </>
    )
}
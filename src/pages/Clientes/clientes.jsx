import BarraSearch from "../../components/barraSearch/barraSearch";
import MenuLateral from "../../components/menuLateral/menuLateral";
import TituloGrande from "../../components/tituloGrande/tituloGrande";
import Button from "../../components/button/button";
import './clientes.css'

export default function Clientes() {
    return (
        <>
            <section className="container-clientes">

                <div>
                    <MenuLateral />

                </div>

                <div>
                    <TituloGrande
                        tituloG="Clientes da Biblioteca"
                    />
                </div>

                <div>
                    <BarraSearch
                        placeholder="Pesquisar Clientes..."
                    />
                </div>

                <div>
                    <Button
                        legendaBotao="Cadastrar"
                    />
                </div>

            </section>


        </>
    )
}
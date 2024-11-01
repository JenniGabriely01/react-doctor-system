import { useEffect, useState } from "react";
import MenuLateral from "../../components/menuLateral/menuLateral";
import './dashboard.css';
import axios from "axios";
import imgteste from '../../assets/imagens/banner.jpg';

export default function Home() {
    const [generos, setGeneros] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [autores, setAutores] = useState([]);

    const fetchData = async (url, setState) => {
        try {
            const response = await axios.get(url);
            setState(response.data);
        } catch (error) {
            console.error(`Erro ao buscar dados de ${url}`);
        }
    };

    useEffect(() => {
        fetchData('http://localhost:3000/api/autores-principais', setAutores);
        fetchData('http://localhost:3000/api/generos-principais', setGeneros);
        fetchData('http://localhost:3000/api/clientes-principais', setClientes);
    }, []);

    return (
        <main className="dashboard-main">
            <MenuLateral />

            <section className="conteudo-esquerda">
                <img src={imgteste} alt="" />
            </section>

            <section className="conteudo-direita">
                <div className="principais">
                    <h2>Autores principais</h2>
                    {autores.map((autor) => (
                        <div key={autor.posicao}>
                            <h3>{autor.posicao}. {autor.autor}</h3>
                            <p>{autor.totalEmprestimos} empréstimos</p>
                        </div>
                    ))}
                </div>

                <div className="principais">
                    <h2>Gêneros principais</h2>
                    {generos.map((genero) => (
                        <div key={genero.posicao}>
                            <h3>{genero.posicao}. {genero.genero}</h3>
                            <p>{genero.totalEmprestimos} empréstimos</p>
                        </div>
                    ))}
                </div>
                <div className="principais">
                    <h2>Clientes principais</h2>
                    {clientes.map((cliente) => (
                        <div key={cliente.posicao}>
                            <h3>{cliente.posicao}. {cliente.cliente}</h3>
                            <p>{cliente.totalClientes} empréstimos</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

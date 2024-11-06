import { useEffect, useState } from "react";
import MenuLateral from "../../components/menuLateral/menuLateral";
import './dashboard.css';
import axios from "axios";
import carrosel1 from '../../assets/imagens/carrosel1.png';
import carrosel2 from '../../assets/imagens/carrosel2.png';
import carrosel3 from '../../assets/imagens/carrosel3.png';
import { Link } from "react-router-dom";

export default function Home() {
    const [generos, setGeneros] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [autores, setAutores] = useState([]);
    const [emprestimosRecentes, setEmprestimosRecentes] = useState(0);
    const [atrasosSemana, setAtrasosSemana] = useState(0);

    const fetchData = async (url, setState) => {
        try {
            const response = await axios.get(url);
            setState(response.data);
        } catch (error) {
            console.error(`Erro ao buscar dados de ${url}`);
        }
    };

    // Função para emprestimos recentes
    const fecthEmprestimosRecentes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/emprestimos/last-week-count');
            setEmprestimosRecentes(response.data.count);
        } catch {
            console.error("Erro ao buscar contagem de empréstimos recentes:", error);
        }
    };

    // Função que conta todos os atrasos
    const fetchAtrasosTotal = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/emprestimos/atrasos-total');
            setAtrasosSemana(response.data.count);
        } catch (error) {
            console.error("Erro ao buscar total de atrasos", error);
        }
    };

    useEffect(() => {
        fetchData('http://localhost:3000/api/autores-principais', setAutores);
        fetchData('http://localhost:3000/api/generos-principais', setGeneros);
        fetchData('http://localhost:3000/api/clientes-principais', setClientes);
        fecthEmprestimosRecentes();
        fetchAtrasosTotal();
    }, []);

    return (
        <main className="dashboard-main">
            <MenuLateral />

            <section className="conteudo-esquerda">
                <div className="carrosel">
                    <img src={carrosel1} alt="" />
                    <div className="txt-carrosel">
                        <h2>Clientes cadastrados</h2>
                        <p>Dessa semana</p>
                        <Link to="/Clientes">Ver mais</Link>
                    </div>
                </div>
                <div className="carrosel">
                    <img src={carrosel2} alt="" />
                    <div className="txt-carrosel emprestimoRecente">
                        <h2>{emprestimosRecentes} Livro(s)</h2>
                        <p>Emprestados essa semana</p>
                    </div>
                </div>
                <div className="carrosel">
                    <img src={carrosel3} alt="" />
                    <div className="txt-carrosel">
                        <h2>{atrasosSemana} Livro(s)</h2>
                        <p>Atrasado(s)</p>
                        <Link to="/prazos">Ver mais</Link>
                    </div>
                </div>
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

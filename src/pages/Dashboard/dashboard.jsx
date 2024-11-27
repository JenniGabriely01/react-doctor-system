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
    const [currentSlide, setCurrentSlide] = useState(0);
    const [livrosMaisEmprestados, setLivrosMaisEmprestados] = useState([]);
    const [livrosUltimos7Dias, setLivrosUltimos7Dias] = useState([]);
    const [livrosMenosEmprestados, setLivrosMenosEmprestados] = useState([]);

    const slides = [
        {
            img: carrosel1,
            title: "Clientes cadastrados",
            description: "Dessa semana",
            link: "/Clientes",
        },
        {
            img: carrosel2,
            title: `${emprestimosRecentes} Livro(s)`,
            description: "Emprestado(s) essa semana",
            link: null,
        },
        {
            img: carrosel3,
            title: `${atrasosSemana} Livro(s)`,
            description: "Atrasado(s)",
            link: "/Prazos",
        }
    ];

    const fetchData = async (url, setState) => {
        try {
            const response = await axios.get(url);
            setState(response.data);
        } catch (error) {
            console.error(`Erro ao buscar dados de ${url}:`, error.response ? error.response.data : error.message);
        }
    };


    const fecthEmprestimosRecentes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/emprestimos/last-week-count');
            setEmprestimosRecentes(response.data.count);
        } catch (error) {
            console.error("Erro ao buscar contagem de empréstimos recentes:", error);
        }
    };

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
        fetchData('http://localhost:3000/api/livros-mais-emprestados', setLivrosMaisEmprestados);
        fetchData('http://localhost:3000/api/livros-emprestados-semana', setLivrosUltimos7Dias);
        fetchData('http://localhost:3000/api/livros-menos-emprestados', setLivrosMenosEmprestados);
        fecthEmprestimosRecentes();
        fetchAtrasosTotal();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 3500); // 3000ms = 3 segundos

        return () => clearInterval(interval);
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };




    return (
        <main className="dashboard-main">
            <MenuLateral />

            <section className="conteudo-esquerda">
                <div className="carrosel-container">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`carrosel ${index === currentSlide ? 'active' : ''}`}
                        >
                            <img src={slide.img} alt="" />
                            <div className="txt-carrosel">
                                <h2>{slide.title}</h2>
                                <p>{slide.description}</p>
                                {slide.link && <Link to={slide.link}>Ver mais</Link>}
                            </div>
                        </div>
                    ))}

                    <div className="dots-container">
                        {slides.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                            ></span>
                        ))}
                    </div>
                </div>

                <div className="listas-livros">
                    <div className="lista">
                        <h2>Livros Mais Emprestados</h2>
                        <div className="livros-container">
                            {livrosMaisEmprestados.map((item) => (
                                <div key={item.livro._id} className="livro-card">
                                    <img src={item.livro.image} alt={item.livro.nomeLivro} />
                                    <p>{item.livro.nomeLivro}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lista">
                        <h2>Livros Emprestados nos Últimos 7 Dias</h2>
                        <div className="livros-container">
                            {livrosUltimos7Dias.length > 0 ? (
                                livrosUltimos7Dias.map((item) => (
                                    <div key={item.livro._id} className="livro-card">
                                        <img src={item.livro.image} alt={item.livro.nomeLivro} />
                                        <p>{item.livro.nomeLivro}</p>
                                    </div>
                                ))
                            ) : (
                                <p>Sem livros emprestados nos últimos 7 dias</p>
                            )}
                        </div>
                    </div>


                    <div className="lista">
                        <h2>Livros Menos Emprestados</h2>
                        <div className="livros-container">
                            {livrosMenosEmprestados.map((item) => (
                                <div key={item.livro._id} className="livro-card">
                                    <img src={item.livro.image} alt={item.livro.nomeLivro} />
                                    <p>{item.livro.nomeLivro}</p>
                                </div>
                            ))}
                        </div>
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
        </main >
    );
}

import './clienteCadastro.css'

export default function ClienteCadastro({ nome, sobrenome }) {
    return (
        < >
            <div className='card-clientes'>
                <div className='line'></div>
                <div className='infoOne'>
                    <div className='NomeEsobre'>
                        <h3>{nome} {sobrenome} </h3>
                    </div>
                    <div className='livrosPegosT'>
                        <div className='quantidade'>
                            <h4>2 Livro(s) emprestados</h4>
                        </div>
                        <div className='date'>
                            <h4>02/01/2024</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
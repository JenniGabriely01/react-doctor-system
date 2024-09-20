import './clienteCadastroE.css'

export default function ClienteCadastroE({legendaEstatistica, legendaTemporaria}) {
    return (
        <>
            <div className='CardEstatistica'>
                <div className='lineEstatistica'></div>
                <div className='tituloestatistica'>
                    <div className='tituloEs'>
                        <h1>{legendaEstatistica}</h1>
                    </div>
                    <div className='infoEstatistica'>
                        <div className='inforE'>
                            <h4>{legendaTemporaria}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
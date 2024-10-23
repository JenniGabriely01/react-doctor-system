import './estatisticBlock.css'

export default function EstatisticBlock({ title, amount }) {
    return (
        <>
            <div className='pinkBlock'>
                <div className='BlockT'>
                    <h3>{title}</h3>
                    <div className='amountContent'>
                        <p>{amount}</p>
                    </div>
                </div>
            </div>

        </>
    )
}
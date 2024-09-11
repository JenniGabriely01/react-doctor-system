import { useNavigate } from 'react-router-dom'
import './button.css'

export default function Button({ legendaBotao, rota }) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(rota);
    }

    return (
        <button className="botao" onClick={handleClick}>
            <h1>{legendaBotao}</h1>
        </button>
    )
}

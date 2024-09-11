import { useNavigate } from 'react-router-dom'
import './cadButtons.css'

export default function CadButton({ legendaBotao, rota, cor, margem }) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(rota);
    }

    return (
        <button style={{ opacity: cor, margin: margem }} className="button" onClick={handleClick}>
            <h1>{legendaBotao}</h1>
        </button>
    )
}
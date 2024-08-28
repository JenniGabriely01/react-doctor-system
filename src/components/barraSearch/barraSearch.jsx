import search from '../../assets/icons/search.svg';
import './barraSearch.css';

export default function BarraSearch({placeholder}) {
    return (
        <div className="search">
            <input type="text" placeholder={placeholder}/>
            <img src={search} alt="" />
        </div>
    )
}
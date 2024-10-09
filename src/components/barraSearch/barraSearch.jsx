import search from '../../assets/icons/search.svg';
import './barraSearch.css';
import { useState } from 'react';

export default function BarraSearch({ placeholder, onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value; // Aqui está o acesso correto ao valor do input
        setSearchTerm(value);         // Atualiza o estado local
        onSearch(value);              // Chama a função de pesquisa passada via props
    };

    return (
        <div className="search">
            <input 
                type="text" 
                placeholder={placeholder} 
                value={searchTerm} 
                onChange={handleInputChange}  // Corrigido o nome da função
            />
            <img src={search} alt="search-icon" />
        </div>
    );
}
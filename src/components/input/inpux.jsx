import './input.css';

export default function Input({ placeholder, type, value, onChange }) {
    return (
        <div className="input-style">
            <p>{placeholder}</p>
            <input
                type={type}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

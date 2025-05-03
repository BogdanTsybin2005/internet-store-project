import React from 'react';
import './FormInput.css';



export default function FormInput({ label, type, name, value, onChange, error }) {
    return (
        <div className="form-group">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                type={type}
                name={name}
                id={name}
                placeholder={label}
                value={value}
                onChange={onChange}
            />
            {error && <span className="error">{error}</span>}
        </div>
    );
}

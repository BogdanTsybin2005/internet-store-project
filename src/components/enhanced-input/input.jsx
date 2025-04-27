import React from 'react';
import './input.css';



export default function EnhancedInput({ label, type, name, value, onChange, error, icon, autoFocus = false }) {
    return (
        <div className={`enhanced-form-group ${error ? 'has-error' : ''}`}>
            {label && <label htmlFor={name}>{label}</label>}
            <div className="input-wrapper">
                {icon && <span className="input-icon">{icon}</span>}
                <input
                    type={type}
                    name={name}
                    id={name}
                    value={value}
                    placeholder={label}
                    onChange={onChange}
                    autoFocus={autoFocus}
                />
            </div>
            {error && <span className="error-text">{error}</span>}
        </div>
    );
}

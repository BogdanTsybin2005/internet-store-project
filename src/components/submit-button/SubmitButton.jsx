import React from 'react';
import './SubmitButton.css';



export default function SubmitButton({ text }) {
  return (
    <button type="submit" className="submit-button">
      {text}
    </button>
  );
}

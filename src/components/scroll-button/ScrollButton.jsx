import React from 'react';
import './scroll-button.css';



export default function ScrollButton({ scrollInToView = 'top', isDark = false }) {
    const handleScroll = () => {
        window.scrollTo({
            top: scrollInToView === 'top' ? 0 : document.body.scrollHeight,
            behavior: 'smooth',
        });
    };

    return (
        <button 
            className={`scroll-button ${isDark ? 'dark' : 'light'}`} 
            onClick={handleScroll}
        >
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {scrollInToView === 'top' ? (
                    <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                ) : (
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                )}
            </svg>
        </button>
    );
}

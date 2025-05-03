import React from 'react';
import './scroll-button.css';
import useScrollY from '../../hooks/useScrollY';
import useWindowHeight from '../../hooks/useWindowHeight';



export default function ScrollButton({ scrollInToView = 'top', isDark = false }) {
    const scrollY = useScrollY();
    const windowHeight = useWindowHeight();
    const docHeight = document.documentElement.scrollHeight;

    const isAtTop = scrollY <= 0;
    const isAtBottom = scrollY + windowHeight >= docHeight;

    const handleScroll = () => {
        window.scrollTo({
            top: scrollInToView === 'top' ? 0 : docHeight,
            behavior: 'smooth',
        });
    };

    const isDisabled = scrollInToView === 'top' ? isAtTop : isAtBottom;

    return (
        <button 
            className={`scroll-button ${isDark ? 'dark' : 'light'} ${isDisabled ? 'disabled-button' : ''}`} 
            onClick={handleScroll}
            disabled={isDisabled}
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

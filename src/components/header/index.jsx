import './style.css';
import headerLogo from '../../components/img/pictures/header-logo.png';
import { useState } from 'react';
import ShoppingBasketButton from '../button/shoppingBasketButton';
import { Link } from 'react-router-dom';


export default function Header({ children }) {
    const [isBurgerButtonClicked, setIsBurgerButtonClicked] = useState(false);

    return (
        <header>
            <div className="header-container">
                <div className="header-logo">
                    <img src={headerLogo} alt="header logo here" />
                </div>

                {children}

                <div className='menu-section'>
                    <button
                        className={`header-burger ${isBurgerButtonClicked ? '__active' : ''}`}
                        onClick={() => { setIsBurgerButtonClicked(!isBurgerButtonClicked) }}>
                        <span></span>
                    </button>
                </div>
            </div>
        </header>
    );
}

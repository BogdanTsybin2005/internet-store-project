import './style.css';
import headerLogo from '../../components/img/pictures/header-logo.png';
import { useState, useEffect } from 'react';
import BurgerMenu from '../burger-menu/burgerMenu';



export default function Header({ children, isFilterWorked, resetData, filterDataByCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const [renderMenu, setRenderMenu] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRenderMenu(true);
    } else {
      const timeout = setTimeout(() => setRenderMenu(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    <header>
      <div className="header-container">
        <div className="header-logo">
          <img src={headerLogo} alt="header logo here" />
        </div>

        <div className="header-buttons-desktop">
          {children}
        </div>

        <div className="menu-section">
          <button
            className={`header-burger ${isOpen ? '__active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span></span>
          </button>
        </div>
      </div>

      {renderMenu && (
        <div className={`burger-menu-wrapper ${isOpen ? 'open' : 'closing'}`}>
          <BurgerMenu
            onClose={() => setIsOpen(false)}
            isFilterWorked={isFilterWorked}
            resetData={resetData}
            filterDataByCategory={filterDataByCategory}
          />
        </div>
      )}
    </header>
  );
}

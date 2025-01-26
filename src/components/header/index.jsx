import './style.css';
import headerLogo from '../../components/img/pictures/header-logo.png'


export default function Header({children}) {
    return <header>
        <div className="header-container">
            <div className="header-logo">
                <img 
                    src={headerLogo} 
                    alt="header logo should be just right here!." 
                />
            </div>
            {children}
            <button className="header-burger"><span></span></button>
        </div>
    </header>
}

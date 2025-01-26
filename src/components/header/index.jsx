import './style.css';


export default function Header({children}) {
    return <header>
        <div className="header-container">
            {children}
        </div>
    </header>
}

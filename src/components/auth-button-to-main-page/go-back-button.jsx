import { NavLink } from "react-router-dom";
import './go-back-button.css';



export default function GoBackToMainPageButton({ isButtonDark=false, isButtonFixed=false }) {
    return (
        <NavLink to='/' className={`go-back-link ${isButtonDark ? 'dark' : 'light'} ${isButtonFixed ? 'fixed' : 'absolute'}`}>
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
        </NavLink>
    );
}

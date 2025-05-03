import './linkToCardButton.css';
import {NavLink} from 'react-router-dom';



export default function LinkToCardButton({ id }) {
    return (
        <div className="link-to-card-button">
            <NavLink to={`/product/${id}`} className="link-to-card-button-text">View</NavLink>
        </div>
    );
}
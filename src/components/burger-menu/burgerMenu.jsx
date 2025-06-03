import './burgerMenu.css';
import { useAuthStore } from '../../store/authStore';
import { Link, useNavigate } from 'react-router-dom';
import { ButtonForFilter } from '../button/container';
import ShoppingBasketButton from '../button/shoppingBasketButton';



export default function BurgerMenu({ onClose, isFilterWorked, resetData, filterDataByCategory }) {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    return (
        <div className="burger-menu">
            {isFilterWorked && (
                <ButtonForFilter buttonText="Reset filter" onFilterAfterClick={resetData} />
            )}

            {["men's clothing", "women's clothing", "electronics", "jewelery"].map((categoryName) => (
                <ButtonForFilter
                    key={categoryName}
                    buttonText={categoryName}
                    onFilterAfterClick={() => {
                        filterDataByCategory(categoryName);
                        onClose();
                    }}
                />
            ))}

            <div className="burger-auth-buttons">
                {user ? (
                    <>
                        <Link to="/profile" className="auth-button" onClick={onClose}>Profile</Link>
                        <button
                        className="auth-button"
                        onClick={() => {
                            logout();
                            onClose();
                            navigate('/login');
                        }}
                        >
                        Logout
                        </button>
                    </>
                    ) : (
                    <>
                        <Link to="/login" className="auth-button" onClick={onClose}>Login</Link>
                        <Link to="/registration" className="auth-button" onClick={onClose}>Register</Link>
                    </>
                )}
            </div>

            <ShoppingBasketButton functionAfterClick={() => {
                onClose();
                navigate('/cart');
            }} />
        </div>
    );
}
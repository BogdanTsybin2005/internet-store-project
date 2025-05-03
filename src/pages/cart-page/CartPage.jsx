import './CartPage.css';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import GoBackToMainPageButton from '../../components/auth-button-to-main-page/go-back-button';
import ScrollButton from '../../components/scroll-button/ScrollButton';



function CartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <>
      <div className="cart-page">
        <GoBackToMainPageButton isButtonDark isButtonFixed />
        <h1 className="cart-title">Your Shopping Cart</h1>
        {cart.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-container">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-img">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="cart-item-info">
                    <h2>{item.title}</h2>
                    <p>${item.price}</p>
                    <div className="quantity-controls">
                      <button onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>
                  </div>
                  <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <p>Total: <strong>${totalPrice}</strong></p>
              <button className="clear-cart-button" onClick={clearCart}>Clear Cart</button>
              <Link to="/" className="go-home-button">🏠 Go to Home</Link>
            </div>
          </>
        )}
        {cart.length > 0 ? (
          <div className="scroll-buttons-fixed">
            <ScrollButton scrollInToView="top" disableAfter={0}/> 
            <ScrollButton scrollInToView="bottom" disableAfter="windowHeight"/>
          </div>
        ) : null}
      </div>
    </>
  );
}


export default CartPage;

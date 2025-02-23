import { useCart } from "../../context/CartContext";
import React from "react";
import "./cart.css";



export default function CartContainer() {
    const { cart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart } = useCart();
    return (
        <aside className="cart-container">
            <h2>Shopping Cart</h2>
            <>
                {cart.map(item => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.title} width="50" />
                        <div>
                            <p>{item.title}</p>
                            <p>${item.price} x {item.quantity}</p>
                        </div>
                        <div className="cart-actions">
                            <button onClick={() => increaseQuantity(item.id)}>+</button>
                            <button onClick={() => decreaseQuantity(item.id)}>-</button>
                            <button onClick={() => removeFromCart(item.id)}>Remove</button>
                        </div>
                    </div>
                ))}
                <h3>Total: ${(cart.reduce((acc, item) => acc + item.price * item.quantity, 0)).toFixed(2)}</h3>
                <button onClick={clearCart} className="clear-cart">Clear Cart</button>
            </>
        </aside>
    );
}

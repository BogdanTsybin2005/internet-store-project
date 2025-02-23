import { useCart } from "../../context/CartContext";
import React from "react";
import './card.css';



export default function CardList({ data }) {
    const { cart, addToCart, decreaseQuantity } = useCart();

    return (
        <>
            {data.map((item) => {
                const inCart = cart.find(cartItem => cartItem.id === item.id);

                return (
                    <div className="card" key={item.id}>
                        <div className="card-image">
                            <img src={item.image} alt="Product" />
                        </div>
                        <div className="card-text-content">
                            <div>
                                <p className="card-category">{item.category}</p>
                                <p className="card-title">{item.title}</p>
                            </div>
                            <div>
                                <p className="card-price">${item.price}</p>
                                {inCart ? (
                                    <div className="quantity-controls">
                                        <button onClick={() => decreaseQuantity(item.id)}>-</button>
                                        <span>{inCart.quantity}</span>
                                        <button onClick={() => addToCart(item)}>+</button>
                                    </div>
                                ) : (
                                    <button className="base-button" onClick={() => addToCart(item)}>Add to cart</button>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

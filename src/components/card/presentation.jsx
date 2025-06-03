import { useCart } from "../../context/CartContext";
import LinkToCardButton from "../button/linkToCardButton";
import './card.css';
import { useAuthStore } from "../../store/authStore";
import React from "react";


const Card = React.memo(({ item, inCart, addToCart, decreaseQuantity, isAuthenticated }) => {
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
                    {isAuthenticated && <LinkToCardButton id={item.id} />}
                </div>
            </div>
        </div>
    );
});

export default function CardList({ data }) {
    const { cart, addToCart, decreaseQuantity } = useCart();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return data.map((item) => {
        const inCart = cart.find(cartItem => cartItem.id === item.id);
        return (
            <Card
                key={item.id}
                item={item}
                inCart={inCart}
                addToCart={addToCart}
                decreaseQuantity={decreaseQuantity}
                isAuthenticated={isAuthenticated}
            />
        );
    });
}

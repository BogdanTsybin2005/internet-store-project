import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";



export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart, removeCartFromStorage] = useLocalStorage('cart', []);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const decreaseQuantity = (id) => {
        setCart(prevCart =>
            prevCart.map(item => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
                .filter(item => item.quantity > 0)
        );
    };

    const increaseQuantity = (id) => {
        setCart(prevCart =>
            prevCart.map(item => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
        );
    };

    const clearCart = () => {
        setCart([]);
        removeCartFromStorage();
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

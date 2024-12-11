import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    console.log(cart)

    // Function to add a new item to the cart
    const addToCart = async (newItem) => {
        console.log(newItem)
        // Check if the item already exists in the cart
        const existingItem = cart.find(item => item.id === newItem.product_id);

        if (existingItem) {
            // If item exists, just update the quantity
            setCart((prevCart) =>
                prevCart.map(item =>
                    item.id === newItem.product_id
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                )
            );
        } else {
            // If it's a new item, fetch the product data and add it to the cart
            const response = await fetch(`http://localhost:3000/api/product/${newItem.product_id}`);

            if (response.ok) {
                const product = await response.json();

                // If the response is an array, get the first item, otherwise use the product directly
                const productData = Array.isArray(product) ? product[0] : product;

                // Add the product data along with quantity to the cart
                setCart(prevCart => [
                    ...prevCart,
                    {
                        ...productData,
                        quantity: newItem.quantity,
                    }
                ]);
            } else {
                console.error('Error fetching product data');
            }
        }
    };

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

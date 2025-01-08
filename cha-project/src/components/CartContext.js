import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [updatedCart, setUpdatedCart] = useState([]);
    const [quantities, setQuantities] = useState([]);

    // Function to fetch and update cart details
    const updateCartDetails = async (newItem) => {
        console.log("Updating cart");

        try {
            // Get cart from localStorage
            const localStorageCart = JSON.parse(localStorage.getItem('cart') || "[]");

            // Extract product IDs and quantities
            let itemIds = localStorageCart.map(item => item.id);
            let itemQuantities = localStorageCart.map(item => item.quantity);

            // Add newItem if provided
            if (newItem) {
                const existingIndex = itemIds.findIndex(id => id === newItem.id);

                if (existingIndex >= 0) {
                    itemQuantities[existingIndex] += newItem.quantity;
                } else {
                    itemIds.push(newItem.id);
                    itemQuantities.push(newItem.quantity);
                }

                // Update localStorage with new cart data
                localStorage.setItem(
                    'cart',
                    JSON.stringify(itemIds.map((id, index) => ({
                        id,
                        quantity: itemQuantities[index],
                    })))
                );
            }

            if (itemIds.length > 0) {
                // Fetch product details for all IDs
                const fetchPromises = itemIds.map(id =>
                    fetch(`http://localhost:3000/api/product/${id}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Failed to fetch product with id ${id}`);
                            }
                            return response.json();
                        })
                );

                const products = await Promise.all(fetchPromises);

                // Merge product details with quantities
                const updatedCart = products.map((product, index) => ({
                    ...product[0], // Assuming the API returns an array with one product
                    quantity: itemQuantities[index],
                }));

                setUpdatedCart(updatedCart);
                setQuantities(itemQuantities);
                console.log('Updated cart data:', updatedCart);
            } else {
                console.log("No items in cart.");
                setUpdatedCart([]);
                setQuantities([]);
            }
        } catch (error) {
            console.error("Error updating cart:", error);
        }
    };

    // Run updateCartDetails only once on mount
    useEffect(() => {
        updateCartDetails();
    }, []);

    return (
        <CartContext.Provider value={{ updatedCart, setUpdatedCart, updateCartDetails, quantities, setQuantities }}>
            {children}
        </CartContext.Provider>
    );
};

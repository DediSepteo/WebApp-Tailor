import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    });
    const [updatedCartDetails, setUpdatedCartDetails] = useState([]);

    // Function to fetch detailed cart data
    const updateCartDetails = async () => {
        console.log("Updating cart");
        const localStorageCart = JSON.parse(localStorage.getItem('cart') || "[]");
        console.log(localStorageCart, 'cart token');

        // Extract product IDs and quantities from local storage
        const itemIds = localStorageCart.map(item => item.id);
        const quantities = localStorageCart.map(item => item.quantity);

        if (itemIds.length > 0) {
            try {
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
                    quantity: quantities[index],
                }));
                setUpdatedCartDetails(updatedCart);
                console.log('Updated cart data:', updatedCart);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        } else {
            console.log("No items in cart.");
            setUpdatedCartDetails([]);
        }
    };

    // Update cart details whenever the cart state changes
    useEffect(() => {
        console.log("updating")
        updateCartDetails();
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, setCart, updatedCartDetails }}>
            {children}
        </CartContext.Provider>
    );
};

import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const localStorageCart = JSON.parse(localStorage.getItem('cart') || "[]");
    const [quantities, setQuantities] = useState([]);
    const [updatedCart, setUpdatedCart] = useState([])

    // Function to fetch detailed cart data
    const updateCartDetails = async (newItem) => {
        console.log("Updating cart");
        // Extract product IDs and quantities from local storage
        var itemIds = localStorageCart.map(item => item.id);
        var itemQuantities = localStorageCart.map(item => item.quantity);

        if (newItem) {
            if (itemIds.includes(newItem.id)) {
                const matchingIndex = itemIds.findIndex(item => item === newItem.id)
                itemQuantities[matchingIndex] += newItem.quantity
            }
            else {
                itemIds.push(newItem.id)
                itemQuantities.push(newItem.quantity)
            }

        }


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
                    quantity: itemQuantities[index],
                }));
                setUpdatedCart(updatedCart)
                setQuantities(itemQuantities)
                console.log('Updated cart data:', updatedCart);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        } else {
            console.log("No items in cart.");;
        }
    };

    useEffect(() => {
        updateCartDetails()
    }, [])

    return (
        <CartContext.Provider value={{ updatedCart, updateCartDetails, quantities, setQuantities }}>
            {children}
        </CartContext.Provider>
    );
};

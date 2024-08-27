import React, { useState, useEffect } from 'react';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/customers');

                // Check if the response is not JSON
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Received non-JSON response');
                }

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }

                const data = await response.json();
                // console.log('Fetched customers data:', data); // Log the fetched data

                setCustomers(data);
            } catch (error) {
                setError(error.message);
                // console.error('Error fetching customers:', error); // Log the error
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    if (loading) {
        return <p>Loading customers...</p>;
    }

    return (
        <div>
            <h1>Customer List</h1>
            {error && <p>Error: {error}</p>}
            {customers.length > 0 ? (
                <ul>
                    {customers.map(customer => (
                        <li key={customer.id}>
                            {customer.name} - {customer.email} - {customer.phone}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No customers found</p>
            )}
        </div>
    );
};

export default CustomerList;

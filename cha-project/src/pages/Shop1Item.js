import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // Import jwt-decode

import styles from '../styles/ShopItem.module.css';

const placeholderImg = "https://placehold.co/430x640"

export const Shop1Item = () => {
    const [products, setProducts] = useState([]);
    const [companyFromSession, setCompanyFromSession] = useState('');

    const navigate = useNavigate()
    const item = [];

    //const filteredItems = options.filter(item => item.company === company); idk whats this lol @jav

    const toDetails = (data) => {
        navigate(`/Shop1/${data.name}`, { state: { data: data } })
    }


    useEffect(() => {
        // Retrieve token from sessionStorage
        const token = sessionStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const orgName = decodedToken.org_name;
                const org_id = decodedToken.org_id;
                console.log('Organization Name from Token:', orgName);
                console.log('org id', org_id)
                setCompanyFromSession(orgName);

                // Fetch products using the org_name
                fetch(`http://localhost:3000/api/product/org/${org_id}`)
                    .then(response => response.json())
                    .then(data => {
                        setProducts(data);  // Store fetched products
                        console.log(data)
                    })
                    .catch(error => {
                        console.error('Error fetching products:', error);
                    });
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        } else {
            console.error('No token found in sessionStorage');
            navigate('/login');

        }

    }, [navigate]);

    return (
        <main>
            <div className={styles.directoryContainer}>
                <p className={styles.currentPage}>Shop</p>
                <div className={styles.navLinks}>
                    <Link to="/Home" className={styles.directoryLink}>Home</Link>
                    <Link to="/Shop1" className={styles.directoryLink}>/Shop</Link>
                    <Link to="" className={styles.currentLink}>/{companyFromSession}</Link>
                </div>
            </div>
            <div className={styles.categoriesContainer}>
                {products.length > 0 ? products.map((item, index) => (
                    <Link
                        to={`/Shop1/${item.name}`}
                        state={{ data: item }}
                        className={styles.categoryItem}
                        key={index}
                    >
                        <div className={styles.categoryImageWrapper}>
                            <img
                                src={item.image || placeholderImg}  // Use placeholder if image is missing
                                alt={item.name}
                                className={styles.categoryImage}
                            />
                        </div>
                        <div>
                            <p className={styles.categoryName}>{item.name}</p>
                            <p className={styles.categoryDetail}>{item.description}</p>
                            <p className={styles.categoryPrice}>₱{item.price}</p>
                        </div>
                    </Link>
                )) : <p>No products available.</p>}
            </div>
        </main>
    );
}
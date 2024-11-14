import { React, useState, useEffect } from 'react';
import ProfileSideNavBar from '../components/ProfileSideNavBar';
import { Link } from 'react-router-dom';
import styles from '../styles/Profile.module.css';
import { jwtDecode } from 'jwt-decode';
import { FaUserCircle } from "react-icons/fa";

const user = { phone: "+85 98765432" }

const orders = [
    {
        order_id: "1234567890",
        order_description: "Lorem ipsum dolor sit amet consectetur. Erat auctor a aliquam vel congue luctus. Leo diam cras neque mauris ac arcu elit ipsum dolor sit amet consectetur."
    },
    {
        order_id: "asfghjjkp",
        order_description: "Lorem ipsum dolor sit amet consectetur. Erat auctor a aliquam vel congue luctus. Leo diam cras neque mauris ac arcu elit ipsum dolor sit amet consectetur."
    },
    {
        order_id: "1234567890",
        order_description: "Lorem ipsum dolor sit amet consectetur. Erat auctor a aliquam vel congue luctus. Leo diam cras neque mauris ac arcu elit ipsum dolor sit amet consectetur."
    },
    {
        order_id: "asfghjjkp",
        order_description: "Lorem ipsum dolor sit amet consectetur. Erat auctor a aliquam vel congue luctus. Leo diam cras neque mauris ac arcu elit ipsum dolor sit amet consectetur."
    },
    {
        order_id: "1234567890",
        order_description: "Lorem ipsum dolor sit amet consectetur. Erat auctor a aliquam vel congue luctus. Leo diam cras neque mauris ac arcu elit ipsum dolor sit amet consectetur."
    },
    {
        order_id: "asfghjjkp",
        order_description: "Lorem ipsum dolor sit amet consectetur. Erat auctor a aliquam vel congue luctus. Leo diam cras neque mauris ac arcu elit ipsum dolor sit amet consectetur."
    },
    {
        order_id: "1234567890",
        order_description: "Lorem ipsum dolor sit amet consectetur. Erat auctor a aliquam vel congue luctus. Leo diam cras neque mauris ac arcu elit ipsum dolor sit amet consectetur."
    },
    {
        order_id: "asfghjjkp",
        order_description: "Lorem ipsum dolor sit amet consectetur. Erat auctor a aliquam vel congue luctus. Leo diam cras neque mauris ac arcu elit ipsum dolor sit amet consectetur."
    }
]

export const Profile = () => {
    const [ userName, setUserName ] = useState(null);
    const [ userEmail, setUserEmail ] = useState(null);
    const [maskedPassword, setMaskedPassword] = useState('No password set');

    useEffect(() => {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserName(decodedToken.org_name);
                setUserEmail(decodedToken.email);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }

        // Retrieve password length from localStorage and set masked password
        const passwordLength = localStorage.getItem('passwordLength');
        if (passwordLength) {
            setMaskedPassword('*'.repeat(Number(passwordLength)));
        }
    }, []);

    return (
        <main className={styles.mainContainer}>
            <div className={styles.profileSideNav}>
                <ProfileSideNavBar />
            </div>
            <div className={styles.content}>
                <div className={styles.container}>
                    <p style={{ fontSize: '0.85em' }}>MY PROFILE</p>
                    <p style={{ fontSize: '0.7em', backgroundColor: '#68BDB6', padding: '5px 10px', borderRadius: '4px' }}>Status</p>
                </div>
                <div style={{ display: 'flex', width: '85%', margin: '20px 0 50px 0', justifyContent: 'center', gap: '30px' }}>
                    <section className={styles.userDetails}>
                        <div className={styles.userMainInfo}>
                            <FaUserCircle style={{ fontSize: '6em', color: "grey" }} />
                            <div>
                                <p className={styles.username}>{userName || "Guest"}</p>
                                <p className={styles.email}>{userEmail}</p>
                            </div>
                        </div>
                        <div className={styles.userFullInfo}>
                            <div style={{ margin: '15px 0' }}>
                                <span className={styles.title}>Your Name: </span>
                                <div className={styles.infoRow}>
                                    <p>{userName}</p>
                                    <button className={styles.editBtn}>Edit</button>
                                </div>
                            </div>
                            <div style={{ margin: '15px 0' }}>
                                <span className={styles.title}>Email: </span>
                                <div className={styles.infoRow}>
                                    <p>{userEmail}</p>
                                    <button className={styles.editBtn}>Edit</button>
                                </div>
                            </div>
                            <div style={{ margin: '15px 0' }}>
                                <span className={styles.title}>Phone Number: </span>
                                <div className={styles.infoRow}>
                                    <p>{user.phone}</p>
                                    <button className={styles.editBtn}>Edit</button>
                                </div>
                            </div>
                            <div style={{ margin: '15px 0' }}>
                                <span className={styles.title}>Password: </span>
                                <div className={styles.infoRow}>
                                    <p>{maskedPassword}</p>
                                    <button className={styles.editBtn}>Edit</button>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className={styles.deliveryDetails}>
                        <div className={styles.sectionTitleContainer}>
                            <div className={styles.sectionTitle}>Pending Orders</div>
                        </div>
                        <div className={styles.deliveryDetailsContent}>
                            {orders.map((item, index) => (
                                <Link to={""} className={styles.deliveryItems} key={index}>
                                    Order ID: {item.order_id}
                                    <p className={styles.itemDescription}>{item.order_description}</p>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};
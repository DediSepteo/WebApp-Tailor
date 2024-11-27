import { React, useState, useEffect } from 'react';
import ProfileSideNavBar from '../components/ProfileSideNavBar';
import EditProfileInfo from '../components/EditProfileInfo';
import { Link } from 'react-router-dom';
import styles from '../styles/Profile.module.css';
import { jwtDecode } from 'jwt-decode';
import { FaUserCircle } from "react-icons/fa";

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
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userPhone, setUserPhone] = useState(null);
    const [orgIndustry, setOrgIndustry] = useState(null);
    const [userAddress1, setUserAddress1] = useState(null);
    const [maskedPassword, setMaskedPassword] = useState('No password set');
    const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);
    const [fieldToEdit, setFieldToEdit] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                console.log(decodedToken);
                setUserId(decodedToken.org_id);
                setUserName(decodedToken.org_name);
                setUserEmail(decodedToken.email);
                setOrgIndustry(decodedToken.industry);
                setUserAddress1(decodedToken.address);
                setUserPhone(decodedToken.org_phone);
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }

        const passwordLength = localStorage.getItem('passwordLength');
        if (passwordLength) {
            setMaskedPassword('*'.repeat(Number(passwordLength)));
        }
    });

    const handleEditClick = (field) => {
        setFieldToEdit(field);
        setIsEditProfileVisible(true);
    };

    const closeEditProfile = () => {
        setIsEditProfileVisible(false);
    }

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
                            <div style={{ margin: '10px 0' }}>
                                <span className={styles.title}>Your Name: </span>
                                <div className={styles.infoRow}>
                                    <p>{userName}</p>
                                    <button onClick={() => handleEditClick('name')} className={styles.editBtn}>Edit</button>
                                </div>
                            </div>
                            <div style={{ margin: '10px 0' }}>
                                <span className={styles.title}>Email: </span>
                                <div className={styles.infoRow}>
                                    <p>{userEmail}</p>
                                    <button onClick={() => handleEditClick('email')} className={styles.editBtn}>Edit</button>
                                </div>
                            </div>
                            <div style={{ margin: '10px 0' }}>
                                <span className={styles.title}>Phone Number: </span>
                                <div className={styles.infoRow}>
                                    <p>{userPhone}</p>
                                    <button onClick={() => handleEditClick('phone')} className={styles.editBtn}>Edit</button>
                                </div>
                            </div>
                            <div style={{ margin: '10px 0' }}>
                                <span className={styles.title}>Address: </span>
                                <div className={styles.infoRow}>
                                    <p>{userAddress1}</p>
                                    <button onClick={() => handleEditClick('address_line1')} className={styles.editBtn}>Edit</button>
                                </div>
                            </div>
                            <div style={{ margin: '10px 0' }}>
                                <span className={styles.title}>Industry: </span>
                                <div className={styles.infoRow}>
                                    <p>{orgIndustry}</p>
                                    <button onClick={() => handleEditClick('industry')} className={styles.editBtn}>Edit</button>
                                </div>
                            </div>
                            <div style={{ margin: '10px 0' }}>
                                <span className={styles.title}>Password: </span>
                                <div className={styles.infoRow}>
                                    <p>{maskedPassword}</p>
                                    <button onClick={() => handleEditClick('password')} className={styles.editBtn}>Edit</button>
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
            <EditProfileInfo 
                isVisible={isEditProfileVisible} 
                onClose={closeEditProfile} 
                fieldToEdit={fieldToEdit}
                initialValue={
                    fieldToEdit === 'name' ? userName : 
                    fieldToEdit === 'email' ? userEmail :
                    fieldToEdit === 'phone' ? userPhone :
                    fieldToEdit === 'address_line1' ? userAddress1 :
                    fieldToEdit === 'industry' ? orgIndustry : ''
                }
                userId={userId}
            />
        </main>
    );
};
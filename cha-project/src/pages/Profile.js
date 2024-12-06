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
    const [userDetails, setUserDetails] = useState({
        userId: null,
        userName: null,
        userEmail: null,
        userPhone: null,
        orgIndustry: null,
        userAddress1: null,
        maskedPassword: 'No password set',
    });
    const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);
    const [fieldToEdit, setFieldToEdit] = useState(null);

    const updateUserDetails = (updatedField) => {
        setUserDetails((prevDetails) => ({ ...prevDetails, ...updatedField }));
    };

    useEffect(() => {
        const fetchAndSetUserDetails = () => {
            const token = sessionStorage.getItem('token') || localStorage.getItem('token');
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    setUserDetails((prevDetails) => ({
                        ...prevDetails,
                        userId: decodedToken.org_id,
                        userName: decodedToken.org_name,
                        userEmail: decodedToken.email,
                        orgIndustry: decodedToken.industry,
                        userAddress1: decodedToken.address,
                        userPhone: decodedToken.org_phone,
                    }));
                } catch (error) {
                    console.error('Invalid token:', error);
                }
            }

            const passwordLength = localStorage.getItem('passwordLength');
            if (passwordLength) {
                setUserDetails((prevDetails) => ({
                    ...prevDetails,
                    maskedPassword: '*'.repeat(Number(passwordLength)),
                }));
            }
        };

        fetchAndSetUserDetails();
    }, []);

    const handleEditClick = (field) => {
        setFieldToEdit(field);
        setIsEditProfileVisible(true);
    };

    const closeEditProfile = () => {
        setIsEditProfileVisible(false);
    };

    const {
        userId,
        userName,
        userEmail,
        userPhone,
        orgIndustry,
        userAddress1,
        maskedPassword,
    } = userDetails;

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
                            {[
                                { title: 'Your Name', value: userName, field: 'name' },
                                { title: 'Email', value: userEmail, field: 'email' },
                                { title: 'Phone Number', value: userPhone, field: 'phone' },
                                { title: 'Address', value: userAddress1, field: 'address_line1' },
                                { title: 'Industry', value: orgIndustry, field: 'industry' },
                                { title: 'Password', value: maskedPassword, field: 'password' },
                            ].map(({ title, value, field }) => (
                                <div key={field} style={{ margin: '10px 0' }}>
                                    <span className={styles.title}>{title}: </span>
                                    <div className={styles.infoRow}>
                                        <p>{value}</p>
                                        <button onClick={() => handleEditClick(field)} className={styles.editBtn}>{field === 'password' ? 'Change' : 'Edit'}</button>
                                    </div>
                                </div>
                            ))}
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
                initialValue={userDetails[fieldToEdit]}
                userId={userId}
                onUpdateProfile={updateUserDetails}
            />
        </main>
    );
};
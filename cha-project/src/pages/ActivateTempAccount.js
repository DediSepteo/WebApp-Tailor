import { React, useState, useEffect } from 'react';
import ProfileSideNavBar from '../components/ProfileSideNavBar';
import { Link } from 'react-router-dom';
import styles from '../styles/Profile.module.css';
import { jwtDecode } from 'jwt-decode';
import { FaUserCircle } from "react-icons/fa";

export const ActivateTempAccount = () => {

    async function createTemporaryAccount(orgName) {
        try {
            await fetch(`http://localhost:3000/api/temp?orgName=${orgName}`, {
                method: "POST"
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
        } catch (error) {
            console.error('Error creating temporary account:', error);
            throw error;
        }
    }


    createTemporaryAccount('YourOrgName').then((account) => console.log('Account:', account));

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
        </main>
    );
};
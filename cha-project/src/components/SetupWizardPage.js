import React from 'react';
import AdminSideNavBar from '../components/AdminSideNavBar'
import styles from '../styles/SetupWizardPage.module.css'

const SetupWizardPage = ({ title, fields, onSubmit }) => {
    return (
        <main style={{ display: "flex", flexDirection: "row" }}>
            <AdminSideNavBar />
            <div className={styles.container}>
                <span style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "2em" }}>{title}</span>
                <form onSubmit={onSubmit} className={styles.form}>
                    {fields.map((field, index) => (
                        <div key={index} className={styles.field}>
                            <label className={styles.label}>{field.label}</label>
                            {/* Handle different field types */}
                            {field.fieldType === 'input' && (
                                <input
                                    className={styles.input}
                                    type={field.type}
                                    value={field.value}
                                    onChange={field.onChange}
                                    required={field.required}
                                />
                            )}
                            {field.fieldType === 'dropdown' && (
                                <select value={field.value} onChange={field.onChange} required={field.required}>
                                    <option value="" disabled>Select an option</option>
                                    {field.options.map((option, i) => (
                                        <option key={i} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    ))}
                    <button type="submit" className={styles.submit}>Submit</button>
                </form>
            </div>
        </main>
    );
};

export default SetupWizardPage;

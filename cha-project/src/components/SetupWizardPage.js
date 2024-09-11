import React from 'react';
import AdminSideNavBar from '../components/AdminSideNavBar'

const SetupWizardPage = ({ title, fields, onSubmit }) => {
    return (
        <main style={{ display: "flex", flexDirection: "row" }}>
            <AdminSideNavBar />
            <div className="setup-wizard">
                <h1>{title}</h1>
                <form onSubmit={onSubmit}>
                    {fields.map((field, index) => (
                        <div key={index} className="form-group">
                            <label>{field.label}</label>
                            {/* Handle different field types */}
                            {field.fieldType === 'input' && (
                                <input
                                    type={field.type}
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder={field.placeholder}
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
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </main>
    );
};

export default SetupWizardPage;

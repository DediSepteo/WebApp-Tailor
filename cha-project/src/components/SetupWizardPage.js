import React, { useState, useRef, useEffect } from 'react';
import AdminSideNavBar from '../components/AdminSideNavBar'
import styles from '../styles/SetupWizardPage.module.css'
import { useNavigate } from 'react-router-dom';

const SetupWizardPage = ({ title, fields, onSubmit }) => {

    // addedRows does not count the first unremovable row in the table
    const [addedRows, setAddedRows] = useState(0)
    const [tableInputs, setTableInputs] = useState([])
    const tableField = useRef(null)

    const navigate = useNavigate()

    const addTableRow = () => {
        setAddedRows(addedRows + 1)
    }

    const deleteTableRow = (rowIndex) => {
        console.log(rowIndex)
        let newTableInputs = [...tableInputs]; // Copy of tableInputs array
        {/* rowIndex starts from 1 as first row cannot be deleted*/ }
        newTableInputs.splice(rowIndex + 1, 1);

        // Update rows and tableInputs in state
        setAddedRows(addedRows - 1);
        setTableInputs(newTableInputs);
    };

    useEffect(() => {
        if (!fields)
            navigate("/admin/dashboard")
        else if (fields.find(field => field.fieldType === 'tableInput'))
            fields.find(field => field.fieldType === 'tableInput').onChange(tableInputs);
    }, [tableInputs])

    const handleTableInputChange = (id, title, value) => {
        let newTableInputs = tableInputs;  // Copy the state array

        const existingItem = newTableInputs[id];

        if (existingItem) {
            // If it exists, update the input field
            existingItem[title.toLowerCase()] = value;
        } else {
            // If it doesn't exist, create a new entry
            newTableInputs.push({
                [title.toLowerCase()]: value
            });
        }
        console.log(newTableInputs)
        setTableInputs(newTableInputs);  // Update the state
    };

    return (
        <main style={{ display: "flex", flexDirection: "row" }}>
            <AdminSideNavBar />
            <div className={styles.container}>
                <span style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "2em" }}>{title}</span>
                <form onSubmit={onSubmit} className={styles.form}>
                    {fields ? (
                        fields.map((field, index) => (
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
                                {field.fieldType === 'textarea' && (
                                    <textarea
                                        className={styles.textArea}
                                        value={field.value}
                                        onChange={field.onChange}
                                        required={field.required}
                                    />
                                )}
                                {field.fieldType === 'dropdown' && (
                                    <select value={field.id} onChange={field.onChange} required={field.required} className={styles.dropDown}>
                                        <option value="" disabled>Select an option</option>
                                        {field.options.map((option, i) => (
                                            <option key={i} value={option.id}>
                                                {option.value}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {field.fieldType === 'upload' && (
                                    <input
                                        type="file"
                                        onChange={field.onChange}
                                        accept="image/png, image/jpeg"
                                    />
                                )}
                                {field.fieldType === 'tableInput' && (
                                    <div>
                                        <table ref={tableField} style={{ borderCollapse: "collapse", border: "0.5px solid #D9D9D9", width: "80%" }}>
                                            <thead>
                                                <tr>
                                                    {field.headers.map((header, i) => (
                                                        <th key={i} className={styles.th}>{header.title}</th>
                                                    ))}
                                                    <th className={styles.th}></th>
                                                </tr>
                                            </thead>
                                            <tbody className={styles.tbody}>
                                                <tr>
                                                    {field.headers.map((header, i) => {
                                                        const title = header.title;
                                                        const type = header.inputType;
                                                        return (
                                                            <td key={i} className={styles.td}>
                                                                {type === "input" && (
                                                                    <input
                                                                        type={header.type || "text"}
                                                                        step={header.step || undefined}
                                                                        onChange={(e) => handleTableInputChange(0, title, e.target.value)}
                                                                    />
                                                                )}
                                                                {type === "textarea" && (
                                                                    <textarea
                                                                        className={styles.tableTextArea}
                                                                        onChange={(e) => handleTableInputChange(0, title, e.target.value)}
                                                                    />
                                                                )}
                                                                {type === "upload" && (
                                                                    <input
                                                                        type="file"
                                                                        onChange={(e) => handleTableInputChange(0, title, e.target.files[0])}
                                                                        accept="image/png, image/jpeg"
                                                                    />
                                                                )}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                                {[...Array(addedRows)].map((_, rowIndex) => (
                                                    <tr key={rowIndex}>
                                                        {field.headers.map((header, headerIndex) => {
                                                            const title = header.title;
                                                            const type = header.inputType;
                                                            const inputValue = tableInputs[rowIndex + 1]?.[title];
                                                            return (
                                                                <td key={headerIndex} className={styles.td}>
                                                                    {type === "input" && (
                                                                        <input
                                                                            type={header.type || "text"}
                                                                            step={header.step || undefined}
                                                                            value={inputValue}
                                                                            onChange={(e) => handleTableInputChange(rowIndex + 1, title, e.target.value)}
                                                                        />
                                                                    )}
                                                                    {type === "textarea" && (
                                                                        <textarea
                                                                            className={styles.tableTextArea}
                                                                            onChange={(e) => handleTableInputChange(rowIndex + 1, title, e.target.value)}
                                                                        />
                                                                    )}
                                                                    {type === "upload" && (
                                                                        <input
                                                                            type="file"
                                                                            onChange={(e) => handleTableInputChange(rowIndex + 1, title, e.target.files[0])}
                                                                            accept="image/png, image/jpeg"
                                                                        />
                                                                    )}
                                                                </td>
                                                            );
                                                        })}
                                                        <td className={styles.td} style={{ display: "flex", justifyContent: "center" }}>
                                                            <button type="button" className={styles.removeBtn} onClick={() => deleteTableRow(rowIndex)}>
                                                                Remove
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <button className={styles.addProduct} type="button" onClick={() => addTableRow(field)}>
                                            <span style={{ fontFamily: "Inter", fontWeight: 600, color: "black" }}>+</span> Add new Item
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div>No fields available</div>
                    )}

                    <button type="submit" className={styles.submit}>Submit</button>
                </form>
            </div >
        </main >
    );
};

export default SetupWizardPage;

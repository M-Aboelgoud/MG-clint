import React from 'react';
import '../App.css'; // Import the CSS file

const FormTable = ({ forms, onDelete }) => {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>location</th>
                        <th>contact Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {forms.map(form => (
                        <tr key={form._id}>
                            <td>{form._id}</td>
                            <td>{form.name}</td>
                            <td>{form.phoneNumber}</td>
                            <td>{form.location}</td>
                            <td>{new Date(form.contactDate).toISOString().split('T')[0]}</td>
                       

                            <td>
                                <button onClick={() => onDelete(form._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FormTable;

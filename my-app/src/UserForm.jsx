import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserForm.css';

const UserForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        country: '',
        email: ''
    });

    // Removed email loading from local storage on component mount
    useEffect(() => {
        // No need to load from local storage anymore
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(formData);

        console.log(formData);
        console.log('sending...');

        try {
            const response = await axios.post('http://localhost:3000/forminfo', { frmdata: formData });
            console.log(response);
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="user-form">
            <div className="form-group">
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-inputt"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="dob" className="form-label">Date of Birth:</label>
                <input
                    type="date"
                    id="dob"
                    name="dob"
                    className="form-inputt"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="country" className="form-label">Country:</label>
                <select
                    id="country"
                    name="country"
                    className="form-inputt"
                    value={formData.country}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a country</option>
                    <option value="in">India</option>
                    <option value="gb">United Kingdom</option>
                    <option value="us">United States</option>
                    <option value="au">Australia</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-inputt"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="submit-button">Submit</button>
        </form>
    );
};

export default UserForm;

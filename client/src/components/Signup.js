import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { DeleveryContext } from "../store.js";
import { toast } from 'react-toastify';
import '../Css/Signup.css';

function Signup() {
    const navigate = useNavigate();
    const { storeToken } = DeleveryContext();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: '', // Initialize role state
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const Postdata = async (e) => {
        e.preventDefault();
        const { name, email, phone, role, password, confirmPassword } = formData;
        try {
            let res = await fetch("http://localhost:9000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name, email, phone, role, password, cpassword: confirmPassword,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("Registration failed:", errorData);
                toast.error(errorData.message);
            } else {
                const resdata = await res.json();
                storeToken(resdata.token);
                console.log(resdata);
                toast("Registration Successful");
                setFormData({ name: "", email: "", phone: "", role: "", password: "", confirmPassword: "" });
                navigate("/");
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <div className='body'>
            <div className='signupdiv'>
                <div className='formcontent'>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />

                        <label htmlFor="phone">Phone:</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />

                        <label htmlFor="role">Role/User Type:</label>
                        <select id="role" name="role" value={formData.role} onChange={handleInputChange} required>
                            <option>Select Role</option>
                            <option value="Startup ">Startup </option>
                            <option value="Investor"> Investor</option>
                            <option value="Public User">Public User</option>
                        </select>

                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />

                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />

                        <button type="submit" onClick={Postdata}>Register</button>
                        <NavLink className="already" to="/Login">
                            Are you already a user? Click here
                        </NavLink>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;

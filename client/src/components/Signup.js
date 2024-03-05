import React, { useState, useEffect } from 'react';
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
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    useEffect(() => {
        validatePassword(formData.password);
    }, [formData.password]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isPasswordValid) {
            toast.error("Password does not meet the requirements.");
            return;
        }
        console.log(formData);
        // Proceed with registration
    };

    const Postdata = async (e) => {
        e.preventDefault();
        if (!isPasswordValid) {
            toast.error("Password does not meet the requirements.");
            return;
        }
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
               window.location.href = "/";
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    // Password validation functions
    const isLengthValid = (password) => password.length >= 8;
    const containsUpperCase = (password) => /[A-Z]/.test(password);
    const containsLowerCase = (password) => /[a-z]/.test(password);
    const containsNumber = (password) => /[0-9]/.test(password);
    const containsSpecialCharacter = (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const validatePassword = (password) => {
        const isValid =
            isLengthValid(password) &&
            containsUpperCase(password) &&
            containsLowerCase(password) &&
            containsNumber(password) &&
            containsSpecialCharacter(password);

        setIsPasswordValid(isValid);
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
                        <div className='validpass' style={{ color: "red", textAlign: "left", marginTop: "10px" }}>
                            <h5 style={{ color: isLengthValid(formData.password) ? "green" : "red" }}>Password must be at least 8 characters</h5>
                            <h5 style={{ color: containsUpperCase(formData.password) ? "green" : "red" }}>Must contain at least one uppercase letter</h5>
                            <h5 style={{ color: containsLowerCase(formData.password) ? "green" : "red" }}>One lowercase letter</h5>
                            <h5 style={{ color: containsNumber(formData.password) ? "green" : "red" }}>One number</h5>
                            <h5 style={{ color: containsSpecialCharacter(formData.password) ? "green" : "red" }}>One special character</h5>
                        </div>

                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />

                        <button type="submit" onClick={Postdata} >Register</button>
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

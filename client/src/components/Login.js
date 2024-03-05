import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { DeleveryContext } from "../store.js";
import { useContext } from 'react';
import signimg from "../Images/welcome.svg"
import '../Css/Login.css'; // Assuming your CSS file is in the correct location
import { toast } from 'react-toastify';
import Alert from '@mui/material/Alert'; // Import the Alert component

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { storeToken } = DeleveryContext();
    const [alertMessage, setAlertMessage] = useState(""); // State to manage the alert message
    const [alertSeverity, setAlertSeverity] = useState(""); // State to manage the alert severity

    const Loginuser = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("http://localhost:9000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("Login failed:", errorData);
                setAlertSeverity("error");
                setAlertMessage("Invalid Credentials"); // Set error message
                toast.error(errorData.message);
            } else {
                const loginResData = await res.json();
                storeToken(loginResData.token);
                setAlertSeverity("success");
                setAlertMessage("Login Successful"); // Set success message
                toast("Login Successful");
                setTimeout(() => {
                    window.location.href = "/"; // Redirect after 2 seconds
                }, 2000);
            }
        } catch (error) {
            console.error("Error during login:", error);
            setAlertSeverity("error");
            setAlertMessage("An error occurred. Please try again later."); // Set error message
        }
    };

    return (
        <div className='body'>

            <div className='signupdiv'>
                <div className='formcontent'>
                    <h1>Login</h1>
                    <form method='POST'>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" onClick={Loginuser}>Login</button>
                        <NavLink className="already" to="/Signup">
                            New user? Click here to register
                        </NavLink>
                    </form>
                    {/* Conditionally render the Alert component */}
                    {/* {alertMessage && <Alert severity={alertSeverity}>{alertMessage}</Alert>} */}
                </div>
            </div>
        </div>
    );
}

export default Login;

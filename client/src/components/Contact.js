import React, { useEffect } from 'react';
import '../Css/Contact.css';
import { useState } from 'react';
import {  toast } from 'react-toastify';
import { DeleveryContext } from '../store.js';

function Contact() {
    
    const {user1} = DeleveryContext();   
    const [contact, setContact] = useState({

        name: "",
        email: "",
        phone: "",
        message: ""

    })
    const [userData, setUserData] = useState(true);

    if(userData && user1){
        setContact({
            name: user1.name,
            email: user1.email,
            phone: user1.phone,
            message: ""
        })
        setUserData(false);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setContact({
            ...contact,
            [name]: value
        })
    }
const onContact = async (e) => {
    e.preventDefault()
    console.log (contact);
const {name, email, phone, message} = contact
  try{
    const response = await fetch('http://localhost:9000/contact', {
        method: 'POST',
        headers:{
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            name, email, phone, message
        })
    })
    if (!response.ok) {
        const errorData = await response.json();
        console.error("failed:", errorData);
        toast.error(errorData.message);
        // Handle specific validation errors and display messages to the user
    } else {
        // Registration successful, redirect or perform other actions
        toast("Contacted Successful");
        // console.log("Registration Successful");
        setContact({ message: "" });
    }
  }catch(error){
    console.log("Error while Contacting",error)
  }
}
return (
    
        <div className='contactdiv'>
            <div className='contactcontent'>
               
                <form method='POST' className='contactform'>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={contact.name} onChange={handleInputChange}required />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={contact.email} onChange={handleInputChange} required />

                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" id="phone" name="phone" value={contact.phone} onChange={handleInputChange} required />

                    <label htmlFor="text">Message:</label>
                    <textarea className="message" id="message" name="message" rows="10" cols="30"onChange={handleInputChange} value={contact.message}  > </textarea>



                    <button type="submit" onClick={onContact}>Contact</button>

                </form>
            </div>
        </div>
    
)
}
export default Contact;
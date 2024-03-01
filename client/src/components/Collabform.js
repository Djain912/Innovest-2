import { toast } from "react-toastify";
import "../Css/Form.css"
import React,{ useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
function TestForm() {
   

    const [file, setFile] = useState(null); // State to store the selected file

    // Function to handle file input change
    const handleFileChange = async(e) => {
        const selectedFile = e.target.files[0];
        
        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("upload_preset", "innovest");
            formData.append("cloud_name", "djain");
    
            const cloudinaryResponse = await fetch("https://api.cloudinary.com/v1_1/djain/image/upload", {
                method: "POST",
                body: formData
            });
    
            if (!cloudinaryResponse.ok) {
                const errorData = await cloudinaryResponse.json();
                console.error("Error uploading image:", errorData);
                toast.error("Error uploading image. Please try again later.");
                return; // Exit function early if upload fails
            }else{
                const cloudinaryData = await cloudinaryResponse.json();
            setFile(cloudinaryData.url);
            toast.success("File uploaded successfully.");
            }
    
            
        } catch (error) {
            console.error("Error sharing post:", error);
            toast.error("Error sharing post. Please try again after some seconds.");
        }
    };


  
    const submitform = async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const skill = document.getElementById("skill").value;
        const address = document.getElementById("address").value;
        const city = document.getElementById("city").value;
        const state = document.getElementById("state").value;
        const zip = document.getElementById("zip").value;
        const phone = document.getElementById("phone").value;
        const message = document.getElementById("message").value;
        
        console.log(file);
        try {
            const response = await fetch("http://localhost:9000/cmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email,skill, address, city, state, zip, phone, message,file,
                })
            });
         
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error("failed:", errorData);
                toast.error(errorData.message);
            } else {
                const data = await response.json();
                console.log("mail sent successfully", data);
                toast.success("Mail sent successfully");
            }
            
        } catch (error) {
            console.log(error);
        }
    }

  
    return (
        <div className="testform">
            <form onSubmit={submitform}>
            <p>Name</p>
            <input type="text" placeholder="Yours Name" id="name" />
            <p>Email</p>
            <input type="email" placeholder="Reciever Email" id="email" />
            <p>Skills</p>
            <input type="text" placeholder="Your Skills" id="skill" />

            <div style={{ backgroundColor: "whitesmoke" ,padding: "10px"}}>
            <p>Conatact Details</p>
            <input type="text" placeholder="Yours Address" id="address" />
            <div className="zip">
                <p>City</p>
                <input type="text" placeholder="City" id="city" />
                <p>State</p>
                <input type="text" placeholder="State"  id="state"/>
                <p>Zip</p>
                <input type="text" placeholder="Zip" id="zip"/>
            </div>
            </div>
            <p>Phone</p>
            <input type="number" placeholder="Phone" id="phone"/>
            <p>Message</p>
            <textarea className="messageform" type="text" placeholder="Message" id="message" />
            <p>Upload File</p>
            <input type="file" onChange={handleFileChange} />

            <button type="submit">Submit</button>
            </form>

        </div>
    );
}

export default TestForm;
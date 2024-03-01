import { toast } from "react-toastify";
import "../Css/Form.css"
import React,{ useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
function TestForm() {
    let id = "";
    let ofid = "";
    useEffect(() => {

        const searchParams = new URLSearchParams(window.location.search);
        // Extract product data from URL parameters
        id= searchParams.get('productId');
         ofid = searchParams.get('ofId');
        console.log(id, ofid);
        // Do something with productId and type
        fetchprdetail();
    }, [window.location.search]);

    const [product, setProduct] = useState({
        image: "",
        name:   "",
        description: "",
    })
    const submitform = async(e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const address = document.getElementById("address").value;
        const city = document.getElementById("city").value;
        const state = document.getElementById("state").value;
        const zip = document.getElementById("zip").value;
        const phone = document.getElementById("phone").value;
        const message = document.getElementById("message").value;
    
        try {
            const response = await fetch("http://localhost:9000/mail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, address, city, state, zip, phone, message,
                    
                    product: {
                        image: product.image,
                        name: product.name,
                        description: product.description
                    },
                    ofid,
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
  const fetchprdetail = async () => {
    try {
        const response = await fetch(`http://localhost:9000/prdetail/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            // Handle non-JSON response (e.g., HTML error page)
            console.error("Failed to fetch product details:", response.statusText);
            // You can throw an error or handle it in another way
        } else {
            const data = await response.json();
            console.log(data);
            setProduct(data);
            // Handle the JSON response
        }
    } catch (error) {
        console.error("Error fetching product details:", error);
        // Handle network errors
    }
};
    return (
        <div className="testform">
           <p>Product Details</p>
           <div className="formpr">
               <img src={product.image} alt="product"  className="formimg"/>
               <p style={{fontSize:"2rem",color:"black"}}>{product.name}</p>
               <p style={{fontSize:"1.7rem",color:"gray"}}>{product.description}</p>
            </div>
            <form onSubmit={submitform}>
            <p>Name</p>
            <input type="text" placeholder="Yours Name" id="name" />
            <p>Email</p>
            <input type="email" placeholder="Reciever Email" id="email" />
            <p>Address</p>
            <input type="text" placeholder="Yours Address" id="address" />
            <div className="zip">
                <p>City</p>
                <input type="text" placeholder="City" id="city" />
                <p>State</p>
                <input type="text" placeholder="State"  id="state"/>
                <p>Zip</p>
                <input type="text" placeholder="Zip" id="zip"/>
            </div>
            <p>Phone</p>
            <input type="number" placeholder="Phone" id="phone"/>
            <p>Message</p>
            <textarea className="messageform" type="text" placeholder="Message" id="message" />
           


            <button type="submit">Submit</button>
            </form>

        </div>
    );
}

export default TestForm;
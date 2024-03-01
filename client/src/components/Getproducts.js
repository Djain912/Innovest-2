import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillPlusCircle } from "react-icons/ai";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import "../Css/Getproduct.css"
import { DeleveryContext } from '../store';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


function Getproducts() {
    useEffect(() => {
        if (!localStorage.getItem("Token")) {
            navigate("/login")
            // toast("Please Login First");
        }
        fetchProducts();
        // console.log(user1);
    }, []);

    const user1 = DeleveryContext();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [recording, setRecording] = useState(false);
    const [mediaStream, setMediaStream] = useState(null);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    var idx;
    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:9000/getproduct", {
                method: "GET",
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Failed to fetch products:", errorData);
            } else {
                const data = await response.json();
                console.log(data);
                setProducts(data);
                setFilteredProducts(data);
                idx = user1.user1._id; // Initialize filtered products with all products
            }
        } catch (err) {
            console.log(err);
        }
    };

    const filterProducts = (type) => {
        if (type === " ") {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product => product.type === type);
            setFilteredProducts(filtered);
        }
    };
    

    const testProduct = async (type, pr, of, link) => {
        if (type === "Digital Product") {
            window.open(`/record?link=${link}`,"_blank");
        }
        if (type === "Physical Product") {
            navigate(`/testform?productId=${pr}&ofId=${of}`); // Pass product data in URL
        }
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            setMediaStream(null);
        }
    };



    return (
        <div className='Getproductdiv' >
            <div className='Plus'>
                <AiFillPlusCircle className='addbtn' onClick={() => navigate("/product")}></AiFillPlusCircle>
            </div>
            <div className="filter-buttons" style={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
                <div class="btn-group btn-group-lg" role="group" aria-label="...">
                    {/* <button type="button" class="btn btn-secondary" style={{ backgroundColor: "#2424ff", fontSize: "2rem" }} onClick={() => filterProducts('Digital Product')}>Digital Product</button> */}
                    {/* <button type="button" class="btn btn-secondary" style={{ backgroundColor: "#2424ff", fontSize: "2rem" }} onClick={() => filterProducts('Physical Product')}>Physical Product</button> */}
                    <ButtonGroup variant="contained" aria-label="Basic button group">
                    <Button style={{ backgroundColor: "#2424ff", fontSize: "1.5rem" }} onClick={() => filterProducts(' ')}>All Product</Button>
                        <Button style={{ backgroundColor: "#2424ff", fontSize: "1.5rem" }} onClick={() => filterProducts('Digital Product')}>Digital Product</Button>
                        <Button  style={{ backgroundColor: "#2424ff", fontSize: "1.5rem" }} onClick={() => filterProducts('Physical Product')}>Physical Product</Button>
                    </ButtonGroup>
                </div>
            </div>
            <div className="productcontainer" style={{ display: "flex", flexWrap: "wrap", margin: "2rem", width: "100%" }}>
                {filteredProducts.map(product => (
                    <div key={product._id} className="productcard" >
                        <img className="card-img-top" src={product.image} alt="Product" />
                        <div className="card-body">
                            <h5 className="card-title" >{product.name}</h5>
                            <p className="card-text">{product.description}</p>
                            <p className="card-text" style={{ fontSize: "1.5rem", color: "#2424ff", fontStyle: "italic" }}> {product.type}</p>
                            {product.link === "" ? null :
                                <a href={product.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Go to Link</a>
                            }
                            <button
                                className="btn btn-primary"
                                onClick={() => testProduct(product.type, product._id, product.productof, product.link)}
                            >
                                Test Product
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Getproducts;

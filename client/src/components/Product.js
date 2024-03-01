import React, { useEffect, useState } from 'react';
import '../Css/Product.css';
import pic from '../Images/profilesample.jpg';
import { toast } from 'react-toastify';
import { DeleveryContext } from '../store.js';
import LinearProgress from '@mui/material/LinearProgress';

function Product() {
    const [post, setPost] = useState('');
    const [productimg, setproductImg] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [type, setType] = useState('');
    const [link, setLink] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const [name, setName] = useState('');
    const [isUploading, setIsUploading] = useState(false); // State to manage the upload process
    const { user1 } = DeleveryContext();

    useEffect(() => {
        if (!localStorage.getItem('Token')) {
            window.location.href = '/login';
        }
        if (productimg) {
            sharePost();
        }
    }, [productimg]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        setproductImg(file);
        setPreviewUrl(URL.createObjectURL(file)); // Set preview URL for image
    };

    const sharePost = async () => {
        try {
            setIsUploading(true); // Start the upload process
            const formData = new FormData();
            formData.append("file", productimg);
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
            } else {
                const cloudinaryData = await cloudinaryResponse.json();
                setImgUrl(cloudinaryData.url);
                toast.success("Image uploaded successfully.");
            }

        } catch (error) {
            console.error("Error sharing post:", error);
            toast.error("Error sharing post. Please try again after some seconds.");
        } finally {
            setIsUploading(false); // End the upload process
        }
    };

    const postupload = async () => {
        try {
            setIsUploading(true); // Start the upload process
            const postDataResponse = await fetch("http://localhost:9000/addproduct", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("Token")}`,
                },
                body: JSON.stringify({
                    name: name,
                    image: imgUrl,
                    type: type,
                    link: link,
                    productof: user1._id,
                    description: post
                }),
            });

            if (!postDataResponse.ok) {
                const errorData = await postDataResponse.json();
                console.error("Post failed:", errorData);
                toast.error(errorData.message);
            } else {
                const responseData = await postDataResponse.json();
                console.log(responseData);
                toast("Product Added Successfully");
                window.location.reload();
            }
        } catch (error) {
            console.error("Error sharing post:", error);
            toast.error("Error sharing post. Please try again later.");
        } finally {
            setIsUploading(false); // End the upload process
        }
    };

    return (
        <>
            <div className='post'>
                <div className='posthead'>
                    <img src={user1.image} alt='logo' className='pic' />
                    <h1 className='postusername'>{user1.name}</h1>
                </div>
                <div className='postbody'>
                    <h4>Product Name:-</h4>
                    <input type="text" placeholder='Product Name' className='productname' onChange={(e) => setName(e.target.value)} />
                    <h4>Description:-</h4>
                    <textarea className='posttext' onChange={(e) => setPost(e.target.value)}></textarea>
                    <h4>Product Type:-</h4>
                    <select className='type' onChange={(e) => setType(e.target.value)}>
                        <option value="">Type</option>
                        <option value="Physical Product">Physical Product</option>
                        <option value="Digital Product">Digital Product</option>
                    </select>
                    <h4>Product Link:-</h4>
                    <input type="text" placeholder='Link' className='productlink' onChange={(e) => setLink(e.target.value)} />

                    <img src={previewUrl || pic} alt='logo' className='postimg' />
                    <input type="file" accept='image/*' onChange={handleImageChange} />

                </div>
                <button className='postbtn' onClick={postupload} id='addbtn' >Add Product</button>
                {/* Conditionally render CircularProgress while uploading */}
                {isUploading && <LinearProgress />}
            </div>
        </>
    );
}

export default Product;

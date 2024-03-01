import React, { useEffect, useState } from 'react';
import '../Css/Createpost.css';
import pic from '../Images/profilesample.jpg';
import { toast } from 'react-toastify';
import { DeleveryContext } from '../store.js';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
function Createpost() {
    const [post, setPost] = useState('');
    const [postImg, setPostImg] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const [postType, setPostType] = useState(''); // Default type is 'normal'
    const [isUploading, setIsUploading] = useState(false); // State to manage the upload process
    const { user1 } = DeleveryContext();
    useEffect(() => {
        if (!localStorage.getItem('Token')) {
            window.location.href = '/login';
        }
        if (imgUrl) {
            postupload();
        }
    }, [imgUrl]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setPostImg(file);
        setPreviewUrl(URL.createObjectURL(file)); // Set preview URL for image
    };

    const sharePost = async () => {
       if(postImg){
        try {
            setIsUploading(true); // Start the upload process
            // Upload image to Cloudinary
            const formData = new FormData();
            formData.append("file", postImg);
            formData.append("upload_preset", "innovest");
            formData.append("cloud_name", "djain");

            const cloudinaryResponse = await fetch("https://api.cloudinary.com/v1_1/djain/image/upload", {
                method: "POST",
                body: formData
            });

            if (!cloudinaryResponse.ok) {
                const cloudinaryData = await cloudinaryResponse.json();
                console.log(cloudinaryData);
                toast.error("Error uploading image. Please try again later.");
            } else {
                const cloudinaryData = await cloudinaryResponse.json();
                // Update state with uploaded image URL
                setImgUrl(cloudinaryData.url);
                // toast.success("Image uploaded successfully.");
            }
        } catch (error) {
            console.error("Error sharing post:", error);
            toast.error("Error sharing post. Please try again after some seconds.");
        } finally {
            setIsUploading(false); // End the upload process
        }
       }else{
        postupload();
       }
    };

    const postupload = async () => {
        try {
            setIsUploading(true); // Start the upload process
            // Send post data to backend
            const postDataResponse = await fetch("http://localhost:9000/createpost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("Token")}`,
                },
                body: JSON.stringify({
                    post,
                    postimg: imgUrl,
                    type: postType, // Include the type of post
                }),
            });

            if (!postDataResponse.ok) {
                const errorData = await postDataResponse.json();
                console.error("Post failed:", errorData);
                toast.error(errorData.message);
            } else {
                const responseData = await postDataResponse.json();
                console.log(responseData);
                toast("Post Shared Successfully");
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
                    <img src={pic} alt='logo' className='pic' />
                    <h1 className='postusername'>{user1.name}</h1>
                </div>
                <div className='postbody'>
                <h4>Description:-</h4>
                    <textarea className='posttext' onChange={(e) => setPost(e.target.value)}></textarea>
                    <select className='postselect' value={postType} onChange={(e) => setPostType(e.target.value)}>
                        <option value="">Select Post Type</option>
                        <option value="Normal">Normal</option>
                        <option value="Blog Post">Blog Post</option>
                        <option value="Collabration Post">Collabration Post</option>
                    </select>
                    <img src={previewUrl || pic} alt='logo' className='postimg' />
                   
                    <input type="file" accept='image/*' onChange={handleImageChange} />
                   
                </div>
                <button className='postbtn' onClick={sharePost} >Share Post</button>
                {/* Conditionally render CircularProgress while uploading */}
                <br/>
                {isUploading && <LinearProgress />}
            </div>
        </>
    );
}

export default Createpost;

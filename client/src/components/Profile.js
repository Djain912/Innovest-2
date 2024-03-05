import React, { useEffect, useState } from 'react';
import css from "../Css/Profile.css"
import { NavLink, useAsyncValue } from 'react-router-dom';
import profileimg from "../Images/profilesample.jpg"
import { DeleveryContext } from '../store.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Legend, Tooltip } from "recharts";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Fab from '@mui/material/Fab';

import EditIcon from '@mui/icons-material/Edit';

function Profile() {

    const [mypost, setMyPosts] = useState([]);
    const { user1 } = DeleveryContext();
    const [profile, setProfile] = useState({
        name: user1 ? user1.name : "",
        email: user1 ? user1.email : "",
        phone: user1 ? user1.phone : "",
        role: user1 ? user1.role.toLowerCase() : "", // Ensure lowercase role
        about: user1 ? user1.about : "",
        skill: user1 ? user1.ssi : "",
        website: user1 ? user1.website : "",
        fb: user1 ? user1.fb : "",
        twitter: user1 ? user1.twitter : "",
        insta: user1 ? user1.insta : "",
        image: user1 ? user1.image : "",
        round: user1 ? user1.round : "",
    });

    const [ppimg, setppimg] = useState();

    useEffect(() => {
        if (!localStorage.getItem('Token')) {
            window.location.href = '/login';
        }
        if (ppimg) {
            handleImageChange();
        }
        myposts();
        mypr(); 
        getRound();
    }, [profile, ppimg]);

    const navigate = useNavigate();

    const [userData, setUserData] = useState(true);
    if (userData && user1) {
        setProfile({
            name: user1.name,
            email: user1.email,
            phone: user1.phone,
            role: user1.role, // Ensure role is lowercased
            about: user1.about,
            skill: user1.ssi,
            website: user1.website,
            fb: user1.fb, // Change from user1.fb to user1.facebook
            twitter: user1.twitter,
            insta: user1.insta, // Change from user1.insta to user1.instagram
            image: user1.image, // Assign existing image data if available
            rounds: user1.round
        });
        setUserData(false);
    }

    let Postdata = async (e) => {
        e.preventDefault();

        const { name, email, phone, role, about, skill, website, fb, twitter, insta, image, pdf } = profile;

        try {
            let res = await fetch("http://localhost:9000/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name, email, phone, role, about, ssi: skill, website, fb, twitter, insta, image, pdf
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("Upadatation failed:", errorData);
                toast.error(errorData.message);
            } else {
                const resdata = await res.json();
                console.log(resdata, profile);
                toast("Profile Updated Successfully");
                window.location.reload();
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    const handleInputChange = (e) => {
        document.getElementById('editbtn').disabled = false;
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value
        });
    };

    const handleFileUpload = async (e) => {
        try {
            document.getElementById('editbtn').disabled = true;
            const file = e.target.files[0];
            setppimg(file);
        } catch (error) {
            console.error("Error handling file upload:", error);
            toast.error("Error handling file upload. Please try again later.");
        }
    };

    const handleImageChange = async () => {
        try {
            // Upload image to Cloudinary
            const formData = new FormData();
            formData.append("file", ppimg);
            formData.append("upload_preset", "innovest");
            formData.append("cloud_name", "djain");
            document.getElementById('editbtn').style.color = "gray";

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
                console.log(cloudinaryData);
                setppimg("");
                // Update state with uploaded image URL
                setProfile({
                    ...profile,
                    image: cloudinaryData.url
                })
                document.getElementById('editbtn').style.color = "white";
                document.getElementById('editbtn').disabled = false;
                toast.success("Image uploaded successfully.");
            }
        } catch (error) {
            console.error("Error sharing post:", error);
            toast.error("Error sharing post. Please try again after some seconds.");
        }
    };

    const myposts = async () => {
        try {
            const response = await fetch("http://localhost:9000/myposts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("Token")}`
                },
                body: JSON.stringify({
                    username: user1._id,
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Failed to fetch posts:", errorData);
            } else {
                const data = await response.json();
                setMyPosts(data);
            }

        } catch (err) {
            console.error(err);
        }
    };
    const [myproducts, setMyProducts] = useState([]);
    const mypr = async () => {
        try {
            const response = await fetch(`http://localhost:9000/myproduct/${user1._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("Token")}`
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Failed to fetch posts:", errorData);
            } else {
                const data = await response.json();
                setMyProducts(data);
                console.log(data);
            }

        } catch (err) {
            console.error(err);
        }
    };


    const updProfile = () => {
        document.getElementById('name').disabled = false;
        document.getElementById('email').disabled = false;
        document.getElementById('phone').disabled = false;
        document.getElementById('about').disabled = false;
        document.getElementById('skill').disabled = false;
        document.getElementById('website').disabled = false;
        document.getElementById('fb').disabled = false;
        document.getElementById('twitter').disabled = false;
        document.getElementById('insta').disabled = false;
        document.getElementById('image').disabled = false;
    };

    const delimg = async () => {
        try {
            const res = await fetch("http://localhost:9000/delpimg", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("Token")}`
                },
                body: JSON.stringify({
                    email: user1.email
                })

            })
            if (!res.ok) {
                const errorData = await res.json();
                console.error("Failed to Del img:", errorData);
                toast.error(errorData.message);
            } else {
                const data = await res.json();
                toast("Image Deleted Successfully");
                console.log(data);
                window.location.reload();
            }

        } catch (err) {
            console.error(err);
        }
    };

    const [roundt, setRoundT] = useState("");
    const [roundDesc, setRoundDesc] = useState("");
    const [roundInput, setRoundInput] = useState([]);

    const handleRoundInputChange = (e) => {
        setRoundInput(e.target.value);
    };

    const handleRoundTChange = (e) => {
        setRoundT(e.target.value);
    };

    const handleRoundDChange = (e) => {
        setRoundDesc(e.target.value);
    };

    const [rounds, setRounds] = useState([]);

    const addRound = async () => {
        try {
            const response = await fetch("http://localhost:9000/addround", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("Token")}`
                },
                body: JSON.stringify({
                    title: roundt,
                    roundBy: user1._id,
                    description: roundDesc,
                    value: roundInput
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Failed to fetch posts:", errorData);
                toast.error(errorData.message);
            } else {
                const data = await response.json();
                toast.success("Round Added Successfully");
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const getRound = async () => {
        try {
            const response = await fetch("http://localhost:9000/getround", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("Token")}`
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Failed to fetch rounds:", errorData);
            } else {
                const data = await response.json();
                const formattedData = data.map(round => ({
                    name: round.title,
                    value: round.value
                }));
                // console.log(formattedData);
                setRounds(formattedData);
                // console.log(rounds);
            }
        } catch (err) {
            console.error(err);
        }
    };
    const rv = [];

    for (let i = 0; i < rounds.length; i++) {
        rv.push(rounds[i]);
        // console.log(rv);
    }
    const [pdf, setPdf] = useState();
    const handlepdfUpload = (e) => {
        setPdf(e.target.files[0]);
    }
    const handlePdf = async (event) => {
        try {
            const formData = new FormData();
            formData.append("file", pdf);
            formData.append("upload_preset", "innovest");
            formData.append("cloud_name", "djain");
            formData.append("disposition", "attachment");

            const cloudinaryResponse = await fetch("https://api.cloudinary.com/v1_1/djain/raw/upload", {
                method: "POST",
                ContentType: "application/pdf",
                body: formData
            });

            if (!cloudinaryResponse.ok) {
                const cloudinaryData = await cloudinaryResponse.json();
                console.log(cloudinaryData);
                toast.error("Error uploading pdf. Please try again later.");
            } else {
                const cloudinaryData = await cloudinaryResponse.json();
                console.log(cloudinaryData);
                setPdf(cloudinaryData.url);
                console.log(pdf);
                toast.success("PDF uploaded successfully.");
                try {
                    const res = await fetch("http://localhost:9000/pdf", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("Token")}`
                        },
                        body: JSON.stringify({
                            email: user1.email,
                            pdf: cloudinaryData.url
                        })

                    })
                    if (!res.ok) {
                        const errorData = await res.json();
                        console.error("Failed to Del img:", errorData);
                        toast.error(errorData.message);
                    } else {
                        const data = await res.json();
                        toast("Successfully updated");
                        window.location.reload();
                        console.log(data);
                    }

                } catch (err) {
                    console.error(err);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    const delpost = async (postid) => {
        try {
            const res = await fetch("http://localhost:9000/delpost", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    postid: postid
                })

            })
            if (!res.ok) {
                const errorData = await res.json();
                console.error("Failed to Del img:", errorData);
                toast.error(errorData.message);
            } else {
                toast("Post Deleted Successfully");
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        }
    }
    const delpr = async (prid) => {
        try {
            const res = await fetch("http://localhost:9000/delproduct", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                   id: prid
                })

            })
            if (!res.ok) {
                const errorData = await res.json();
                console.error("Failed to Del img:", errorData);
                toast.error(errorData.message);
            } else {
                toast("Post Deleted Successfully");
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        }
    }
    
    const delPdf = async () => {
        try {
            const res = await fetch("http://localhost:9000/delpdf", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("Token")}`
                },
                body: JSON.stringify({
                    email: user1.email
                })

            })
            if (!res.ok) {
                const errorData = await res.json();
                console.error("Failed to delete PDF:", errorData);
                toast.error(errorData.message);
            } else {
                toast("PDF Deleted Successfully");
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <>
            <div className="profilecontainer">
                <Fab color="secondary" aria-label="edit">
                    <EditIcon onClick={updProfile} style={{ cursor: "pointer", fontSize: "3rem" }} />
                </Fab>

                <button className="editbtn" id="editbtn" onClick={Postdata} style={{ cursor: "pointer", fontSize: "1.5rem" }} >
                    <CheckCircleIcon fontSize='large' />  Update Profile
                </button>
                <div className='row1'>
                    <div className="profileimg" data-aos="zoom-out">
                        <img src={profile.image || profileimg} id="profileimg" className="profileimg" alt="profile" />
                    </div>
                    <div className='edit'>

                        <button className="editbtn" onClick={delimg} style={{ backgroundColor: "red", width: "fit-content", height: "fit-content", color: "white", fontSize: "1.5rem" }}><DeleteForeverIcon fontSize='large' /> Delete Profile Image</button>
                    </div>
                </div>
                <div className='updimg'>
                    <label htmlFor="image">Upload Image</label>
                    <input type="file" accept='image/*' name='image' id='image' onChange={handleFileUpload} disabled />
                </div>
                <div className='starter'>
                    <h3>Name:-</h3>
                    <input className='name' value={profile.name} id='name' name='name' onChange={handleInputChange} disabled />
                    <h3>Phone:-</h3>
                    <input className='phone' value={profile.phone} id='phone' name='phone' onChange={handleInputChange} disabled />
                    <h3>Email:-</h3>
                    <input className='email' value={profile.email} id='email' name='email' onChange={handleInputChange} disabled />
                    <h3>Role:-</h3>
                    <input className='role' value={profile.role} id='role' name='role' onChange={handleInputChange} disabled />
                </div>
                <div className='abthead'>
                    <h2>About</h2>
                </div>
                <div className='row2'>
                    <textarea disabled className="abtinput" type="textarea" value={profile.about} placeholder='About' id='about' name='about' onChange={handleInputChange} />
                </div>
                <div className='skillhead' >
                    <h2>Skills/Services/Interests</h2>
                </div>
                <div className='row3'>
                    <textarea placeholder="Skills/Service which you provide/Interests Ex:- IT/Web Dev etc.." className="abtinput" disabled type="textarea" value={profile.skill} id='skill' name='skill' onChange={handleInputChange} />
                </div>
                <div className='contacthead' >
                    <h2>Contact Details</h2>
                </div>
                <div className='row4'>
                    <div className='webdiv'>
                        <a href={profile.website} target="_blank" rel="noopener noreferrer">
                            <i class="fa-solid fa-magnifying-glass" style={{ fontSize: "2.5rem" }}></i>
                            <input className='website' disabled placeholder="Website" value={profile.website} id='website' name='website' onChange={handleInputChange} />
                        </a>
                    </div>
                    <div className='fbdiv'>
                        <a href={profile.fb} target="_blank" rel="noopener noreferrer">
                            <i class="fa-brands fa-facebook" style={{ color: "blue", fontSize: "2.5rem" }}></i>
                            <input className='fb' placeholder='Facebook' disabled value={profile.fb} id='fb' name='fb' onChange={handleInputChange} />
                        </a>
                    </div>
                    <div className='xdiv'>
                        <a href={profile.twitter} target="_blank" rel="noopener noreferrer">
                            <i class="fa-brands fa-x-twitter" style={{ color: "black", fontSize: "2.5rem" }}></i>
                            <input className='twitter' placeholder='Twitter' disabled value={profile.twitter} id='twitter' name='twitter' onChange={handleInputChange} />
                        </a>
                    </div>
                    <div className='instadiv'>
                        <a href={profile.insta} target="_blank" rel="noopener noreferrer">
                            <i class="fa-brands fa-instagram" style={{ color: "rgb(255, 0, 170)", fontSize: "2.5rem" }}></i>
                            <input className='insta' placeholder='Instagram' disabled value={profile.insta} id='insta' name='insta' onChange={handleInputChange} />
                        </a>
                    </div>
                </div>


                <div className='chart'>
                    <h2>Investment Rounds</h2>
                    <div>
                        <input type="text" placeholder='Enter About The Round' value={roundt} onChange={handleRoundTChange} />
                        {/* <input type="text" value={roundDesc} onChange={handleRoundDChange} /> */}
                        <input type="number" placeholder='Enter Amount' value={roundInput} onChange={handleRoundInputChange} />
                        <button className='rndbtn' onClick={addRound}>Add Round</button>
                    </div>
                    {rv.length === 0 ? null : <div className='piechart'>
                        <PieChart width={400} height={400} >
                            <Pie
                                dataKey="value"
                                isAnimationActive={true}
                                data={rv}
                                cx={200}
                                cy={200}
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            />
                            <Tooltip />
                        </PieChart>
                    </div>
                    }
                </div>
                

                {user1.pdf != null ?
    <div>
        <h2>Imp Doc</h2>
        <input accept='application/pdf' type="file" name='file' id='file' onChange={handlepdfUpload} />
        <button className='pdfbtn' onClick={handlePdf}>Upload Pdf</button>
        <a className='downloadbtn' target="_blank" href={user1.pdf} download>Download PDF</a>
        <button className="editbtn" onClick={delPdf} style={{ backgroundColor: "red", color: "white", marginLeft: "10px" }}><DeleteForeverIcon fontSize='large' /> Delete document</button>
        <embed src={user1.pdf} type="application/pdf" width="100%" height="600px" />
    </div> :
    <div>
        <h2>Imp Doc </h2>
        <input accept='application/pdf' type="file" name='file' id='file' onChange={handlepdfUpload} />
        <button className='pdfbtn' onClick={handlePdf}>Upload Pdf</button>
    </div>
}


                {mypost.length > 0 ? <div>
                    <h2>My Posts</h2 >
                    <div className='myposts' >
                        {mypost.map((post, index) => (

                            <div key={index} className='postprofile'>

                                <div className='postbodyprofile'>
                                    {post.photo ? <img src={post.photo} alt='logo' className='postimg' /> :
                                        <h1>{post.description}</h1>
                                    }
                                </div>
                                <button className="editbtn" onClick={() => delpost(post._id)} style={{ backgroundColor: "red", width: "fit-content", height: "fit-content", color: "white" }}><DeleteForeverIcon fontSize='large' /></button>
                            </div>

                        ))}
                    </div>
                </div> : null}
                {myproducts.length > 0 ? <div>
                    <h2>My Products</h2 >
                    <div className='myposts' >
                        {myproducts.map((pr, index) => (

                            <div key={index} className='postprofile'>

                                <div className='postbodyprofile'>
                                 <img src={pr.image } alt='logo' className='postimg' /> 
                                        <h1>{pr.description}</h1>
                                
                                </div>
                                <button className="editbtn" onClick={() => delpr(pr._id)} style={{ backgroundColor: "red", width: "fit-content", height: "fit-content", color: "white" }}><DeleteForeverIcon fontSize='large' /></button>
                            </div>

                        ))}
                    </div>
                </div> : null}
            </div>
        </>
    );
}

export default Profile;

import React, { useEffect, useState } from 'react';
import css from "../Css/Profile.css"
import { NavLink } from 'react-router-dom';
import profileimg from "../Images/profilesample.jpg"
import { DeleveryContext } from '../store.js';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { PieChart, Pie, Legend, Tooltip } from "recharts";


function Userprofile() {

    const { id } = useParams();
    const [mypost, setMyPosts] = useState([]);
    const [myproduct, setMyProducts] = useState([]);
    const { user1 } = DeleveryContext();
    const [profile, setProfile] = useState({
        name: "",
        phone: "",
        email: "",
        about: "",
        skill: "",
        website: "",
        fb: "",
        twitter: "",
        insta: "",
        image: ""
    });
    const navigate = useNavigate();
    const [userData, setUserData] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem('Token')) {
            window.location.href = '/login';
        }
        getprofile(); // Call getprofile function
        getRound();
    }, []);
    const [rounds, setRounds] = useState([]);

    const getprofile = async (userId) => { // Accept userId as parameter
        try {
            const res = await fetch(`http://localhost:9000/showprofile/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await res.json();
            console.log(data);
            setProfile(data.user)
            setMyPosts(data.posts)
            setMyProducts(data.products);

        } catch (err) {
            console.log(err)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value
        });
    };
    const getRound = async () => {
        try {
            // Fetch investment rounds data from the backend using the user ID from the URL
            const response = await fetch(`http://localhost:9000/getprofileround/${id}`); // Replace userId with the actual user ID
            if (!response.ok) {
                throw new Error('Failed to fetch investment rounds');
            }
            const data = await response.json();
            setRounds(data);
        } catch (error) {
            console.error('Error fetching investment rounds:', error);
        }
    };

    const rv = [];

    for (let i = 0; i < rounds.length; i++) {
        rv.push(rounds[i]);
        // console.log(rv);
    }


    return (
        <>
            <div className="profilecontainer">
                <div className='row1'>
                    <div className="profileimg">
                        <img src={profile.image || profileimg} id="profileimg" alt="profile" />
                    </div>
                </div>

                <div className='starter'>
                    <h3>Name:-</h3>
                    <input className='name' value={profile.name} id='name' name='name' disabled />
                    <h3>Phone:-</h3>
                    <input className='phone' value={profile.phone} id='phone' name='phone' disabled />
                    <h3>Email:-</h3>
                    <input className='email' value={profile.email} id='email' name='email' disabled />
                    <h3>Role:-</h3>
                    <input className='role' value={profile.role} id='role' name='role' disabled />
                </div>
                <div className='abthead'>
                    <h2>About</h2>
                </div>

                <div className='row2'>
                    <textarea disabled className="abtinput" type="textarea" value={profile.about}
                        placeholder='About' id='about' name='about'
                    />
                </div>

                <div className='skillhead'>
                    <h2>Skills/Services/Interests</h2>
                </div>

                <div className='row3'>
                    <textarea placeholder="Skills/Service which you provide/Interests Ex:- IT/Web Dev etc.." className="abtinput" disabled type="textarea" value={profile.ssi} id='skill' name='skill' onChange={handleInputChange} />
                </div>


                <div className='contacthead'>
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
                            <i class="fa-brands fa-x-twitter" style={{ fontSize: "2.5rem" }}></i>
                            <input className='twitter' placeholder='Twitter' disabled value={profile.twitter} id='twitter' name='twitter' onChange={handleInputChange} />
                        </a>
                    </div>
                    <div className='instadiv'>
                        <a href={profile.insta} target="_blank" rel="noopener noreferrer">
                            <i class="fa-brands fa-instagram" style={{ fontSize: "2.5rem" }}></i>
                            <input className='insta' placeholder='Instagram' disabled value={profile.insta} id='insta' name='insta' onChange={handleInputChange} />
                        </a>
                    </div>
                </div>
                {rv === "" ? <h4>No data</h4> :
                    <>
                        <div className='chart'>
                            <h2>Investment Rounds</h2>
                        </div>
                        <div>
                            <div className='piechart'>
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
                    </div>
                    </>
                        }
                        {
                            profile.pdf === " " ? (
                                <div className='nopdf'>No PDF</div>
                            ) : (
                                <>
                                    <h2>PDF</h2>
                                    <a className='downloadbtn' target="_blank" href={profile.pdf} download>Download PDF</a>
                                    <embed src={profile.pdf} type="application/pdf" width="100%" height="600px" />
                                </>
                            )
                        }

                        <h2>Posts</h2>
                        <div className='myposts'>

                            {mypost.map((post, index) => (
                                <div key={index} className='postprofile'>
                                    <div className='postbodyprofile'>
                                        {/* <p className='posttext'>{post.description}</p> */}
                                        <img src={post.photo} alt='logo' className='postimg' />
                                    </div>
                                </div>

                            ))}
                            
                        </div>
                        <h2>Products</h2>
                        <div className='myposts'>
                        {myproduct.map((pr, index) => (
                                <div key={index} className='postprofile'>
                                    <div className='postbodyprofile'>
                                        {/* <p className='posttext'>{post.description}</p> */}
                                        <img src={pr.image} alt='logo' className='postimg' />
                                    </div>
                                </div>

                            ))}
                        </div>
                      
                    </div>


            </>
            );
}

            export default Userprofile;

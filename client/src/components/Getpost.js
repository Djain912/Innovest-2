import React, { useEffect, useState } from 'react';
import pic from '../Images/profilesample.jpg';
import "../Css/Getpost.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { DeleveryContext } from '../store.js';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Plus from "../components/PlusBtn.js";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { AiFillPlusCircle } from "react-icons/ai";

function Getpost() {
    const { user1 } = DeleveryContext();
    const [posts, setPosts] = useState([]);
    const [liked, setLiked] = useState(false);
    const [cmt, setCmt] = useState();
    const [filterType, setFilterType] = useState(''); // State variable for selected type
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("Token")) {
            navigate("/login")
            // toast("Please Login First");
        }
        getPosts();
    }, [liked, cmt]);

    const getPosts = async () => {
        try {
            const response = await fetch("http://localhost:9000/getpost");
            const data = await response.json();
            setPosts(data);
        } catch (err) {
            console.log(err);
        }
    };

    const likepost = async (postId) => {
        try {
            const likeres = await fetch("http://localhost:9000/likepost", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("Token")}`
                },
                body: JSON.stringify({
                    postId
                })
            })
            if (!likeres.ok) {
                const errorData = await likeres.json();
                console.log(errorData);
            } else {
                setLiked(true);
                console.log("liked");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const unlikepost = async (postId) => {
        try {
            const likeres = await fetch("http://localhost:9000/unlikepost", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("Token")}`
                },
                body: JSON.stringify({
                    postId
                })
            })
            if (!likeres.ok) {
                const errorData = await likeres.json();
                console.log(errorData);
            } else {
                setLiked(false);
                console.log("unliked");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const makeCmt = async (cmt, postId) => {
        try {
            const comment = await fetch("http://localhost:9000/comments", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("Token")}`
                },
                body: JSON.stringify({
                    text: cmt,
                    username: user1._id,
                    postId
                })
            })
            if (!comment.ok) {
                const errorData = await comment.json();
                console.log(errorData);
            } else {
                toast("commented");
                window.location.reload();

            }
        } catch (err) {
            console.log(err);
        }
    }

    // Function to convert timestamp to readable format
    const formatTime = (timestamp) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'UTC'
        };
        const formattedDate = new Date(timestamp).toLocaleDateString('en-US', options);
        return formattedDate;
    };

    // Filter posts based on type
    const filteredPosts = filterType ? posts.filter(post => post.type === filterType) : posts;

    const collab = () => {
        navigate("/collab");
    }
    return (
        <div>
            <div className='Plus'>
                <AiFillPlusCircle className='addbtn' onClick={() => navigate("/createpost")}></AiFillPlusCircle>
            </div>

            {/* Dropdown menu to select type */}
            <div className='dropdowndiv' style={{ textAlign: 'left',margin:"2rem" }} >
                <FormControl style={{ width: '20rem' }}>
                    <InputLabel id="demo-simple-select-label" style={{ fontSize: '1rem' }}>Post Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filterType}
                        label="Post Type"
                        onChange={(e) => setFilterType(e.target.value)}
                       
                    >
                        <MenuItem value=""  style={{ fontSize: '2rem' }}>All Types</MenuItem>
                        <MenuItem value="Blog Post"  style={{ fontSize: '2rem' }}>Blog</MenuItem>
                        <MenuItem value="Collabration Post"  style={{ fontSize: '2rem' }}>Collab</MenuItem>
                        <MenuItem value="Normal"  style={{ fontSize: '2rem' }}>Normal</MenuItem>
                    </Select>
                </FormControl>
            </div>

            {filteredPosts.map((post, index) => (
                <div key={index} className='getpostdiv' data-aos="fade-up">
                    <div className='posthead'>
                        < a href={`/showprofile/${post.username._id}`} style={{ textDecoration: 'none', color: 'black' }} >
                            <img src={post.username.image ? post.username.image : pic} alt='logo' className='pic' />
                        </a>
                        <h1 className='postusername'>
                            < a href={`/showprofile/${post.username._id}`} style={{ textDecoration: 'none', color: 'black' }} >
                                {post.username.name}
                            </a>
                        </h1>
                    </div>
                    <div className='postbody'>
                        <p className='posttext'>{post.description}</p>
                        {post.photo && <img src={post.photo} alt='post' className='postimg' />}
                    </div>
                    {post.type === "Collabration Post" && (
                        <button className='collabbtn' onClick={collab}>Collab</button>
                    )}
                    <div className='like'>
                        {post.likes.includes(user1._id) ? <button className='unlikebtn' onClick={() => unlikepost(post._id)}><FavoriteIcon fontSize="larger" /></button> :
                            <button className='likebtn' onClick={() => likepost(post._id)}><FavoriteBorderIcon fontSize="larger" /></button>}
                        <p className='likecount'>{post.likes.length}Likes</p>
                    </div>
                    <p className='posttime'>Posted on:- {formatTime(post.createdAt)}</p>
                    {post.comments.length > 0 && (
                        <>
                            <button class="btn btn-primary cmtbtn" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                Show all Comments ....
                            </button>
                            <div class="collapse" id="collapseExample" style={{ width: "100%", marginTop: "1rem" }}>
                                <div class="card card-body">
                                    {post.comments.map((commentObj, index) => (
                                        <p key={index}>{index + 1}.{commentObj.comment}</p>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                    <div className='comment'>
                        <input type="text" placeholder='Comment' className='commentinput' onChange={(e) => setCmt(e.target.value)} />
                        <button className='commentbtn' onClick={() => makeCmt(cmt, post._id)}><ArrowUpwardIcon fontSize='large' /></button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Getpost;

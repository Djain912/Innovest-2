import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiFillPlusCircle } from "react-icons/ai";


function Liveget() {
    const [live, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem("Token")){
            navigate("/login")
            // toast("Please Login First");
        }
       getLive(); 
    }, []);

    const getLive = async () => {
        try {
            const response = await fetch("http://localhost:9000/liveget",{
                method: "GET",
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Failed to fetch posts:", errorData);
            } else {
                const data = await response.json();
                setData(data);
                console.log(live);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
        <div className='Plus'>
                    <AiFillPlusCircle className='addbtn' onClick={() => navigate("/live")}></AiFillPlusCircle>
                </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
        {live.length === 0 && <h1 style={{ fontSize: "5rem"}}>No live streams now</h1>}
            {live.map((live) => (
                <div className="card" style={{width: "90%", fontSize: "2rem", margin: "2rem" }}>
                    <div className="card-body">
                        <h5 className="card-title" style={{ fontSize: "3rem" }}>Live</h5>
                        <p className="card-text">{live.desc}</p>
                        <a style={{ fontSize: "1.5rem" }} href={live.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" >Join Live Stream</a>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
}

export default Liveget;

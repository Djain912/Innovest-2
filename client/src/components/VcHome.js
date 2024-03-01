import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

 const VcHome= ()=>{
    const [roomCode, setRoomCode] = useState("");
    const navigate = useNavigate();

    const handleFormSubmit =(ev)=>{
        ev.preventDefault();
        navigate(`/vcroom/${roomCode}`);
    };
    return(
        <div className="main-homepage">
        <div className="home-page">
            <form onSubmit={handleFormSubmit} className="form">
                <div>
                    <label>Enter Room Code</label>
                    <input className="videocall-input" value={roomCode} onChange={(e)=> setRoomCode(e.target.value)} type="text" required placeholder="Enter Room Code" />
                </div>
                <button className="videocall-btn" type="submit">Enter Room</button>
            </form>
        </div>
        </div>
    );
 };
 export default VcHome;
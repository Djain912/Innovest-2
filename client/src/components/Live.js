import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Live() {
    const [roomID, setRoomId] = useState('');
    const [roomdesc, setroomdesc] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem("Token")){
            navigate("/login")
            toast("Please Login First");
        }
    })
    const handleRandomID = () => {
        let result = '';
        const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
        const maxPos = chars.length;
        const len = 6;
        for (let i = 0; i < len; i++) {
            result += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        setRoomId(result);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // navigate(`/room/${roomID}`);
        try {
            const response = await fetch(`http://localhost:9000/live`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   id: roomID,
                   desc:roomdesc
                }),
            });
           if (!response.ok) {
                const errorData = await response.json();
                console.error("Failed to fetch posts:", errorData);
                toast.error(errorData.message);
            } else {
                const data = await response.json();
                console.log(data);
                navigate(`/room/${roomID}`);
                toast.success("Room Created Successfully");
            }
           
        } catch (error) {
            console.error('Error:', error);
        }

    };

    const handleInputChange = (e) => {
        setRoomId(e.target.value);
    };
    const handleInputChange1 = (e) => {
        setroomdesc(e.target.value);
    };

    return (
        <div className='container'>
            <div className="room">
                <div className='form'>
                    <form onSubmit={handleSubmit}>
                        <div className='Text'>Enter Room ID:</div>
                        <div className='Input'>
                            <input
                                type='text'
                                required
                                value={roomID}
                                onChange={handleInputChange}
                                onKeyDown={(e) => {
                                    if (e.key === 'Backspace') {
                                        setRoomId('');
                                    }
                                }}
                                style={{border: '1px solid black'}}
                            />
                        </div>
                        <input
                                type='text'
                                required
                                value={roomdesc}
                                onChange={handleInputChange1}
                                style={{border: '1px solid black'}}
                            />
                        <button type='button' onClick={handleRandomID}>Generate Random ID</button>
                        <button type='submit' >Stream</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Live;

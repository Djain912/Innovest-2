import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

function randomID(len) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
        maxPos = chars.length,
        i;
    len = len || 5;
    for (i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
}

export function getUrlParams(
    url = window.location.href
) {
    let urlStr = url.split('?')[1];
    return new URLSearchParams(urlStr);
}

export default function App() {
    const roomID = getUrlParams().get('roomID') || randomID(5);
    let role_str = getUrlParams(window.location.href).get('role') || 'Host';
    const role =
        role_str === 'Host'
            ? ZegoUIKitPrebuilt.Host
            : role_str === 'Cohost'
                ? ZegoUIKitPrebuilt.Cohost
                : ZegoUIKitPrebuilt.Audience;

    let sharedLinks = [];
    if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
        sharedLinks.push({
            name: 'Join as co-host',
            url:
                window.location.protocol + '//' +
                window.location.host + window.location.pathname +
                '?roomID=' +
                roomID +
                '&role=Cohost',
        });
    }
    sharedLinks.push({
        name: 'Join as audience',
        url:
            window.location.protocol + '//' +
            window.location.host + window.location.pathname +
            '?roomID=' +
            roomID +
            '&role=Audience',
    });
    // generate Kit Token
    const appID = 1568932711;
    const serverSecret = "553778914efbe4d818e2b4f145cca25f";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));


    // start the call
    let myMeeting = async (element) => {
             // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        // start the call
         zp.joinRoom({
            
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.LiveStreaming,
                config: {
                    role,
                },
            },
            sharedLinks,
      
    })
    
}
const handleJoinClick = async () => {
    try {
        const links = sharedLinks[1].url;
        const response = await fetch('http://localhost:9000/room', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: window.location.href.split('/room/')[1],
                link:links
            }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Failed to update room link:", errorData);
            toast.error(errorData.message);
        } else {
            const data = await response.json();
            console.log(data);
            toast.success("Link Updated Successfully");
        }
    } catch (e) {
        console.log(e);
    }
};

    return (
      <div style={{textAlign: 'center'}}>
      <button id='updBtn'
     style={{fontSize: '2rem', margin: '0rem 0rem', backgroundColor: '#2424ff', color: 'white', padding: '1rem', border: 'none', borderRadius: '1rem', cursor: 'pointer'}}
     onClick={handleJoinClick}>Provide Live link To everyone</button>
        <div
            className="myCallContainer"
            ref={myMeeting}
            style={{ width: '100vw', height: '100vh' }}
        ></div>
        
        </div>
    );
}


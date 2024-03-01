import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Vcroom = ()=>{
    const {roomId} = useParams();

    const myMeeting = async(element)=>{
        const appID = 1850917822;
        const serverSecret = "b9f69a696f7360691429797cd934bae1";
        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId,Date.now().toString(),"sahil");
       
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                  name: 'Copy link',
                  url:
                   window.location.protocol + '//' + 
                   window.location.host + window.location.pathname +
                    '?roomID=' +
                    roomId,
                },
              ],
            scenario:{
                mode: ZegoUIKitPrebuilt.GroupCall,
            }
        });
    };
    return(
        <>
            <div className="room-page">
            <div ref={myMeeting}/>
            </div>
        </>
    );
};
export default Vcroom;
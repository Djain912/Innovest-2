import React, { useEffect, useState, useRef } from 'react';
import "../Css/Record.css";
import { NavLink } from 'react-router-dom';


const ScreenRecord = () => {
    const [log, setLog] = useState("");
    const previewRef = useRef(null);
    const recordingRef = useRef(null);
    const startButtonRef = useRef(null);
    const stopButtonRef = useRef(null);
    const downloadButtonRef = useRef(null);
    const [recording, setRecording] = useState(null);
    let recorder;
    let prlink = ""; // Changed var to let for consistency
    let decodedLink = "";

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const fullLink = searchParams.get('link');
        // Decode the fullLink to handle special characters properly
        decodedLink = decodeURIComponent(fullLink);
        console.log(decodedLink);
        // Now you can use the decoded link
        prlink = decodedLink;
        console.log(prlink);
    }, [window.location.search]);

    const logMessage = (msg) => {
        setLog((prevLog) => prevLog + msg + "\n");
    };

    const startRecording = async () => {
        try {
            setLog("Recording...\n");
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100,
                },
            });
            previewRef.current.srcObject = stream;
            previewRef.current.captureStream =
                previewRef.current.captureStream || previewRef.current.mozCaptureStream;

            await new Promise((resolve) => {
                previewRef.current.onplaying = resolve;
            });

            recorder = new MediaRecorder(stream);
            let data = [];

            recorder.ondataavailable = (event) => data.push(event.data);
            recorder.start();
            setRecording(recorder);
            recorder.onstop = () => {
                const recordedBlob = new Blob(data, { type: "video/webm" });
                recordingRef.current.src = URL.createObjectURL(recordedBlob);
                downloadButtonRef.current.href = recordingRef.current.src;
                downloadButtonRef.current.download = "RecordedVideo.webm";
                setRecording(null);
                logMessage(
                    `Successfully recorded ${recordedBlob.size} bytes of ${recordedBlob.type} media.`
                );
            };
        } catch (error) {
            logMessage(error);
        }
    };

    const stopRecording = () => {
        if (recording && recording.state === "recording") {
            recording.stop();
            previewRef.current.srcObject.getTracks().forEach((track) => track.stop());
            // window.location.href = "/testform";
        }
    };

    return (
        <div>
            <div className="Screen-Container">
                <div className="Screen-Record-row">
                    <div className="Screen-Record-Col1">
                        <h2>Preview</h2>
                        <video
                            autoPlay
                            muted
                            className="preview"
                            ref={previewRef}
                            width="300"
                            height="200"
                        ></video>
                        <br />
                        <button
                            ref={startButtonRef}
                            className="start-screen-record-btn"
                            onClick={startRecording}
                            disabled={recording !== null}
                        >
                            <span className="start-screen-record-text">Start Recording</span>
                        </button>
                        <button
                            ref={stopButtonRef}
                            className="stop-screen-record-btn"
                            onClick={stopRecording}
                            disabled={recording === null}
                        >
                            <span className="stop-screen-record-text">Stop Recording</span>
                        </button>
                        <pre className="log-screen-record">{log}</pre>
                    </div>
                    <div className="Screen-Record-Col2">
                        <h2 className="Download-h2">Download</h2>
                        <video
                            ref={recordingRef}
                            className="download-screen-record"
                            width="300"
                            height="200"
                            controls
                        ></video>
                        <br />
                        <a className="Download-screen-record-link" ref={downloadButtonRef}>
                            <button className="button-download">
                                <span className="button-content">Download </span>
                            </button>
                        </a>
                    </div>
                </div>
            </div>
                {/* <div className='xxx'>
                
                    <NavLink className="linkbtn" to={"/testform"} onClick={() =>console.log(prlink)} target='_blank' rel="noopener noreferrer">View Product</NavLink>
                </div> */}
        </div>
    );
};

export default ScreenRecord;

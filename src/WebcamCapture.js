import React from 'react'
import Webcam from 'react-webcam';
import { useRef } from 'react';
import { RadioButtonUnchecked } from '@mui/icons-material';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setCameraImage } from './features/cameraSlice';
import { useNavigate } from 'react-router-dom';
import './WebcamCapture.css'

const videoConstraints={
    width:250,
    height:400,
    facingMode: 'user',
}
const WebcamCapture = () => {
    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const capture = useCallback(()=>{
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
        navigate('/preview')
    },[webcamRef]);
  return <div className="webcamCapture">
    <Webcam
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        screenshotFormat='image/jpeg'
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
    />
    <RadioButtonUnchecked className='webcamCapture_button' onClick={capture}/>
    
  </div>;
}

export default WebcamCapture
import React, { useEffect } from 'react'
import './Preview.css'
import { useDispatch, useSelector } from 'react-redux'
import { resetCameraImage, selectCameraImage } from './features/cameraSlice'
import { useNavigate } from 'react-router-dom'
import { AttachFile, Close, Create, Crop, MusicNote, Note, Send, TextFields, Timer } from '@mui/icons-material'
import { v4 as uuid } from 'uuid'
import { db, storage } from './firebase'
import firebase from "firebase/compat/app";
import { selectUser } from './features/appSlice'
const Preview = () => {
    const cameraImage = useSelector(selectCameraImage);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(()=>{
        if(!cameraImage){
            navigate('/')
        }
    },[cameraImage ,navigate]);

    const closePreview =()=>{
        dispatch(resetCameraImage());
        navigate('/');
    }
    const sendPost = ()=>{
        const id = uuid();
        const uploadTask = storage.ref(`posts/${id}`).putString(cameraImage, 'data_url');
        uploadTask.on('state_changed', null, (error)=>{
            console.log(error);
        }, ()=>{
            storage.ref('posts').child(id).getDownloadURL().then((url)=>{
                db.collection('posts').add({
                    imageUrl: url,
                    username: user.username,
                    read: false,
                    profilePic: user.profilePic,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
                navigate('/chats');
            })
        })
    }
  return (
    <div className="preview">
      <Close onClick={closePreview} className="preview_close" />
      <div className="preview_toolbarRight">
        <TextFields />
        <Create />
        <Note />
        <MusicNote />
        <AttachFile />
        <Crop />
        <Timer />
      </div>
      <img src={cameraImage} alt="" />

      <div onClick={sendPost} className="preview_footer">
        <h2>Send Now</h2>
        <Send fontSize="small" className="preview_send" />
      </div>
    </div>
  );
}

export default Preview
import React from 'react'
import './Chat.css'
import { Avatar } from '@mui/material'
import { StopRounded } from '@mui/icons-material'
import ReactTimeago from 'react-timeago'
import { useDispatch } from 'react-redux'
import { selectImage } from './features/appSlice'
import { db } from './firebase'
import { useNavigate } from 'react-router-dom'
const Chat = ({id ,profilePic ,username , timestamp ,imageUrl ,read}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const open = ()=>{
        if(!read){
            dispatch(selectImage(imageUrl));
            db.collection('posts').doc(id).set({
                read:true,
            },{merge: true});
            navigate('/chats/view')
        }
    };
  return (
    <div onClick={open} className='chat'>
        <Avatar className='chat_avatar' src={profilePic}/>
        <div className="chat_info">
            <h4>{username}</h4>
            <p>{!read && "Tap to view -"}{' '}<ReactTimeago date= {new Date(timestamp?.toDate()).toUTCString()}/> </p>
        </div>
        {!read && <StopRounded className='chat_read'/>}
    </div>
  )
}

export default Chat
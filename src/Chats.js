import React from 'react'
import './Chats.css'
import { Avatar } from '@mui/material'
import { ChatBubble, RadioButtonUnchecked, Search } from '@mui/icons-material'
import { useState } from 'react'
import { useEffect } from 'react'
import { auth, db } from './firebase'
import Chat from './Chat'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from './features/appSlice'
import { useNavigate } from 'react-router-dom'
import { resetCameraImage } from './features/cameraSlice'
const Chats = () => {
    const [posts,setPosts] = useState([]);
    const user = useSelector(selectUser);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>setPosts(snapshot.docs.map(doc=>({
            id: doc.id,
            data: doc.data(),
        }))))
    },[])
    const takeSnap =()=>{
        dispatch(resetCameraImage())
        navigate('/');
    }
  return (
    <div className='chats'>
        <div className="chats_header">
            <Avatar src={user.profilePic} onClick={()=>auth.signOut()} className='chats_avatar'/>
            <div className="chats_search">
                <Search/>
                <input type="text" placeholder='Friends' />
            </div>
            <ChatBubble className='chats_chatIcon'/>
        </div>
        <div className="chat_posts">
            {posts.map(({id ,data:{profilePic ,username , timestamp ,imageUrl ,read}})=>(
                <Chat
                    key={id}
                    id={id}
                    username={username}
                    timestamp={timestamp}
                    imageUrl={imageUrl}
                    read={read}
                    profilePic={profilePic}
                />
            ))}
        </div>
        <RadioButtonUnchecked className='chats_takePic'
            onClick={takeSnap}
            fontSize='large'
        />
    </div>
  )
}

export default Chats
import React from 'react'
import './Login.css'
import { useDispatch } from 'react-redux'

import { Button } from '@mui/material'
import { auth, provider } from './firebase'
import { login } from './features/appSlice'
const Login = () => {
    
    const dispatch = useDispatch();
    const signIn = ()=>{
        auth.signInWithPopup(provider)
        .then(result=>{
            dispatch(login({
                username: result.user.displayName,
                profilePic: result.user.profileUrl,
                id:result.user.uid,
            }))
        }).catch((e)=>alert(e.msg));
    }
  return (
    <div className='login'>
        <div className="login_container">
        <img src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg" alt="" />
        <Button variant='outlined' onClick={signIn}>SIGN IN</Button>
        </div>
    </div>
  )
}

export default Login
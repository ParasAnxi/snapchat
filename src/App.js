import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "./firebase";
import ChatView from "./ChatView";
import WebcamCapture from "./WebcamCapture";
import Preview from "./Preview";
import Chats from "./Chats";
import { login, logout, selectUser } from "./features/appSlice";
import Login from "./Login";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      }else{
        dispatch(logout())
      }
    })
  },[])
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
          <img src="https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg" alt="" className='app_logo'/>
          <div className="app_body">
            <div className="app_bodyBackground">
            <Routes>
              <Route path="/" element={<WebcamCapture />} />
              <Route path="/preview" element={<Preview />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/chats/view" element={<ChatView />} />
            </Routes>
            </div>
          </div>
        </>
        )}
      </Router>
    </div>
    );
}

export default App;


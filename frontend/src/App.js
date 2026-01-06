import { Navigate, Route,Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import useCurrentUser from '../src/customHooks/useCurrentUser';
import Profile from './pages/Profile';
import Home from './pages/Home';
import { useSelector,useDispatch } from 'react-redux';
import useOtherUsers from './customHooks/useOtherUsers';
import { useEffect } from 'react';
import {io} from 'socket.io-client'
import { serverURL } from '.';
import { setOnlineUsers, setSocket, setUserData } from './redux/userSlice';

function App() {
  useCurrentUser()
  useOtherUsers()
  const {userData,socket,onlineUsers} = useSelector(state=>state.user)
  const dispatch = useDispatch()
  
 useEffect(()=>{
  if(userData){
    const socketio = io(`${serverURL}`,{
    query:{
      userId:userData?.user._id
    }
    })

  dispatch(setSocket(socketio))
  socketio.on('getOnlineUsers',(users)=>{
    dispatch(setOnlineUsers(users))
  })

  return ()=>{
    socketio.close()
  }
  }
  
 },[userData])
  return (
    <Routes>
        <Route path='/login' element={!userData?<Login />:<Navigate to="/"/>} />
        <Route path='/register' element={!userData?<Register />:<Navigate to='/profile'/>} />
        <Route path='/' element={userData?<Home /> : <Navigate to='/login'/>} />
        <Route path='/profile' element={userData?<Profile />:<Navigate to='/register'/>} />
    </Routes>
  );
}

export default App;

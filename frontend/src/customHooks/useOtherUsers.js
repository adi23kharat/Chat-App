import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { serverURL } from '..'
import { setOtherUserData } from '../redux/userSlice'
import axios from 'axios'

const useOtherUsers = () => {

  const dispatch = useDispatch()
  const {userData,otherUserData} = useSelector(state => state.user)

  useEffect(() => {
    const fetchUser = async () => {
      try {

        const response = await axios.get(`${serverURL}/user/other-user`,{ withCredentials: true })

        dispatch(setOtherUserData(response.data.users))

      } catch (err) {
        console.log(err)
      }
    }
      if(userData){
        fetchUser()
      }
  }, [dispatch,userData])

  return otherUserData
  
}



export default useOtherUsers 

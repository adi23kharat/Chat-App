import { useEffect } from "react"
import { serverURL } from ".."
import { useDispatch, useSelector } from "react-redux"
import { setUserData, setIsLoading } from "../redux/userSlice"
import axios from "axios"
 
const useCurrentUser = () => {
  const dispatch = useDispatch()
  const {userData} = useSelector(state => state.user)

  useEffect(() => {
    const fetchUser = async () => {
      try {

        const response = await axios.get(`${serverURL}/user/current-user`,{ withCredentials: true })

        dispatch(setUserData(response.data))

      } catch (err) {
        console.log(err)
      } finally {
        dispatch(setIsLoading(false))
      }
    }

    fetchUser()
  }, [dispatch])

  return userData
  
}

export default useCurrentUser

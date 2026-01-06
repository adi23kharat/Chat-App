import { useEffect } from "react";
import { serverURL } from "..";
import { useDispatch, useSelector } from "react-redux";
import { setMessageData } from "../redux/messageSlice";
import axios from "axios";

const useGetMessages = () => {
  const dispatch = useDispatch();

  const { selectedUserData,userData } = useSelector(state => state.user);
  const messageData = useSelector(state => state.message.messageData);

  useEffect(() => {
    if (!selectedUserData?._id) {
      dispatch(setMessageData([]));
      return;
    }

    // Clear previous messages immediately when user changes
    dispatch(setMessageData([]));

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${serverURL}/message/get/${selectedUserData._id}`,
          { withCredentials: true }
        );

        dispatch(setMessageData(response.data));
      } catch (err) {
        console.log(err);
      }
    };

    fetchMessages();
  }, [selectedUserData, userData, dispatch]);

  return messageData;
};

export default useGetMessages;

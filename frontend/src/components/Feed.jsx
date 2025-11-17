import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { addFeed } from '../Store/feedSlice';
import toast from 'react-hot-toast';


const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/feed`, { withCredentials: true })
      dispatch(addFeed(res?.data?.data));
      console.log(res.data.data)
    } catch (error) {
      toast.error("Feed fetch error:",error);
    }
  }

  useEffect(() => {
    getFeed();
  }, [])
  return (
    <div>
      feed
    </div>
  )
}

export default Feed

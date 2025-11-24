import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { addFeed } from '../Store/feedSlice';
import toast from 'react-hot-toast';
import UserCard from './UserCard';


const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/feed`, { withCredentials: true })
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
        toast.error(error?.response?.data);
    }
  }

  useEffect(() => {
     if (!feed || feed.length === 0) {
    getFeed();
  }
  }, []);

  if(!feed) return;

  if(feed.length <=  0 ) return <h1 className='text-center font-medium mt-5'>No new users found</h1>
  return (
    (feed && <div className='flex flex-col items-center px-4 justify-center top-8 relative'>
    <h1 className='text-xl font-semibold mb-5'>feed</h1>
      <UserCard user={feed[0]} />
    </div>)
  )
}

export default Feed

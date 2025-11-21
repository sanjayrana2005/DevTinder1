import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../Store/connectionsSlice';
import toast from 'react-hot-toast';

const Connsections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/connections`, { withCredentials: true })
      dispatch(addConnections(response?.data?.data));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0) {
    return <div className='text-center mt-5'>No connection found</div>
  }

  return connections && (
    <div className='h-screen flex flex-col gap-2 items-center p-4'>
      <h1 className='text-2xl mt-2 font-medium'>Connections</h1>
      <div className='w-full sm:w-1/2'>
      {
        connections.map((connection, index) => {
          const {firstName,lastName,age,gender,photoUrl,about}=connection;
          return (
            <div key={index} className='bg-blue-300 flex gap-2 mt-4 p-2 rounded w-full'>
              <div className='flex items-center'>
                <img src={photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="user photo" className='w-14 h-14 rounded-full object-cover' />
              </div>
              <div>
                <p className='font-medium text-xl'><span>{firstName}</span> <span>{lastName}</span></p>
                {(age || gender )&& <p><span>{age} years,</span> <span>{gender}</span></p>}
                {about && <p><span>{about}</span></p>}
              </div>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

export default Connsections

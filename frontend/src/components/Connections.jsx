import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../Store/connectionsSlice';
import toast from 'react-hot-toast';

const Connsections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections)

  const fetchConnections = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/connections`, { withCredentials: true })
      dispatch(addConnections(response?.data?.data));
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }  

  useEffect(() => {
    fetchConnections();
  }, []);

  if(connections.length === 0){
    return <div className='text-center mt-5'>No connection found</div>
  }

  return connections && (
    
    <div className='h-screen flex flex-col items-center gap-5 pt-10'>
      <h1 className='font-bold text-xl'>Connections</h1>
      <div className='w-full flex flex-col sm:flex-row gap-5 p-5 ' >
        {
        connections.map((connection, index) => {
          const { firstName, lastName, photoUrl, age,about,gender } = connection
          return (
            <div key={index} className='sm:w-1/5 mb-2 bg-blue-100 p-2 rounded-md'>
              <div className='flex flex-col items-center '>
                <div className='w-25 h-25 flex'>
                  <img src={photoUrl} alt="user photo" className='w-full h-full rounded-full object-cover' />
                </div>
                </div>
                <h1 className='mt-2 w-fit px-1 rounded-sm'><span>{firstName}</span> <span>{lastName}</span></h1>
                <p className='flex gap-3 mt-2'><span className='bg-blue-300 px-1 rounded-sm'>{age} years</span><span className='bg-blue-300 px-1 rounded-sm'>{gender}</span></p>
              <p className='bg-blue-300 mt-2 rounded-sm px-1'>{about}</p>
              </div>
          )
        })
      }
      </div>
    </div>
  )
}

export default Connsections

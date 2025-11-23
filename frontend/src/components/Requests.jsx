import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../Store/requests';
import toast from 'react-hot-toast';

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);

    const fetchRequests = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/requests/received`, { withCredentials: true });
            dispatch(addRequest(response?.data?.data));
        } catch (error) {
            toast.error(error?.message);
        }
    }

    const reviewRequest = async (status,_id) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/request/review/${status}/${_id}`,{},{withCredentials:true});
            toast.success(response?.data?.message);
            dispatch(removeRequest(_id))
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests || requests.length === 0) {
        return <div className='text-center mt-5'>No requests found</div>
    }

    return requests && (
        <div className='h-full flex flex-col gap-2 items-center p-4'>
            <h1 className='text-2xl mt-2 font-medium'>Requests</h1>
            <div className='w-full sm:w-1/2'>
                {
                    requests.map((request, index) => {
                        const {_id,fromUserId} = request;
                        const {firstName, lastName, age, gender, photoUrl, about } = fromUserId
                        return (
                            <div key={index} className='bg-blue-300 sm:flex gap-2 mt-4 p-2 rounded w-full'>
                                <div className='flex items-center'>
                                    <img src={photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="user photo" className='w-14 h-14 rounded-full object-cover' />
                                </div>
                                <div className='flex flex-col sm:flex-row justify-between'>
                                    <div>
                                        <p className='font-medium text-xl'><span>{firstName}</span> <span>{lastName}</span></p>
                                        {(age || gender) && <p><span>{age} years,</span> <span>{gender}</span></p>}
                                        {about && <p><span>{about}</span></p>}
                                    </div>
                                    <div className='mt-2 p-2'>
                                        <button onClick={()=> reviewRequest("rejected",_id)} className='bg-red-400 px-2 rounded-sm py-1 cursor-pointer hover:bg-red-500 transition-all duration-1 ml-1'>Reject</button>
                                        <button onClick={()=> reviewRequest("accepted",_id)} className='bg-green-400 px-2 rounded-sm py-1 cursor-pointer hover:bg-green-500 transition-all duration-1 ml-1'>Accept</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Requests

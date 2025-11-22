import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';

const UserCard = ({ user }) => {
    const { _id,firstName, lastName, age, gender, about, photoUrl } = user;

    const handleSendRequest =async (status,_id) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/request/send/${status}/${_id}`,{},{withCredentials:true})
            toast.success(res?.data?.message)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className="card bg-base-100 w-72 max-w-96 shadow-lg">
            <figure className='bg-base-300'>
                <img
                    src={photoUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6vBz9VgjksAaZZkWOm8Lk3ZSb7gO25eP0-Q&s"}
                    className='max-w-52 max-h-44'
                    alt="user photo" />
            </figure>
            <div className="card-body bg-sky-100 rounded-b-md">
                <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
                {
                    age && gender && <p className='flex gap-10'><span className='bg-gray-400 px-4 rounded-sm'>{age} years</span> <span className='bg-indigo-400 px-4 rounded-sm'>{gender}</span></p>
                }
                <p>{about}</p>
                <div className="card-actions justify-center mt-1">
                    <button onClick={() => handleSendRequest("ignored",_id)} className="btn btn-primary bg-red-600 opacity-80 border-none">Ignore</button>
                    <button onClick={() => handleSendRequest("interested",_id)} className="btn btn-primary bg-green-600 opacity-80 border-none">Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard

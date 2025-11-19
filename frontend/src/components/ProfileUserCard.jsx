import React, { use } from 'react'

const ProfileUserCard = ({ user }) => {
    const { firstName, lastName, age, gender, about, photoUrl,skills } = user;
    return (
        <div className="card bg-base-100 w-72 max-w-96 shadow-lg mt-2">
            <figure className='bg-base-300'>
                <img
                    src={photoUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6vBz9VgjksAaZZkWOm8Lk3ZSb7gO25eP0-Q&s"}
                    className='max-w-52 max-h-44'
                    alt="user photo" />
            </figure>
            <div className="rounded-b-md p-3">
            <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
             {
                    age && gender && <p className='flex gap-5 mb-1'>
                    <span className='bg-gray-400 px-4 py-1 rounded-sm'>{age} years</span> 
                    <span className='bg-indigo-400 px-4 py-1 rounded-sm'>{gender}</span>
                    </p>
                } 
                <p className='bg-gray-300 p-1 rounded-md overflow-auto scrollbar-hide mb-1'>{photoUrl}</p>
                <p className='bg-gray-300 p-1 rounded-md overflow-auto scrollbar-hide mb-1'>{about}</p>
                <p className='bg-gray-300 p-1 rounded-md mb-1'>{skills}</p>
            </div>
        </div>
        
    )
}

export default ProfileUserCard

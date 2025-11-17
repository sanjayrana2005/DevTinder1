import React, { use } from 'react'

const ProfileUserCard = ({ user }) => {
    const { firstName, lastName, age, gender, about, photoUrl } = user;
    return (
        <div className="card bg-base-100 w-72 max-w-96 shadow-lg mt-2">
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
            </div>
        </div>
    )
}

export default ProfileUserCard

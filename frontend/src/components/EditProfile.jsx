import axios from 'axios';
import React, { useState } from 'react'
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { aaddUser } from '../Store/userSlice';
import ProfileUserCard from './ProfileUserCard';

const EditProfile = ({user}) => {
     

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [photoUrl, setPhotoUrls] = useState(user.photoUrl);
    const [about, setAbout] = useState(user.about);
    const [skills, setSkills] = useState(user.skills);

    const dispatch = useDispatch();
    console.log(user);
    
    const handleSaveProfile = async () => {
        try {
            const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/profile/edit`, {
                firstName,lastName,age,gender,about,photoUrl,skills
            }, { withCredentials: true });
            console.log(response)
            const { data: responseData } = response;
            toast.success(responseData.message);
            dispatch(aaddUser(responseData.data));
        } catch (error) {
            console.log(error.response)
              toast.error(error?.response?.data);
        }
    }
    return (
        <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <div className='flex justify-center mt-2 px-4'>
            <div className="card card-border bg-gray-200 w-80">
                <div className="card-body">
                    <h2 className="card-title mx-auto">Edit Profile</h2>
                    <div className='flex flex-col'>
                        <label htmlFor="firstName" className='font-semibold cursor-pointer'>First Name</label>
                        <input
                            type="text"
                            id='firstName'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className='outline-none border-2 border-neutral-400 px-2 py-2 rounded mb-1'
                        />

                        <label htmlFor="lastName" className='font-semibold cursor-pointer'>Last Name</label>
                        <input
                            type="text"
                            id='lastName'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className='outline-none border-2 border-neutral-400 px-2 py-2 rounded mb-1'
                        />

                        <label htmlFor="age" className='font-semibold cursor-pointer'>Age</label>
                        <input
                            type="text"
                            id='age'
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className='outline-none border-2 border-neutral-400 px-2 py-2 rounded mb-1'
                        />

                        <label htmlFor="gender" className='font-semibold cursor-pointer'>Gender</label>
                        <input
                            type="text"
                            id='gender'
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className='outline-none border-2 border-neutral-400 px-2 py-2 rounded mb-1'
                        />

                        <label htmlFor="photoUrl" className='font-semibold cursor-pointer'>Photo URL</label>
                        <input
                            type="text"
                            id='photoUrl'
                            value={photoUrl}
                            onChange={(e) => setPhotoUrls(e.target.value)}
                            className='outline-none border-2 border-neutral-400 px-2 py-2 rounded mb-2'
                        />

                        <label htmlFor="skill" className='font-semibold cursor-pointer'>Skills</label>
                        <input
                            type="text"
                            id='skill'
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            className='outline-none border-2 border-neutral-400 px-2 py-2 rounded mb-2'
                        />

                        <label htmlFor="about" className='font-semibold cursor-pointer'>About</label>
                        <textarea value={about} id="about" className='outline-none border-2 border-neutral-400 rounded p-1 resize-none scrollbar-hide mb-1' rows={1} onChange={(e)=> setAbout(e.target.value)}/>
                    </div>

                    <div className="card-actions justify-center">
                        <button onClick={handleSaveProfile} className="btn bg-gray-600 border-2 border-gray-500 text-white hover:bg-gray-500 transition-all mt-2">Save Profile</button>
                    </div>
                </div>
            </div>
        </div>

        <ProfileUserCard user={{firstName,lastName,age,gender,about,photoUrl,skills}}/>
        </div>
    );
}

export default EditProfile;

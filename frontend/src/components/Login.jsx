import axios from 'axios';
import React, { useState } from 'react'
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { aaddUser } from '../Store/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("sanjay@gmail.com");
    const [password, setPassword] = useState("Sanjay@123");
    const [loggIn,setLoggIn] = useState(true);
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, {
                email,
                password
            }, { withCredentials: true });
            const { data: responseData } = response;
            toast.success(responseData.message);
            dispatch(aaddUser(responseData.data));
            navigate("/");
        } catch (error) {
              toast.error(error?.response?.data.message);
        }
    }

    const handleSignup = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/signup`,
            {
                firstName,
                lastName, 
                email,
                password
            },{withCredentials:true});
            toast.success(res?.data?.message);
            navigate("/profile");
            dispatch(aaddUser(res?.data?.data));
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)

        }
    }
    return (
        <div className='flex justify-center mt-20 p-2'>
            <div className="card card-border bg-gray-200 w-96">
                <div className="card-body">
                    <h2 className="card-title mx-auto">{loggIn ? "Login" : "Signup"}</h2>
                    <div className='flex flex-col'>
                    { !loggIn &&
                        <>
                        <label htmlFor="firstName" className='font-semibold cursor-pointer'>First Name</label>
                        <input
                            type="text"
                            id='firstName'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className='outline-none border-2 border-neutral-400 px-2 py-2 rounded'
                        />

                        <label htmlFor="lastName" className='font-semibold cursor-pointer'>Last Name</label>
                        <input
                            type="text"
                            id='lastName'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className='outline-none border-2 border-neutral-400 px-2 py-2 rounded'
                        />

                        </>
                    }
                        <label htmlFor="email" className='font-semibold cursor-pointer'>Email ID</label>
                        <input
                            type="text"
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='exapmle@gmail.com'
                            className='outline-none border-2 border-neutral-400 px-2 py-2 rounded'
                        />
                        <label htmlFor="password" className='font-semibold cursor-pointer mt-2'>Password</label>
                        <input
                            type="password"
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='outline-none border-2 border-neutral-400 px-2 py-2 rounded'
                        />
                    </div>

                    <div className="card-actions justify-center">
                        <button onClick={loggIn ? handleLogin : handleSignup} className="btn bg-gray-400 border-2 border-gray-400 text-white hover:bg-gray-500 transition-all mt-2">{loggIn ? "Login" : "Signup"}</button>
                    </div>
                    <p className='text-center cursor-pointer' onClick={()=>setLoggIn(!loggIn)}>{loggIn ? "New user? Signup" : "Already user? Login"}</p>
                </div>
            </div>
        </div>
    );
}

export default Login;

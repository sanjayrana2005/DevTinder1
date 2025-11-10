import axios from 'axios';
import React, { useState } from 'react'
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("sanjay@gmail.com");
    const [password, setPassword] = useState("Sanjay@123");

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, {
                email,
                password
            },{withCredentials:true});
            const { data: responseData } = response;
            toast.success(responseData.message)

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='flex justify-center mt-20 p-2'>
            <div className="card card-border bg-gray-200 w-96">
                <div className="card-body">
                    <h2 className="card-title mx-auto">Login</h2>
                    <div className='flex flex-col'>
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
                        <button onClick={handleLogin} className="btn bg-gray-400 border-2 border-gray-400 text-white hover:bg-gray-500 transition-all mt-2">Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

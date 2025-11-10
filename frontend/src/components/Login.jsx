import React from 'react'

const Login = () => {
    return (
        <div className='flex justify-center mt-20'>
            <div className="card card-border bg-gray-200 w-96">
                <div className="card-body">
                    <h2 className="card-title mx-auto">Login</h2>
                    <div className='flex flex-col'>
                        <label htmlFor="email" className='font-semibold cursor-pointer'>Email ID</label>
                        <input 
                        type="text" 
                        id='email' 
                        placeholder='Enter your email' 
                            className='outline-none border-2 border-neutral-400 px-2 py-2 rounded'
                        />
                        <label htmlFor="password" className='font-semibold cursor-pointer mt-2'>Password</label>
                        <input 
                        type="password" 
                        id='password' 
                        placeholder='Enter your email' 
                            className='outline-none border-2 border-neutral-400 px-2 py-2 rounded'
                        />
                    </div>

                    <div className="card-actions justify-center">
                        <button className="btn bg-gray-400 border-2 border-e-gray-400 text-white">Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

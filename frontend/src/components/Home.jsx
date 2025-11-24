import React, { use, useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { aaddUser } from '../Store/userSlice'
import toast from 'react-hot-toast'

const Home = () => {
 
  return (
     <div className="flex flex-col min-h-screen">
      {/* Navbar sticky */}
      <div className='sticky top-0 z-50'>
        <Navbar />
      </div>

      {/* Main content scrollable */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Footer at bottom */}
      <footer className="">
        <Footer />
      </footer>
    </div>
  );
}

export default Home;

import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { aaddUser } from '../Store/userSlice'
import toast from 'react-hot-toast'

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/profile/view`, { withCredentials: true })
      dispatch(aaddUser(res.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
        return;
      }
      toast.error(error?.response?.data || "Something went wrong while fetching user data")
    }
  }

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

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

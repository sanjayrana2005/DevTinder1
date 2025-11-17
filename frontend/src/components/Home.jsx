import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { aaddUser } from '../Store/userSlice'
import toast from 'react-hot-toast'

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


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
    fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Home;

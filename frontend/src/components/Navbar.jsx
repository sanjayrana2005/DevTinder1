import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../Store/userSlice';
import toast from 'react-hot-toast';
import axios from 'axios';

function Navbar() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogOut = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/logout`, {}, {
        withCredentials: true
      });
      dispatch(removeUser());
      setDropdownOpen(false);
      toast.success(res?.data?.message || "Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/profile/view`, { withCredentials: true })
      dispatch(aaddUser(res?.data?.data));
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/login");
        return;
      }
      
       toast.error(error?.response?.data || "Something went wrong while fetching user data")
    }
  }

  // useEffect(() => {
  //   if (!user) {
  //     fetchUser();
  //   }

  // }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="navbar bg-gray-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
      </div>
      <div className="flex gap-2">
        <div ref={dropdownRef} className="relative">
          <div
            className="btn btn-ghost btn-circle avatar"
            onClick={toggleDropdown}
          >
            {user && (
              <div className="w-10 rounded-full">
                <img
                  alt="user photo"
                  src={user?.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                />
              </div>
            )}
          </div>

          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 w-52 p-2 bg-base-100 rounded-box shadow menu menu-sm z-50">
              <li>
                <Link to="/profile" onClick={() => setDropdownOpen(false)}>Profile</Link>
              </li>
              <li>
                <Link to={"/connections"} onClick={() => setDropdownOpen(false)}>Connections</Link>
              </li>
              <li>
                <Link to={"/requests"} onClick={() => setDropdownOpen(false)}>Requests</Link>
              </li>
              <li>
                <Link to="/" onClick={handleLogOut}>Logout</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

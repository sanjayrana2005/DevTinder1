import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Profile from './components/Profile'
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}>
              <Route path='/login' element={<Login/>}/>
              <Route path='/profile' element={<Profile/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
       <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App

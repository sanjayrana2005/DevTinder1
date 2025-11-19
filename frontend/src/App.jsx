import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Profile from './components/Profile'
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux'
import appStore from './Store/appStore'
import Feed from './components/Feed'
import Connections from './components/Connections'

function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}>
              <Route path='/' element={<Feed />} />
              <Route path='/login' element={<Login />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/connections' element={<Connections />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App

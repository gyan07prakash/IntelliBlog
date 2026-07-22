import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import authService from "./appwrite/auth"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import { login, logout } from './store/authSlice'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch() //used to merge redux with react

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData){
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
      
    })
    .finally(() => setLoading(false))
  }, [])

  return !loading ?(
    <div className='min-h-sc flex flex-wrap content-between
    bg-gray-400'>
        <div className='w-full block'></div>
        <Header/>
        <main>
         TODO {/*outlet*/}
        </main>
        <Footer/>
      </div>
  ) : null
}

export default App

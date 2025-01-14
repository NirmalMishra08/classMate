import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import MarkAttendance from './Components/MarkAttendance'
import MainLayout from "./Components/MainLayout"

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
   <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]">
     <MainLayout/>
   </div>
    
    </>
  )
}

export default App

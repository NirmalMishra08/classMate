import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import MarkAttendance from './Components/MarkAttendance'

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
    
     {/* <SignUp/> */}
     {/* <Login/> */}
     <MarkAttendance/>
    </>
  )
}

export default App

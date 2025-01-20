
import './App.css'
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import MarkAttendance from './Components/MarkAttendance'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ViewAttendance from './Components/ViewAttendance'
import ViewSchedule from './Components/ViewSchedule'
import CreateSchedule from './Components/CreateSchedule'
import AttendanceSummary from './Components/AttendanceSummary'
import Layout from './Components/Layout'

function App() {

  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Layout />}>
            <Route path="mark-attendance" element={<MarkAttendance />} />
            <Route path="view-attendance" element={<ViewAttendance />} />
            <Route path="create-schedule" element={<CreateSchedule />} />
            <Route path="view-schedule" element={<ViewSchedule />} />
            <Route path="attendance-summary" element={<AttendanceSummary />} />
          </Route>


        </Routes>
      </BrowserRouter>
    </div>
    
    </>
  )
}

export default App

import { Register } from './pages/Register.jsx';
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import {Login} from "./pages/login.jsx"
import { About} from './pages/About.jsx';
import { Home } from './pages/Home.jsx';
import { CreateTicket } from './pages/CreateTicket.jsx';
import { MyTickets } from './pages/MyTickets.jsx';
import { TicketDetails } from "./pages/TicketDetails.jsx";
import { UpdateTicket } from "./pages/UpdateTicket.jsx"
import { ProtectedRoute } from "./pages/ProtectedRoute.jsx";
import { AdminDashboard } from "./pages/AdminDashboard.jsx";
import { AdminTicketDetails } from "./pages/AdminTicketDetails.jsx";


import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
  <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login/>} />
     <Route path="/home" element={<Home/>} />
     <Route path="/" element={<Home />} />
      <Route path="/about" element={<About/>} />
      
      <Route
  path="/ticket"
  element={
    <ProtectedRoute>
      <CreateTicket />
    </ProtectedRoute>
  }
/>

<Route
  path="/myticket"
  element={
    <ProtectedRoute>
      <MyTickets />
    </ProtectedRoute>
  }
/>

<Route
  path="/ticket/:ticketId"
  element={
    <ProtectedRoute>
      <TicketDetails />
    </ProtectedRoute>
  }
/>

<Route
  path="/update-ticket/:ticketId"
  element={
    <ProtectedRoute>
      <UpdateTicket />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/ticket/:ticketId"
  element={
    <ProtectedRoute>
      <AdminTicketDetails />
    </ProtectedRoute>
  }
/>

       


    
  </Routes>
</BrowserRouter>

    </>
  )
  
}

export {App}

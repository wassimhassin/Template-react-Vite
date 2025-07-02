import { buttonVariants } from "@/components/ui/button";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreationTicket from "./pages/CreationTicket";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import AdminInterface from "./pages/AdminInterface";
import Incidents from "./components/ticketsType/incidents";
import Demandes from "./components/ticketsType/Demandes";
import Reclamations from "./components/ticketsType/reclamations";
import ClosedTickets from "./components/ticketsType/closedTickets";


function App() {
  const [selectedTicket, setSelectedTicket] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  // To hide the sidebar on login page
  const hideSidebar = location.pathname === "/" || location.pathname === "/login";

  return (
    <div className="flex bg-gray-50 w-screen min-h-screen no-scrollbar">
      {!hideSidebar && (
        <Sidebar
          userInfo={{ name: "Agent Support", status: "En ligne" }}
          className="shadow-lg"
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />
      )}
      <div className="flex-1 transition-all duration-300 h-screen overflow-y-auto">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/creationTickets" element={<CreationTicket />} />
          <Route path="/adminInterface" element={<AdminInterface />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/Demandes" element={<Demandes />} />
          <Route path="/reclamations" element={<Reclamations />} />
          <Route path="/closedTickets" element={<ClosedTickets />} /> 
          <Route path="*" element={<div className="p-4 text-center text-gray-700">404 - Page not found</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
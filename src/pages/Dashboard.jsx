import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import FicheClient from "../components/FicheClient";
import DetailsTicket from "../components/DetailsTicket";
import HistoriqueTickets from "../components/HistoriqueTickets";

const Dashboard = () => {
  const [selectedTicket, setSelectedTicket] = useState(1);
  const [activeItem, setActiveItem] = useState('client');

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        activeItem={activeItem} 
        setActiveItem={setActiveItem}
        userInfo={{ name: "Agent Support", status: "En ligne" }}
        className="shadow-lg"
      />
      
      <div className="flex-1 overflow-auto p-6 gap-4 ">
        <div className="grid grid-cols-[repeat(5,_1fr)] grid-rows-[repeat(5,_1fr)] gap-x-0 gap-y-0">
          <FicheClient />
          <DetailsTicket ticketId={selectedTicket} />
          <HistoriqueTickets onSelect={setSelectedTicket} selectedTicket={selectedTicket} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
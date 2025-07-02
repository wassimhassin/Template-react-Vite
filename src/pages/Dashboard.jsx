import React, { useState } from "react";
import FicheClient from "../components/identificationClient/FicheClient";
import DetailsTicket from "../components/identificationClient/DetailsTicket";
import HistoriqueTickets from "../components/identificationClient/HistoriqueTickets";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Dashboard = () => {
  const [selectedTicket, setSelectedTicket] = useState(1);
  const [msisdn, setMsisdn] = useState("");
  const navigate = useNavigate();

  // Handler pour ouvrir la page de création de ticket avec le MSISDN
  const handleOpenTicket = () => {
    if (msisdn.trim() !== "") {
      navigate("/creationTickets", { state: { msisdn } });
    } else {
      toast.error("Veuillez entrer un MSISDN valide");
    }
  };

  return (
    <> 
    <ToastContainer
position="top-center"
autoClose={2000}
limit={2}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <div className="flex-1 p-2 sm:p-4 md:p-6 overflow-auto scrollbar-hide">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
          <FicheClient msisdn={msisdn} setMsisdn={setMsisdn} onOpenTicket={handleOpenTicket} />
          <HistoriqueTickets onSelect={setSelectedTicket} selectedTicket={selectedTicket} />
          <DetailsTicket ticketId={selectedTicket} />
        </div>
      </div>
    </div></>
   
  );
};

export default Dashboard;
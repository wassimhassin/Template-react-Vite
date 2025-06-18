import React from "react";
import { Ticket, User, AlertCircle, Mail, CheckCircle, Clock, MoreVertical } from "lucide-react";
import Card from "./Card";
import { Button } from "flowbite-react";



const DetailsTicket = ({ ticketId }) => {
  const ticketData = {
    1: {
      number: "C-123456",
      title: "Problème de connexion",
      client: "John Doe",
      message: "Je n'arrive pas à me connecter à mon réseau mobile depuis ce matin.",
      status: "Ouvert",
      priority: "Haute",
      created: "10/06/2024 09:30",
      assigned: "Agent Smith"
    }
  };

  const ticket = ticketData[ticketId] || ticketData[1];

  return (
    <div className="[grid-area:3_/_3_/_6_/_6]">
      <Card className="p-8 h-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Détail du ticket</h3>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <MoreVertical size={16} />
          </button>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-3">
            <Ticket className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Numéro</p>
              <p className="font-medium text-gray-900">{ticket.number}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Client</p>
              <p className="font-medium text-gray-900">{ticket.client}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Problème</p>
              <p className="font-medium text-gray-900">{ticket.title}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Message</p>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg mt-1">{ticket.message}</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h4 className="font-medium text-gray-900 mb-4 flex items-center text-xl">
            <Clock className="w-4 h-4 mr-2" />
            Timeline
          </h4>
          <div className="space-y-3 text-xl">
            <div className="flex items-center space-x-3 text-xl">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 text-xl">Ticket créé</p>
                <p className="text-[14px] text-gray-500 text-xl">{ticket.created}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-xl">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 text-xl">En cours de traitement</p>
                <p className="text-gray-500 text-[15px] text-light">11/06/2024 14:15</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DetailsTicket;
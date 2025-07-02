import React from "react";
import {  ChevronRight, Clock } from "lucide-react";
import Card from "../Card";
import Badge from "../Badge";

const HistoriqueTickets = ({ onSelect, selectedTicket }) => {
  const tickets = [
    { id: 1, number: "C-123456", title: "Problème de connexion", date: "10/06/2024", status: "open", priority: "high" },
    { id: 2, number: "C-654321", title: "Facturation", date: "05/06/2024", status: "closed", priority: "medium" },
    { id: 3, number: "C-789012", title: "Activation SIM", date: "08/06/2024", status: "in-progress", priority: "low" },
    { id: 4, number: "C-789012", title: "Activation SIM", date: "08/06/2024", status: "in-progress", priority: "low" },
    { id: 5, number: "C-789012", title: "Activation SIM", date: "08/06/2024", status: "in-progress", priority: "low" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "open": return <Badge variant="warning">Ouvert</Badge>;
      case "closed": return <Badge variant="success">Fermé</Badge>;
      case "in-progress": return <Badge variant="info">En cours</Badge>;
      default: return <Badge variant="default">Inconnu</Badge>;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "border-l-red-500";
      case "medium": return "border-l-yellow-500";
      case "low": return "border-l-green-500";
      default: return "border-l-gray-300";
    }
  };

  return (
    <div className="col-span-2">
      <Card className="p-4 sm:p-6 h-full w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
          <h3 className="text-lg font-semibold text-gray-900">Historique des tickets</h3>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">

            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => onSelect(ticket.id)}
              className={`p-4 border-l-4 ${getPriorityColor(ticket.priority)} bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors rounded-r-lg ${
                selectedTicket === ticket.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="font-medium text-gray-900">{ticket.number}</span>
                    {getStatusBadge(ticket.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{ticket.title}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock size={12} className="mr-1" />
                    {ticket.date}
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default HistoriqueTickets;
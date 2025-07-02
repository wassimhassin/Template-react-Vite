import React from "react";
import { 
  Ticket, 
  User, 
  AlertCircle, 
  Mail, 
  Clock, 
  CheckCircle, 
  PlayCircle, 
  XCircle,
  Calendar,
  UserCheck,
  Flag,
  MessageSquare,
  Edit3,
  Archive
} from "lucide-react";

const DetailsTicket = ({ ticketId }) => {
  const ticketData = {
    1: {
      number: "C-123456",
      title: "Problème de connexion",
      client: "John Doe",
      message: "Je n'arrive pas à me connecter à mon réseau mobile depuis ce matin. J'ai essayé de redémarrer mon téléphone plusieurs fois mais le problème persiste.",
      status: "open",
      priority: "high",
      created: "10/06/2024 09:30",
      assigned: "Agent Smith",
      category: "Technique",
      estimatedTime: "2-4 heures"
    }
  };

  const ticket = ticketData[ticketId] || ticketData[1];

  const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {children}
    </div>
  );

  const getStatusInfo = (status) => {
    switch (status) {
      case "open":
        return { 
          label: "Ouvert", 
          color: "bg-orange-100 text-orange-800 border-orange-200",
          icon: <AlertCircle className="w-4 h-4" />
        };
      case "in-progress":
        return { 
          label: "En cours", 
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: <PlayCircle className="w-4 h-4" />
        };
      case "closed":
        return { 
          label: "Fermé", 
          color: "bg-green-100 text-green-800 border-green-200",
          icon: <CheckCircle className="w-4 h-4" />
        };
      default:
        return { 
          label: "Inconnu", 
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: <XCircle className="w-4 h-4" />
        };
    }
  };

  const getPriorityInfo = (priority) => {
    switch (priority) {
      case "high":
        return { 
          label: "Haute", 
          color: "bg-red-100 text-red-800 border-red-200",
          dotColor: "bg-red-500"
        };
      case "medium":
        return { 
          label: "Moyenne", 
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          dotColor: "bg-yellow-500"
        };
      case "low":
        return { 
          label: "Basse", 
          color: "bg-green-100 text-green-800 border-green-200",
          dotColor: "bg-green-500"
        };
      default:
        return { 
          label: "Normal", 
          color: "bg-gray-100 text-gray-800 border-gray-200",
          dotColor: "bg-gray-500"
        };
    }
  };

  const statusInfo = getStatusInfo(ticket.status);
  const priorityInfo = getPriorityInfo(ticket.priority);

  return (
    <div className="col-span-3">
      <Card className="p-4 sm:p-6 w-full">
        {/* Header avec titre et actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Détail du ticket</h1>
            <p className="text-sm text-gray-500">Informations complètes et suivi</p>
          </div>
         
        </div>

        {/* Section Informations principales */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Informations principales</h2>
          <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Colonne gauche */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <UserCheck className="w-5 h-5 text-orange-600" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-gray-500">Agent</p>
                <p className="font-medium text-gray-900">{ticket.assigned}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Flag className="w-5 h-5 text-red-600" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Priorité</p>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityInfo.color}`}>
                      {priorityInfo.label}
                    </span>
                    <div className={`w-2 h-2 ${priorityInfo.dotColor} rounded-full`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                {statusInfo.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Statut</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusInfo.color}`}>
                    {statusInfo.label}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Problème et Message */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
            Problème rapporté
          </h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
            <h3 className="font-semibold text-gray-900 mb-3 text-lg">{ticket.title}</h3>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <p className="text-gray-700 leading-relaxed">{ticket.message}</p>
            </div>
          </div>
        </div>

        {/* Section Timeline */}
        
      </Card>
    </div>
  );
};

export default DetailsTicket;
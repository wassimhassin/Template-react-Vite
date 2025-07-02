import React from "react";
import { User, Phone, Activity, Euro, CreditCard, Clock, Plus, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SearchMSISDN } from "./SearchMSISDN";
import { ToastContainer } from "react-toastify";

const FicheClient = ({ msisdn, setMsisdn, onOpenTicket }) => {
  const navigate = useNavigate();
  const handleCreateTicket = () => {
    navigate('/creationTickets');
  };

  const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="col-span-5">
      <div className="group bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 sm:p-8 hover:shadow-2xl transition-all duration-500">
        {/* Header avec titre, recherche et bouton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Fiche Client
              </h1>
              <p className="text-sm text-gray-500">Gestion et suivi des informations client</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 w-full sm:w-1/2">
            <div className="w-full sm:w-1/2">
              <SearchMSISDN msisdn={msisdn} setMsisdn={setMsisdn} />
            </div>
            <button
              onClick={onOpenTicket}
              type="button"
              className="group relative flex items-center justify-center space-x-2 px-4 py-3 sm:px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <Zap className="w-4 h-4" />
              <span>Ouvrir un ticket</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Section Information générales */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Information générales du Client</h2>
          <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Informations de base */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-gray-500">Nom Prénom</p>
                <p className="font-medium text-gray-900">John Doe</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-gray-500">Statut SIM</p>
                <div className="flex items-center space-x-2">
                  <p className="font-medium text-gray-900">Active</p>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-gray-500">Date d'activation</p>
                <p className="font-medium text-gray-900">01/01/2023</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Activity className="w-5 h-5 text-orange-600" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-gray-500">PDV activation / Franchise</p>
                <p className="font-medium text-gray-900">Boutique X</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-gray-500">DV activation</p>
                <p className="font-medium text-gray-900">Agent Y / Franchise X</p>
              </div>
            </div>
          </div>
          
          {/* Métriques */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Euro className="w-5 h-5 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">ARPU 30</p>
                  <p className="font-medium text-gray-900 text-lg">25€</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Euro className="w-5 h-5 text-green-600" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">ARPU 90</p>
                  <p className="font-medium text-gray-900 text-lg">70€</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-500">PDV recharge</p>
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-900">Agent Z</p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-200 text-purple-800">
                    80%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-gray-500">Dernière recharge</p>
                <p className="font-medium text-gray-900">15/06/2024</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Activity className="w-5 h-5 text-red-600" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-gray-500">Dernière réclamation</p>
                <p className="font-medium text-gray-900">10/06/2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FicheClient;
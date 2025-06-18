import React from "react";
import { User, Phone, Activity, Euro, CreditCard, Clock } from "lucide-react";
import Card from "./Card";
import Badge from "./Badge";
import { SearchMSISDN } from "./SearchMSISDN";

const FicheClient = () => (
  <div className="[grid-area:1_/_1_/_3_/_6]">
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Fiche Client</h2>
        <Badge variant="success">SIM Active</Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Nom Prénom</p>
              <p className="font-medium text-gray-900">John Doe</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Statut SIM</p>
              <p className="font-medium text-gray-900">Active</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Date d'activation</p>
              <p className="font-medium text-gray-900">01/01/2023</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Activity className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">PDV activation / Franchise</p>
              <p className="font-medium text-gray-900">Boutique X</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">DV activation</p>
              <p className="font-medium text-gray-900">Agent Y / Franchise X</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
            <div className="flex justify-end items-end w-full">
        <SearchMSISDN />
        </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Euro className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">ARPU 30</span>
            </div>
            <span className="font-semibold text-gray-900">25€</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Euro className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">ARPU 90</span>
            </div>
            <span className="font-semibold text-gray-900">70€</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-600">PDV recharge</span>
            </div>
            <span className="font-semibold text-blue-900">Agent Z (80%)</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Dernière recharge:</span>
            <span className="ml-2 font-medium text-gray-900">15/06/2024</span>
          </div>
          <div>
            <span className="text-gray-500">Dernière réclamation:</span>
            <span className="ml-2 font-medium text-gray-900">10/06/2024</span>
          </div>
        </div>
      </div>
    </Card>
  </div>
);

export default FicheClient;
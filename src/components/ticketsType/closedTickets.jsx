import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  RefreshCw, 
  Eye, 
  Edit3, 
  UserPlus, 
  Calendar,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  ChevronDown,
  Download,
  MoreVertical,
  User,
  Building,
  Tag,
  MessageSquare,
  Shield
} from 'lucide-react';
import { useTickets } from '../TicketsContext';

const closedTickets = () => {
  const { tickets, setTickets } = useTickets();
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [filters, setFilters] = useState({
    number: '',
    msisdn: '',
    sousType: '',
    priorite: '',
    agent: '',
    dateDebut: '',
    dateFin: ''
  });

  const [showFilters, setShowFilters] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignUser, setAssignUser] = useState('');
  
  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [paginatedTickets, setPaginatedTickets] = useState([]);

  const users = ['Admin', 'Agent Johnson', 'Agent Smith', 'Agent Brown', 'Agent Davis', 'Agent Wilson'];

  // Appliquer les filtres
  useEffect(() => {
    let filtered = tickets.filter(ticket => {
      return (
        ticket.statut === 'Closed' &&
        (filters.number === '' || ticket.number.toLowerCase().includes(filters.number.toLowerCase())) &&
        (filters.msisdn === '' || ticket.msisdn.includes(filters.msisdn)) &&
        (filters.sousType === '' || ticket.sousType.toLowerCase().includes(filters.sousType.toLowerCase())) &&
        (filters.priorite === '' || ticket.priorite === filters.priorite) &&
        (filters.agent === '' || ticket.agent.toLowerCase().includes(filters.agent.toLowerCase())) &&
        (filters.dateDebut === '' || new Date(ticket.dateCreation) >= new Date(filters.dateDebut)) &&
        (filters.dateFin === '' || new Date(ticket.dateCreation) <= new Date(filters.dateFin))
      );
    });
    setFilteredTickets(filtered);
    setCurrentPage(1); // Revenir à la première page lors d'un nouveau filtre
  }, [filters, tickets]);

  // Gérer la pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedTickets(filteredTickets.slice(startIndex, endIndex));
  }, [filteredTickets, currentPage, itemsPerPage]);

  // Calculer les données de pagination
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredTickets.length);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Générer les numéros de pages à afficher
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const half = Math.floor(maxVisiblePages / 2);
      let start = Math.max(1, currentPage - half);
      let end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
      
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
    }
    
    return pageNumbers;
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      number: '',
      msisdn: '',
      sousType: '',
      priorite: '',
      agent: '',
      dateDebut: '',
      dateFin: ''
    });
  };

 

  const getStatusColor = (statut) => {
    switch (statut) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-purple-100 text-purple-800';
      case 'Closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isHighlightedTicket = (ticket) => {
    return ticket.type === 'Incident' || ticket.priorite === 'High' || ticket.priorite === 'Extreme';
  };

  const handleStatusChange = (ticketId, newStatus) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            statut: newStatus, 
            dateCloture: newStatus === 'Closed' ? new Date().toISOString() : null 
          }
        : ticket
    ));
  };

  const handleAssignTicket = (ticketId, user) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, responsable: user }
        : ticket
    ));
    setShowAssignModal(false);
    setSelectedTicket(null);
    setAssignUser('');
  };

  // Statistiques dynamiques pour les tickets fermés
  const closed = tickets.filter(t => t.statut === 'Closed');
  const countByType = {
    Incident: closed.filter(t => t.type === 'Incident').length,
    Demande: closed.filter(t => t.type === 'Demande').length,
    Réclamation: closed.filter(t => t.type === 'Réclamation').length,
  };
  

  useEffect(() => {
    document.body.classList.add('no-scrollbar');
    document.documentElement.classList.add('no-scrollbar');
    return () => {
      document.body.classList.remove('no-scrollbar');
      document.documentElement.classList.remove('no-scrollbar');
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col no-scrollbar">
      {/* Header avec effet glassmorphism */}
      <div className="sticky top-2 sm:top-6 z-20 bg-white border border-gray-200 rounded-xl shadow-lg mb-4 sm:mb-6 mx-2 sm:mx-6 mt-2 sm:mt-6">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Administration des Tickets
                </h1>
                <p className="text-gray-500 text-sm mt-1">Gestion et suivi des incidents, demandes et réclamations</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`group flex items-center space-x-2 px-5 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 ${
                  showFilters 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                    : 'bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-white hover:shadow-lg'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span className="font-medium">Filtres</span>
              </button>
              
              <button className="group flex items-center space-x-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-700 hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-105">
                <Download className="w-4 h-4" />
                <span className="font-medium">Exporter</span>
              </button>
              
              <button className="group relative flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <RefreshCw className="w-4 h-4" />
                <span>Actualiser</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal avec espacement uniforme */}
      <div
        id="admin-scroll-panel"
        className="flex-1 flex flex-col p-2 sm:p-6 overflow-auto no-scrollbar"
      >
        {/* Filtres */}
        {showFilters && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg mb-6">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de Ticket</label>
                  <input
                    type="text"
                    value={filters.number}
                    onChange={(e) => handleFilterChange('number', e.target.value)}
                    placeholder="C-XXXXXX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">MSISDN</label>
                  <input
                    type="text"
                    value={filters.msisdn}
                    onChange={(e) => handleFilterChange('msisdn', e.target.value)}
                    placeholder="216XXXXXXXX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sous Type</label>
                  <input
                    type="text"
                    value={filters.sousType}
                    onChange={(e) => handleFilterChange('sousType', e.target.value)}
                    placeholder="Sous type du ticket"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
                  <select
                    value={filters.priorite}
                    onChange={(e) => handleFilterChange('priorite', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Toutes</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Extreme">Extreme</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Agent</label>
                  <input
                    type="text"
                    value={filters.agent}
                    onChange={(e) => handleFilterChange('agent', e.target.value)}
                    placeholder="Nom de l'agent"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date début</label>
                  <input
                    type="date"
                    value={filters.dateDebut}
                    onChange={(e) => handleFilterChange('dateDebut', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date fin</label>
                  <input
                    type="date"
                    value={filters.dateFin}
                    onChange={(e) => handleFilterChange('dateFin', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="group flex items-center justify-center w-9 h-9 rounded-full bg-transparent text-red-400 hover:text-red-600 hover:bg-red-50/70 shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
                    title="Effacer les filtres"
                    aria-label="Effacer les filtres"
                  >
                    <XCircle className="w-5 h-5 group-hover:scale-125 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistiques dynamiques style dashboard */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg mb-6 mx-6">
          <div className="flex flex-row gap-4 p-6">
            {/* Total Tickets */}
            <div className="flex items-center flex-1 bg-gray-50 rounded-lg p-4">
              <div className="p-2 bg-gray-700 rounded-lg mr-3 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-600 font-medium">Total Tickets</div>
                <div className="text-xl font-bold text-gray-900">{closed.length}</div>
              </div>
            </div>
            {/* Incidents */}
            <div className="flex items-center flex-1 bg-red-50 rounded-lg p-4">
              <div className="p-2 bg-red-500 rounded-lg mr-3 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-600 font-medium">Incidents</div>
                <div className="text-xl font-bold text-gray-900">{countByType.Incident}</div>
              </div>
            </div>
            {/* Demandes */}
            <div className="flex items-center flex-1 bg-blue-50 rounded-lg p-4">
              <div className="p-2 bg-blue-500 rounded-lg mr-3 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-600 font-medium">Demandes</div>
                <div className="text-xl font-bold text-gray-900">{countByType.Demande}</div>
              </div>
            </div>
            {/* Réclamations */}
            <div className="flex items-center flex-1 bg-orange-50 rounded-lg p-4">
              <div className="p-2 bg-orange-400 rounded-lg mr-3 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-600 font-medium">Réclamations</div>
                <div className="text-xl font-bold text-gray-900">{countByType.Réclamation}</div>
              </div>
            </div>
           
          </div>
        </div>

        {/* Tableau des tickets + Pagination */}
        <div className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden" style={{ minHeight: '500px' }}>
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] table-fixed">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° Ticket</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MSISDN</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sous Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priorité</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date création</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date clôture</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsable</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedTickets.filter(ticket => ticket.statut === 'Closed').map((ticket) => (
                    <tr 
                      key={ticket.id} 
                      className={`hover:bg-gray-50 ${isHighlightedTicket(ticket) ? 'bg-red-50 border-l-4 border-red-500' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`font-medium ${isHighlightedTicket(ticket) ? 'text-red-900' : 'text-gray-900'}`}>
                            {ticket.number}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ticket.msisdn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={ticket.statut}
                          onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                          className={`px-2 py-1 text-xs font-semibold rounded-full border-0 ${getStatusColor(ticket.statut)} focus:ring-2 focus:ring-blue-500`}
                        >
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          ticket.type === 'Incident' ? 'bg-red-100 text-red-800' :
                          ticket.type === 'Demande' ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {ticket.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                        {ticket.sousType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full `}>
                          {ticket.priorite}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ticket.dateCreation ? new Date(ticket.dateCreation).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ticket.dateCloture ? new Date(ticket.dateCloture).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1 text-gray-400" />
                          {ticket.responsable}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ticket.agent}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button 
                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                            title="Voir détails"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                            title="Modifier"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedTicket(ticket);
                              setShowAssignModal(true);
                            }}
                            className="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50"
                            title="Assigner"
                          >
                            <UserPlus className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="bg-white border-t border-gray-200 px-6 py-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Précédent
                </button>
                <div className="flex space-x-1">
                  {getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => goToPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border ${
                        currentPage === page
                          ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      } transition-colors duration-200`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suivant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal d'assignation */}
      {showAssignModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Assigner le ticket {selectedTicket.number}</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sélectionner un utilisateur
              </label>
              <select
                value={assignUser}
                onChange={(e) => setAssignUser(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choisir un utilisateur</option>
                {users.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedTicket(null);
                  setAssignUser('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={() => handleAssignTicket(selectedTicket.id, assignUser)}
                disabled={!assignUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Assigner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default closedTickets;
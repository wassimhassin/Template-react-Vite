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

const Demandes = () => {
  const { tickets, setTickets } = useTickets();
  // Filtres locaux
  const [filters, setFilters] = useState({
    number: '',
    msisdn: '',
    priorite: '',
    agent: '',
    dateDebut: '',
    dateFin: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [paginatedTickets, setPaginatedTickets] = useState([]);

  useEffect(() => {
    setFilteredTickets(
      tickets.filter(ticket =>
        ticket.type === 'Demande' &&
        (ticket.statut === 'Open' || ticket.statut === 'In Progress') &&
        (filters.number === '' || ticket.number.toLowerCase().includes(filters.number.toLowerCase())) &&
        (filters.msisdn === '' || ticket.msisdn.includes(filters.msisdn)) &&
        (filters.priorite === '' || ticket.priorite === filters.priorite) &&
        (filters.agent === '' || ticket.agent.toLowerCase().includes(filters.agent.toLowerCase())) &&
        (filters.dateDebut === '' || new Date(ticket.dateCreation) >= new Date(filters.dateDebut)) &&
        (filters.dateFin === '' || new Date(ticket.dateCreation) <= new Date(filters.dateFin))
      )
    );
    setCurrentPage(1);
  }, [tickets, filters]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedTickets(filteredTickets.slice(startIndex, endIndex));
  }, [filteredTickets, currentPage]);

  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const goToPage = (page) => { if (page >= 1 && page <= totalPages) setCurrentPage(page); };
  const goToPreviousPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
  const goToNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      const half = Math.floor(maxVisiblePages / 2);
      let start = Math.max(1, currentPage - half);
      let end = Math.min(totalPages, start + maxVisiblePages - 1);
      if (end - start + 1 < maxVisiblePages) start = Math.max(1, end - maxVisiblePages + 1);
      for (let i = start; i <= end; i++) pageNumbers.push(i);
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
      priorite: '',
      agent: '',
      dateDebut: '',
      dateFin: ''
    });
  };

  const getPriorityColor = (priorite) => {
    switch (priorite) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Extreme': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  const getStatusColor = (statut) => {
    switch (statut) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-purple-100 text-purple-800';
      case 'Closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  const isHighlightedTicket = (ticket) => ticket.priorite === 'High' || ticket.priorite === 'Extreme';

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignUser, setAssignUser] = useState('');

  const users = ['Admin', 'Agent Johnson', 'Agent Smith', 'Agent Brown', 'Agent Davis', 'Agent Wilson'];

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
    // Implementation of handleAssignTicket
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
      {/* Header sticky uniquement */}
      <div className="sticky top-0 z-30 bg-white border border-gray-200 rounded-xl shadow-lg mb-0 mx-6 mt-6">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Demandes
                </h1>
                <p className="text-gray-500 text-sm mt-1">Gestion et suivi des demandes ouvertes et en cours</p>
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
      {/* Bloc Filtres */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg mb-6 mx-6">
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
      {/* Statistiques rapides */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg mb-6 mx-6">
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="p-2 bg-blue-600 rounded-lg">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Demandes</p>
                <p className="text-xl font-bold text-gray-900">{filteredTickets.length}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
              <div className="p-2 bg-red-600 rounded-lg">
                <XCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Ouverts</p>
                <p className="text-xl font-bold text-gray-900">{filteredTickets.filter(t => t.statut === 'Open').length}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">En cours</p>
                <p className="text-xl font-bold text-gray-900">{filteredTickets.filter(t => t.statut === 'In Progress').length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contenu principal */}
      <div className="flex-1 flex flex-col p-2 sm:p-6 overflow-auto no-scrollbar">
        {/* Tableau des demandes + Pagination */}
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
                  {paginatedTickets.map((ticket) => (
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
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800`}>
                          {ticket.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                        {ticket.sousType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priorite)}`}>
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

export default Demandes;
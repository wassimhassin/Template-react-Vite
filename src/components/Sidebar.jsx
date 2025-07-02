import React, { useState, useEffect } from "react";
import {
    User,
    PlusCircle,
    AlertCircle,
    ListChecks,
    Mail,
    CheckCircle,
    XCircle,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Shield,
    Users,
    Circle
} from "lucide-react";
import Logo from "../assets/logo.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import { useTickets } from "./TicketsContext";

/**
 * Professional Sidebar Component for Customer Service Dashboard
 * 
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.userInfo] - User information object
 * @param {Function} [props.onLogout] - Logout callback function
 * @param {boolean} props.open - Indicates whether the sidebar is open
 * @param {Function} props.setOpen - Function to set the sidebar open state
 * @param {Array} [props.connectedUsers] - Array of connected users
 * @returns {JSX.Element} Sidebar component
 */
const Sidebar = ({
    className = "",
    userInfo = { name: "Agent Support", status: "En ligne" },
    onLogout,
    open,
    setOpen,
    connectedUsers = [
        { id: 1, name: "Ahmed Ben Ali", role: "Admin", status: "online", avatar: "AB" },
        { id: 2, name: "Fatma Trabelsi", role: "Agent", status: "online", avatar: "FT" },
        { id: 3, name: "Mohamed Sassi", role: "Superviseur", status: "away", avatar: "MS" },
        { id: 4, name: "Leila Bouazizi", role: "Agent", status: "online", avatar: "LB" },
        { id: 5, name: "Youssef Khaled", role: "Agent", status: "busy", avatar: "YK" },
        { id: 6, name: "Sarra Mejri", role: "Admin", status: "online", avatar: "SM" },
        { id: 7, name: "Karim Hamdi", role: "Agent", status: "offline", avatar: "KH" }
    ]
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { tickets } = useTickets();
    const totalClosed = tickets.filter(t => t.statut === 'Closed').length;
    
    const menuItems = [
        {
            id: 'client',
            label: 'Fiche Client',
            icon: User,
            description: 'Informations et détails client'
        },
        {
            id: 'new-ticket',
            label: 'Ouvrir un Ticket',
            icon: PlusCircle,
            description: 'Créer un nouveau ticket'
        },
        {
            id: 'incidents',
            label: 'Incidents',
            icon: AlertCircle,
            description: 'Incidents en cours',
            badge: '3',
            badgeColor: 'bg-red-100 text-red-700'
        },
        {
            id: 'Demandes',
            label: 'Demandes',
            icon: ListChecks,
            description: 'Demandes en attente',
            badge: '12',
            badgeColor: 'bg-blue-100 text-blue-700'
        },
        {
            id: 'reclamations',
            label: 'Réclamations',
            icon: Mail,
            description: 'Réclamations clients',
            badge: '5',
            badgeColor: 'bg-yellow-100 text-yellow-700'
        },
        {
            id: 'closed-Tickets',
            label: 'Tickets fermés',
            icon: CheckCircle,
            description: 'Historique des Tickets fermés',
            badge: totalClosed > 0 ? totalClosed.toString() : undefined,
            badgeColor: 'bg-green-200 text-gray-700'
        },
        {
            id: 'admin',
            label: 'Admin',
            icon: Shield,
            description: 'Accéder à l\'interface administrateur'
        },
    ];

    // Fonction pour mapper pathname à l'id du menu
    const getActiveItem = () => {
        switch (location.pathname) {
            case '/dashboard':
                return 'client';
            case '/creationTickets':
                return 'new-ticket';
            case '/adminInterface':
                return 'admin';
            case '/closedTickets':
                return 'closed-Tickets';
            case '/incidents':
                return 'incidents';
            case '/Demandes':
                return 'Demandes';
            case '/reclamations':
                return 'reclamations';
            default:
                return '';
        }
    };
    const activeItem = getActiveItem();

    const handleMenuClick = (itemId) => {
        if (itemId === 'client') {
            navigate('/dashboard');
        } else if (itemId === 'new-ticket') {
            navigate('/creationTickets');
        } else if (itemId === 'admin') {
            navigate('/adminInterface');
        } else if (itemId === 'closed-Tickets') {
            navigate('/closedTickets');
        } else if (itemId === 'incidents') {
            navigate('/incidents');
        } else if (itemId === 'Demandes') {
            navigate('/Demandes');
        } else if (itemId === 'reclamations') {
            navigate('/reclamations');
        }
    };

    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        } else {
            // Comportement par défaut - redirection vers login
            navigate('/login');
        }
    };

    // Fonction pour obtenir la couleur du statut
    const getStatusColor = (status) => {
        switch (status) {
            case 'online':
                return 'bg-green-400';
            
            case 'offline':
                return 'bg-gray-400';
            
        }
    };

    // Fonction pour obtenir le texte du statut
    const getStatusText = (status) => {
        switch (status) {
            case 'online':
                return 'En ligne';            
            case 'offline':
                return 'Hors ligne';
           
        }
    };
    
    useEffect(() => {
        // Close sidebar by default on mobile
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setOpen(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [setOpen]);

    return (
        <div
            className={`transition-all duration-300 flex flex-col shadow-sm border-r border-gray-200 bg-white h-screen ${open ? "w-64" : "w-16"} ${className}`}
            style={{ 
                position: 'relative',
                zIndex: 50,
                overflow: 'visible',
            }}
        >
            <style>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;  /* Internet Explorer 10+ */
                    scrollbar-width: none;  /* Firefox */
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;  /* Safari and Chrome */
                }
            `}</style>
            {/* Toggle Button */}
            <button
                className={`absolute z-50 top-4 -right-4 w-8 h-8 bg-white border border-gray-200 rounded-full shadow flex items-center justify-center transition-all duration-300 ${open ? "" : "right-[-16px]"}`}
                onClick={() => setOpen((prev) => !prev)}
                aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                style={{ left: open ? '15rem' : '5rem' }}
            >
                {open ? <ChevronLeft className="w-5 h-5 text-gray-500" /> : <ChevronRight className="w-5 h-5 text-gray-500" />}
            </button>

            {/* Header Section */}
            <div className={`flex items-center ${open ? "p-6 space-x-3" : "justify-center p-2"}`}>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
                    <img src={Logo} alt="logo" className="w-10 h-10" />
                </div>
                {open && (
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">Cayon Cloud</h1>
                        <p className="text-xs text-gray-500 font-medium">Communications</p>
                    </div>
                )}
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide" style={{
                scrollbarWidth: 'none', /* Firefox */
                msOverflowStyle: 'none'  /* Internet Explorer 10+ */
            }}>
                {open && (
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                        Menu Principal
                    </div>
                )}
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeItem === item.id;
                    // Définir la couleur de l'icône pour Tickets fermés
                    const iconColor = item.id === 'closed-Tickets' ? 'text-green-600' : (isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600');
                    return (
                        <div key={item.id} className="relative group flex justify-center">
                            <button
                                onClick={() => handleMenuClick(item.id)}
                                className={`w-full group flex items-center ${open ? 'justify-between px-3' : 'justify-center px-0'} py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100 transform scale-[1.02]'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:transform hover:scale-[1.01]'
                                    }`}
                                title={item.description}
                            >
                                {/* Always show icon, centered when closed */}
                                <div className={`flex items-center ${open ? 'space-x-3' : 'justify-center w-full'}`}>
                                    <Icon
                                        size={18}
                                        className={`${iconColor} transition-colors duration-200`}
                                    />
                                    {open && <span className="truncate">{item.label}</span>}
                                </div>
                                {open && item.badge && (
                                    <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium transition-colors duration-200 ${isActive
                                        ? 'bg-blue-100 text-blue-700'
                                        : item.badgeColor || 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                            {/* Active indicator */}
                            {isActive && open && (
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full animate-pulse"></div>
                            )}
                            {/* Tooltip on hover (show label and description) */}
                            {!open && (
                                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap min-w-[140px] flex flex-col items-start">
                                    <span className="font-semibold text-sm mb-1">{item.label}</span>
                                    <span className="text-xs text-gray-300">{item.description}</span>
                                    {item.badge && (
                                        <span className={`mt-1 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium ${isActive
                                            ? 'bg-blue-100 text-blue-700'
                                            : item.badgeColor || 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {item.badge}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Section Utilisateurs Connectés - Affiché seulement si sidebar est ouverte */}
                {open && (
                    <div className="mt-6">
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3 flex items-center">
                            <Users className="w-3 h-3 mr-2" />
                            Users Connectés
                            <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                                {connectedUsers.filter(user => user.status === 'online').length}
                            </span>
                        </div>
                        
                        {/* Liste scrollable des utilisateurs */}
                        <div className="max-h-48 overflow-y-auto scrollbar-hide space-y-1 px-1">
                            {connectedUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer group"
                                    title={`${user.name} - ${user.role} (${getStatusText(user.status)})`}
                                >
                                    {/* Avatar */}
                                    <div className="relative">
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                                            {user.avatar}
                                        </div>
                                        {/* Indicateur de statut */}
                                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${getStatusColor(user.status)} rounded-full border-2 border-white`}></div>
                                    </div>
                                    
                                    {/* Informations utilisateur */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200">
                                            {user.name}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {user.role}
                                        </p>
                                    </div>
                                    
                                    
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* User Info Footer with Logout */}
            <div className={`border-t border-gray-200 bg-gray-50 ${open ? "p-4" : "p-2"}`}>
                {/* User Info Card */}
                <div className={`flex items-center ${open ? "space-x-3 p-3 mb-3" : "justify-center p-2 mb-2"} bg-white rounded-lg shadow-sm border border-gray-100 w-full`}>
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-green-600" />
                    </div>
                    {open && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{userInfo.name}</p>
                            <p className="text-xs text-gray-500">{userInfo.status}</p>
                        </div>
                    )}
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>

                {/* Logout Button */}
                <div className="relative group w-full">
                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center ${open ? 'justify-start space-x-3 px-3 py-2.5' : 'justify-center p-2.5'} bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md`}
                        title="Se déconnecter"
                    >
                        <LogOut 
                            size={18} 
                            className="text-gray-500 group-hover:text-red-600 transition-colors duration-200" 
                        />
                        {open && (
                            <span className="text-sm font-medium text-gray-700 group-hover:text-red-700 transition-colors duration-200">
                                Déconnexion
                            </span>
                        )}
                    </button>
                    
                    {/* Tooltip pour le mode fermé */}
                    {!open && (
                        <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                            <span className="font-semibold">Déconnexion</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
import React, { useState } from "react";
import {
    User,
    PlusCircle,
    AlertCircle,
    ListChecks,
    Mail,
    CheckCircle,
    XCircle,
    Wifi,
    ChevronLeft,
    ChevronRight,
    LogOut
} from "lucide-react";
import Logo from "../assets/logo.jpg";

/**
 * Professional Sidebar Component for Customer Service Dashboard
 * 
 * @param {Object} props
 * @param {string} props.activeItem - Currently active menu item ID
 * @param {Function} props.setActiveItem - Function to set active menu item
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.userInfo] - User information object
 * @returns {JSX.Element} Sidebar component
 */
const Sidebar = ({
    activeItem,
    setActiveItem,
    className = "",
    userInfo = { name: "Agent Support", status: "En ligne" }
}) => {
    const [open, setOpen] = useState(true);
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
            id: 'requests',
            label: 'Demandes',
            icon: ListChecks,
            description: 'Demandes en attente',
            badge: '12',
            badgeColor: 'bg-blue-100 text-blue-700'
        },
        {
            id: 'complaints',
            label: 'Réclamations',
            icon: Mail,
            description: 'Réclamations clients',
            badge: '5',
            badgeColor: 'bg-yellow-100 text-yellow-700'
        },
        {
            id: 'closed-incidents',
            label: 'Incidents fermés',
            icon: CheckCircle,
            description: 'Historique des incidents'
        },
        {
            id: 'closed-problems',
            label: 'Problèmes fermés',
            icon: XCircle,
            description: 'Historique des problèmes'
        },
    ];

    const handleMenuClick = (itemId) => {
        setActiveItem(itemId);
    };

    return (
        <div
            className={`transition-all duration-300 flex flex-col shadow-sm border-r border-gray-200 bg-white h-screen ${open ? "w-64" : "w-24"} ${className}`}
            style={{ position: 'relative' }}
        >
            {/* Toggle Button */}
            <button
                className={`absolute z-20 top-4 -right-4 w-8 h-8 bg-white border border-gray-200 rounded-full shadow flex items-center justify-center transition-all duration-300 ${open ? "" : "right-[-16px]"}`}
                onClick={() => setOpen((prev) => !prev)}
                aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                style={{ left: open ? '15rem' : '5rem' }}
            >
                {open ? <ChevronLeft className="w-5 h-5 text-gray-500" /> : <ChevronRight className=" w-5 h-5 text-gray-500" />}
            </button>

            {/* Header Section */}
            <div className={`p-6 flex items-center space-x-3 ${open ? "" : "justify-center p-4 "}`}>
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
            <nav className="flex-1 p-4 space-y-1">
                {open && (
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                        Menu Principal
                    </div>
                )}
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeItem === item.id;
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
                                        className={`${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'} transition-colors duration-200`}
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
            </nav>


            {/* User Info Footer */}
            <div className={`p-4 border-t border-gray-200 bg-gray-50 transition-all duration-300 ${open ? "" : "flex flex-col items-center p-2"}`}>
                <div className={`flex items-center ${open ? "space-x-3 p-3" : "justify-center"} bg-white rounded-lg shadow-sm border border-gray-100 w-full`}>
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
            </div>
        </div>
    );
};

export default Sidebar;
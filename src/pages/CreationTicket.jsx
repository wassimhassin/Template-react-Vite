import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  X, 
  Check, 
  AlertCircle, 
  User, 
  Calendar,
  MessageSquare,
  Clock,
  ChevronDown,
  Plus,
  Upload,
  FileText,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle,
  Sparkles
} from 'lucide-react';

const CreationTicket = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    number: '',
    type: '',
    appelant: '',
    sousType: '',
    priorite: 'Medium',
    dateOuverture: new Date().toISOString().split('T')[0],
    MSISDN: location.state?.msisdn || '',
    pieceJointe: null,
    contenuTicket: '',
    commentaires: '',
    agent: 'Nom et Prénom'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddMotif, setShowAddMotif] = useState(false);
  const [newMotif, setNewMotif] = useState('');
  const [activeStep, setActiveStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFloatingActions, setShowFloatingActions] = useState(false);
  const scrollContainerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [showCoach, setShowCoach] = useState(false);
  const [coachMessage, setCoachMessage] = useState('');
  const [completedSteps, setCompletedSteps] = useState({ info: false, details: false });

  // Configuration des sous-types dynamiques
  const [sousTypesConfig, setSousTypesConfig] = useState({
    client: {
      incident: [
        'Problème Data',
        'Perturbation Data',
        'Problème Emission/Réception d\'appel',
        'Problème envoie/SMS réception'
      ],
      reclamation: [
        'Code USSD non fonctionnel',
        'SIM défectueuse',
        'Forfait non affecté'
      ],
      demande: [
        'Demande de point de recharge',
        'Suivi Consommation forfait',
        'Suivi solde',
        'Demande code RIO',
        'Demande code PUK',
        'Demande réactivation SIM',
        'Demande blocage SIM',
        'Demande de transfert de forfait',
        'Demande de prolongation forfait',
        'Demande d\'information USSD',
        'Demande de validité forfait',
        'Vérification Statut SIM',
        'Demande de remboursement forfait',
        'CIN reçue, réactivation SIM',
        'Configuration APN',
        'Information forfaits disponibles',
        'Demande de SIM Swap',
        'Demande information Roaming',
        'Demande service SOS',
        'Demande service sms appel manqués',
        'Demande info portabilité',
        'Autres/Demande d\'info'
      ]
    },
    franchise: {
      incident: [
        'Problème application',
        'Login expiré'
      ],
      reclamation: [
        'Rupture de stock SIM',
        'Rupture de recharge',
        'SIM défectueuse'
      ],
      demande: [
        'Devenir Franchise/PDV',
        'Demande d\'info reprise activation',
        'Demande d\'annulation de forfait'
      ]
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        // Affiche la barre flottante si on a scrollé plus de 150px
        if (scrollTop > 150) {
          setShowFloatingActions(true);
        } else {
          setShowFloatingActions(false);
        }
      }
    };

    const container = scrollContainerRef.current;
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const { type, appelant, sousType, contenuTicket } = formData;
    const infoDone = type && appelant;
    const detailsDone = sousType && contenuTicket.trim();

    let newProgress = 0;
    if (infoDone) newProgress += 50;
    if (detailsDone) newProgress += 50;
    setProgress(newProgress);

    if (infoDone && !completedSteps.info) {
      setCoachMessage('Parfait ! Passons aux détails du ticket.');
      setShowCoach(true);
      setCompletedSteps(prev => ({ ...prev, info: true }));
      setTimeout(() => setShowCoach(false), 4000);
    }

    if (infoDone && detailsDone && !completedSteps.details) {
      setCoachMessage('Excellent ! Le ticket est prêt à être écré.');
      setShowCoach(true);
      setCompletedSteps(prev => ({ ...prev, details: true }));
      setTimeout(() => setShowCoach(false), 4000);
    }
  }, [formData, completedSteps]);

    const generateTicketNumber = () => {
      const prefix = 'C-';
      const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
      return prefix + randomNum;
    };
    
  // Générer automatiquement le numéro de ticket
  useEffect(() => {
    setFormData(prev => ({ ...prev, number: generateTicketNumber() }));
  }, []);

  // Gérer les changements de formulaire
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Réinitialiser le sous-type si le type ou l'appelant change
    if (field === 'type' || field === 'appelant') {
      setFormData(prev => ({ ...prev, sousType: '' }));
    }
    
    // Effacer les erreurs
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Obtenir les sous-types disponibles
  const getAvailableSousTypes = () => {
    if (!formData.appelant || !formData.type) return [];
    
    const appelantKey = formData.appelant.toLowerCase().includes('client') ? 'client' : 'franchise';
    const typeKey = formData.type.toLowerCase();
    
    return sousTypesConfig[appelantKey]?.[typeKey] || [];
  };

  // Ajouter un nouveau motif
  const handleAddMotif = () => {
    if (!newMotif.trim()) return;
    
    const appelantKey = formData.appelant.toLowerCase().includes('client') ? 'client' : 'franchise';
    const typeKey = formData.type.toLowerCase();
    
    setSousTypesConfig(prev => ({
      ...prev,
      [appelantKey]: {
        ...prev[appelantKey],
        [typeKey]: [...(prev[appelantKey][typeKey] || []), newMotif.trim()]
      }
    }));
    
    setNewMotif('');
    setShowAddMotif(false);
  };

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.type) newErrors.type = 'Le type est requis';
    if (!formData.appelant) newErrors.appelant = 'L\'appelant est requis';
    if (!formData.sousType) newErrors.sousType = 'Le sous-type est requis';
    if (!formData.MSISDN) newErrors.MSISDN = 'Le MSISDN est requis';
    if (!formData.contenuTicket.trim()) newErrors.contenuTicket = 'Le contenu du ticket est requis';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simuler l'envoi
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);

      // Réinitialiser le formulaire mais générer un nouveau numéro de ticket
      setFormData({
        number: generateTicketNumber(),
        type: '',
        appelant: '',
        sousType: '',
        priorite: 'Medium',
        dateOuverture: new Date().toISOString().split('T')[0],
        MSISDN: '',
        pieceJointe: null,
        contenuTicket: '',
        commentaires: '',
        agent: 'Nom et Prénom'
      });
      setCompletedSteps({ info: false, details: false });
      
    } catch (error) {
      alert('Erreur lors de la création du ticket');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Annuler la création
  const handleCancel = () => {
    const currentNumber = formData.number;
    const currentAgent = formData.agent;
    setFormData({
      number: currentNumber,
      type: '',
      appelant: '',
      sousType: '',
      priorite: 'Medium',
      dateOuverture: new Date().toISOString().split('T')[0],
      MSISDN: '',
      pieceJointe: null,
      contenuTicket: '',
      commentaires: '',
      agent: currentAgent
    });
    setErrors({});
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low': return 'from-green-400 to-green-600';
      case 'Medium': return 'from-yellow-400 to-orange-500';
      case 'High': return 'from-orange-500 to-red-500';
      case 'Extreme': return 'from-red-500 to-red-700';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div ref={scrollContainerRef} className="flex h-screen overflow-y-auto no-scrollbar bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pl-2 pr-2 sm:pl-6 sm:pr-6">
      {/* Contenu principal avec espacement uniforme */}
      <div className="p-1 sm:p-2 w-full px-0">
        <div className="w-full">
        
        {/* Header avec effet glassmorphism et barre de progression intégrée */}
        <div className={`sticky top-4 sm:top-8 z-20 mb-4 sm:mb-8 rounded-2xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-xl transition-all duration-500 ease-in-out overflow-hidden ${showFloatingActions ? '-translate-y-40 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
          <div className="px-2 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Création de Ticket
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {formData.type || 'Type non défini'}
                  </div>
                  <div className="text-gray-500 text-sm font-mono">
                    {formData.number || 'C-XXXXXX'}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleCancel}
                className="group flex items-center space-x-2 px-4 sm:px-5 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-700 hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                <span className="font-medium">Annuler</span>
              </button>
              
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="group relative flex items-center space-x-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Création en cours...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Créer le Ticket</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
          {/* Barre de progression intégrée */}
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200/50">
            <div 
              className="h-full bg-gradient-to-r from-green-400 via-cyan-500 to-blue-600 transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 w-full">
          
          {/* Informations générales avec design moderne */}
          <div className="group bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 sm:p-8 w-full m-0 hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center space-x-3 mb-6 sm:mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Informations Générales</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
              {/* Colonne gauche */}
              <div className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Numéro de Ticket</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.number}
                      readOnly
                      className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-0 rounded-xl text-gray-600 font-mono text-lg shadow-inner"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Type</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 appearance-none transition-all duration-300 ${
                        errors.type ? 'border-red-400 bg-red-50/50' : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <option value="">Sélectionner le type</option>
                      <option value="Incident">🚨 Incident</option>
                      <option value="Demande">📋 Demande</option>
                      <option value="Réclamation">⚠️ Réclamation</option>
                    </select>
                  </div>
                  {errors.type && (
                    <div className="flex items-center space-x-2 mt-2 text-red-600 animate-in slide-in-from-left duration-300">
                      <AlertCircle className="w-4 h-4" />
                      <p className="text-sm">{errors.type}</p>
                    </div>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Appelant</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.appelant}
                      onChange={(e) => handleInputChange('appelant', e.target.value)}
                      className={`w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 appearance-none transition-all duration-300 ${
                        errors.appelant ? 'border-red-400 bg-red-50/50' : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <option value="">Sélectionner l'appelant</option>
                      <option value="Client / Franchise PVD">👤 Client / Franchise PVD</option>
                      <option value="Franchise / PDV">🏢 Franchise / PDV</option>
                    </select>
                  </div>
                  {errors.appelant && (
                    <div className="flex items-center space-x-2 mt-2 text-red-600 animate-in slide-in-from-left duration-300">
                      <AlertCircle className="w-4 h-4" />
                      <p className="text-sm">{errors.appelant}</p>
                    </div>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Sous Type</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-3">
                    <div className="relative">
                      <select
                        value={formData.sousType}
                        onChange={(e) => handleInputChange('sousType', e.target.value)}
                        disabled={!formData.appelant || !formData.type}
                        className={`w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 appearance-none transition-all duration-300 ${
                          errors.sousType ? 'border-red-400 bg-red-50/50' : 'border-gray-200 hover:border-blue-300'
                        } ${!formData.appelant || !formData.type ? 'bg-gray-100/50 text-gray-400 cursor-not-allowed' : ''}`}
                      >
                        <option value="">Sélectionner le sous-type</option>
                        {getAvailableSousTypes().map((sousType, index) => (
                          <option key={index} value={sousType}>{sousType}</option>
                        ))}
                      </select>
                    </div>
                    
                  
                    
                    {errors.sousType && (
                      <div className="flex items-center space-x-2 text-red-600 animate-in slide-in-from-left duration-300">
                        <AlertCircle className="w-4 h-4" />
                        <p className="text-sm">{errors.sousType}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Colonne droite */}
              <div className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>MSISDN</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.MSISDN}
                    onChange={(e) => handleInputChange('MSISDN', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-blue-300 transition-all duration-300 ${
                      errors.MSISDN ? 'border-red-400 bg-red-50/50' : 'border-gray-200'
                    }`}
                    placeholder="+216 40 123 456"
                  />
                  {errors.MSISDN && (
                    <div className="flex items-center space-x-2 mt-2 text-red-600 animate-in slide-in-from-left duration-300">
                      <AlertCircle className="w-4 h-4" />
                      <p className="text-sm">{errors.MSISDN}</p>
                    </div>
                  )}
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Date d'ouverture</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.dateOuverture}
                      readOnly
                      className="w-full px-4 py-3 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl text-gray-600 shadow-inner"
                    />
                    <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Priorité</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.priorite}
                      onChange={(e) => handleInputChange('priorite', e.target.value)}
                      className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 appearance-none hover:border-blue-300 transition-all duration-300"
                    >
                      <option value="Low">🟢 Low</option>
                      <option value="Medium">🟡 Medium</option>
                      <option value="High">🟠 High</option>
                      <option value="Extreme">🔴 Extreme</option>
                    </select>
                    <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-r ${getPriorityColor(formData.priorite)} shadow-lg`}></div>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Pièce jointe</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={(e) => handleInputChange('pieceJointe', e.target.files[0])}
                      className="hidden"
                      id="piece-jointe"
                    />
                    <label
                      htmlFor="piece-jointe"
                      className="group flex items-center justify-center space-x-3 w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300"
                    >
                      <Upload className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                      <div className="text-center">
                        <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600">
                          {formData.pieceJointe ? formData.pieceJointe.name : 'Cliquer pour ajouter un fichier'}
                        </span>
                        <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG jusqu'à 10MB</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu et commentaires avec design amélioré */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-8 w-full">
            {/* Contenu du ticket */}
            <div className="group bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 sm:p-8 w-full hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Agent</h3>
                  <p className="text-sm text-gray-600 bg-green-100 px-3 py-1 rounded-full inline-block mt-1">
                    {formData.agent}
                  </p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Contenu du Ticket</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    value={formData.contenuTicket}
                    onChange={(e) => handleInputChange('contenuTicket', e.target.value)}
                    rows={10}
                    className={`w-full px-4 py-4 bg-white/80 backdrop-blur-sm border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 resize-none hover:border-blue-300 transition-all duration-300 ${
                      errors.contenuTicket ? 'border-red-400 bg-red-50/50' : 'border-gray-200'
                    }`}
                    placeholder="Décrivez en détail le problème, la demande ou la réclamation..."
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {formData.contenuTicket.length} caractères
                  </div>
                </div>
                {errors.contenuTicket && (
                  <div className="flex items-center space-x-2 mt-2 text-red-600 animate-in slide-in-from-left duration-300">
                    <AlertCircle className="w-4 h-4" />
                    <p className="text-sm">{errors.contenuTicket}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Commentaires */}
            <div className="group bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 sm:p-8 w-full hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Commentaires</h3>
                  <p className="text-sm text-gray-600">Notes supplémentaires</p>
                </div>
              </div>
              
              <div>
                <textarea
                  value={formData.commentaires}
                  onChange={(e) => handleInputChange('commentaires', e.target.value)}
                  rows={11}
                  className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 resize-none hover:border-purple-300 transition-all duration-300"
                  placeholder="Ajoutez des commentaires supplémentaires, notes internes, ou observations..."
                />
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>Sauvegarde automatique</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {formData.commentaires.length} caractères
                  </div>
                </div>
              </div>
            </div>
          </div>
          </form>
        </div>
      </div>

          {/* Actions flottantes avec design moderne */}
  	      <div className={`fixed bottom-8 right-8 flex items-center space-x-4 transition-all duration-500 z-30 ${showFloatingActions ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
            <div className="flex items-center space-x-3 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 px-6 py-4">
              
              
              <div className="w-px h-6 bg-gray-300"></div>
              
              <button
                type="button"
                onClick={handleCancel}
                className="group flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors duration-300"
              >
                <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                <span className="font-medium">Annuler</span>
              </button>
              
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="group relative flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Création en cours...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Créer le Ticket</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>
          </div>


          {/* Indicateur de progression (maintenant le Smart Coach) */}
          <div className={`fixed bottom-8 left-18 z-40 transition-all duration-500 ${showCoach ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0 pointer-events-none'}`}>
            <div className="flex items-center space-x-3 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 px-5 py-4">
              <div className="w-8 h-8 flex-shrink-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <p className="font-medium text-gray-700">{coachMessage}</p>
            </div>
          </div>

          {/* Notifications toast */}
          {showSuccess && (
            <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500/90 backdrop-blur-xl text-white px-6 py-4 rounded-2xl shadow-2xl border border-green-400/20 animate-in fade-in-50 slide-in-from-top-10 duration-500 z-50 ">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold text-lg ">Ticket créé avec succès !</span>
              </div>
            </div>
          )}
          {Object.keys(errors).length > 0 && !isSubmitting && (
            <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-red-500/90 backdrop-blur-xl text-white px-6 py-4 rounded-2xl shadow-2xl border border-red-400/20 animate-in fade-in-50 slide-in-from-top-10 duration-500 z-50">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-6 h-6" />
                <span className="font-semibold text-lg">Veuillez corriger les erreurs du formulaire</span>
              </div>
            </div>
          )}

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default CreationTicket;
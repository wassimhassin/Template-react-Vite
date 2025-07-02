import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Ticket {
  id: number;
  number: string;
  msisdn: string;
  type: string;
  appelant: string;
  sousType: string;
  priorite: string;
  statut: string;
  dateCreation: string;
  dateCloture: string | null;
  responsable: string;
  agent: string;
  contenu: string;
}

interface TicketsContextType {
  tickets: Ticket[];
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
}

const TicketsContext = createContext<TicketsContextType | undefined>(undefined);

const initialTickets: Ticket[] = [
  {
    id: 1,
    number: 'C-000001',
    msisdn: '21612345678',
    type: 'Incident',
    appelant: 'Client / Franchise PVD',
    sousType: 'Problème Data',
    priorite: 'High',
    statut: 'Open',
    dateCreation: '2025-06-19',
    dateCloture: null,
    responsable: 'Admin',
    agent: 'Agent Smith',
    contenu: 'Problème de connexion data depuis ce matin'
  },
  {
    id: 2,
    number: 'C-000002',
    msisdn: '21687654321',
    type: 'Demande',
    appelant: 'Franchise / PDV',
    sousType: 'Devenir Franchise/PDV',
    priorite: 'Medium',
    statut: 'In Progress',
    dateCreation: '2025-06-18',
    dateCloture: null,
    responsable: 'Agent Johnson',
    agent: 'Agent Brown',
    contenu: "Demande d'ouverture de nouveau point de vente"
  },
  {
    id: 3,
    number: 'C-000003',
    msisdn: '21655555555',
    type: 'Réclamation',
    appelant: 'Client / Franchise PVD',
    sousType: 'SIM défectueuse',
    priorite: 'Extreme',
    statut: 'Open',
    dateCreation: '2025-06-19',
    dateCloture: null,
    responsable: 'Non assigné',
    agent: 'Agent Davis',
    contenu: 'SIM card ne fonctionne plus depuis hier'
  },
  {
    id: 4,
    number: 'C-000004',
    msisdn: '21611111111',
    type: 'Incident',
    appelant: 'Franchise / PDV',
    sousType: 'Problème application',
    priorite: 'Low',
    statut: 'Closed',
    dateCreation: '2025-06-17',
    dateCloture: '2025-06-18',
    responsable: 'Admin',
    agent: 'Agent Wilson',
    contenu: 'Application qui plante lors de la connexion'
  },
  {
    id: 5,
    number: 'C-000005',
    msisdn: '21622222222',
    type: 'Demande',
    appelant: 'Client / Franchise PVD',
    sousType: 'Demande code PUK',
    priorite: 'Medium',
    statut: 'Open',
    dateCreation: '2025-06-19',
    dateCloture: null,
    responsable: 'Agent Johnson',
    agent: 'Agent Brown',
    contenu: 'Client bloqué, demande code PUK'
  },
  {
    id: 6,
    number: 'C-000006',
    msisdn: '21633333333',
    type: 'Incident',
    appelant: 'Franchise / PDV',
    sousType: 'Login expiré',
    priorite: 'High',
    statut: 'In Progress',
    dateCreation: '2025-06-18',
    dateCloture: null,
    responsable: 'Admin',
    agent: 'Agent Davis',
    contenu: "Impossible de se connecter à l'application"
  },
  {
    id: 7,
    number: 'C-000007',
    msisdn: '21644444444',
    type: 'Réclamation',
    appelant: 'Client / Franchise PVD',
    sousType: 'Forfait non affecté',
    priorite: 'Medium',
    statut: 'Open',
    dateCreation: '2025-06-17',
    dateCloture: null,
    responsable: 'Agent Smith',
    agent: 'Agent Wilson',
    contenu: 'Forfait payé mais non activé'
  },
  {
    id: 8,
    number: 'C-000008',
    msisdn: '21655555555',
    type: 'Demande',
    appelant: 'Franchise / PDV',
    sousType: "Demande d'info reprise activation",
    priorite: 'Low',
    statut: 'Closed',
    dateCreation: '2025-06-16',
    dateCloture: '2025-06-17',
    responsable: 'Admin',
    agent: 'Agent Brown',
    contenu: "Information sur la reprise d'activation"
  },
  {
    id: 9,
    number: 'C-000009',
    msisdn: '21666666666',
    type: 'Incident',
    appelant: 'Client / Franchise PVD',
    sousType: 'Problème envoie/SMS réception',
    priorite: 'Extreme',
    statut: 'Open',
    dateCreation: '2025-06-19',
    dateCloture: null,
    responsable: 'Non assigné',
    agent: 'Agent Smith',
    contenu: "Impossible d'envoyer ou recevoir des SMS"
  },
  {
    id: 10,
    number: 'C-000010',
    msisdn: '21677777777',
    type: 'Demande',
    appelant: 'Client / Franchise PVD',
    sousType: 'Configuration APN',
    priorite: 'Medium',
    statut: 'In Progress',
    dateCreation: '2025-06-18',
    dateCloture: null,
    responsable: 'Agent Johnson',
    agent: 'Agent Davis',
    contenu: 'Aide pour configuration APN internet'
  },
  {
    id: 11,
    number: 'C-000011',
    msisdn: '21688888888',
    type: 'Réclamation',
    appelant: 'Franchise / PDV',
    sousType: 'Rupture de stock SIM',
    priorite: 'High',
    statut: 'Open',
    dateCreation: '2025-06-19',
    dateCloture: null,
    responsable: 'Admin',
    agent: 'Agent Wilson',
    contenu: 'Plus de cartes SIM en stock depuis 3 jours'
  },
  {
    id: 12,
    number: 'C-000012',
    msisdn: '21699999999',
    type: 'Demande',
    appelant: 'Client / Franchise PVD',
    sousType: 'Demande de SIM Swap',
    priorite: 'Medium',
    statut: 'Closed',
    dateCreation: '2025-06-15',
    dateCloture: '2025-06-16',
    responsable: 'Agent Brown',
    agent: 'Agent Smith',
    contenu: 'Changement de SIM suite à perte'
  },
  {
    id: 13,
    number: 'C-000013',
    msisdn: '21610101010',
    type: 'Incident',
    appelant: 'Client / Franchise PVD',
    sousType: 'Perturbation Data',
    priorite: 'High',
    statut: 'In Progress',
    dateCreation: '2025-06-18',
    dateCloture: null,
    responsable: 'Admin',
    agent: 'Agent Davis',
    contenu: 'Débit internet très lent depuis hier'
  },
  {
    id: 14,
    number: 'C-000014',
    msisdn: '21611111111',
    type: 'Demande',
    appelant: 'Franchise / PDV',
    sousType: 'Devenir Franchise/PDV',
    priorite: 'Low',
    statut: 'Open',
    dateCreation: '2025-06-17',
    dateCloture: null,
    responsable: 'Agent Johnson',
    agent: 'Agent Wilson',
    contenu: 'Demande d\'information pour devenir partenaire'
  },
  {
    id: 15,
    number: 'C-000015',
    msisdn: '21612121212',
    type: 'Réclamation',
    appelant: 'Client / Franchise PVD',
    sousType: 'Code USSD non fonctionnel',
    priorite: 'Medium',
    statut: 'Open',
    dateCreation: '2025-06-19',
    dateCloture: null,
    responsable: 'Agent Smith',
    agent: 'Agent Brown',
    contenu: 'Code *123# ne répond pas'
  }
];

export const TicketsProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  return (
    <TicketsContext.Provider value={{ tickets, setTickets }}>
      {children}
    </TicketsContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketsContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketsProvider');
  }
  return context;
}; 
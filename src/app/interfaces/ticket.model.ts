
export interface Ticket {
  id: number;
  description: string;
  tel: string;
  motifConsultation: {  // Un objet avec l'ID du motif
    id: number;
  };
  etat?: string;  // Optionnel : "En attente", "Pris en charge", "Traité"
  userId?: number;  // Optionnel : ID de l'utilisateur qui crée le ticket
  medecinId?: number;  // Optionnel : ID du médecin qui prend en charge le ticket
}


export interface EmploiDuTemps {
  id?: number;
  jour: string; // Format: 'YYYY-MM-DD'
  heureDebut: string; // Format: 'HH:mm'
  heureFin: string; // Format: 'HH:mm'
  createur?: { id: number }; // Optionnel, pour l'utilisateur qui a créé
}


// utilisateur.model.ts
export interface Utilisateur {
  id?: number;
  nom: string;
  prenom: string;
  username: string;
  motDePasse: string;
  phone: string;
  email: string;
  sexe: string;
  adresse: string;
  specialite: string;
  RoleType: {
    id: number;
  };
  Department : {
    id: number;
  };
  photos: File; // Ajout de l'attribut 'photos'
}

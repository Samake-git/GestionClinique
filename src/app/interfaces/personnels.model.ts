
export interface Utilisateurs {
    id: number;
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
    file?: FileInfo[];
  }


 export interface FileInfo {

  id?: number;
  name: string;
  url: string;

  }
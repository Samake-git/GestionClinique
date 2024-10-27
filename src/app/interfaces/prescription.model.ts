
export interface Prescription {
    id: number;
    datePrescription?: string;
    commentaire?: string;
    patient?: { id: number; nom: string; prenom: string;     phone: string; sexe: string; adresse: string;
      age: number;
      poids: string;
      ethnie: string; };
    medecin?: { id: number; nom: string; prenom: string,  phone: string; email: string; specialite: string;};
  }
  
  export interface PrescriptionDetail {
    id?: number;
    nomMedicament?: string;
    dosage?: string;
    frequence?: string;
    duree?: string;
    instructions?: string;
    datePremierDose?: string;
    heurePremierDose?: Date;
  }
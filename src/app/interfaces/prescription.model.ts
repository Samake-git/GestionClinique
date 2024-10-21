
export interface Prescription {
    id?: number;
    datePrescription?: string;
    commentaire?: string;
    patient?: { id: number; nom: string; prenom: string };
    medecin?: { id: number; nom: string; prenom: string };
    prescriptionDetails?: PrescriptionDetail[];
  }
  
  export interface PrescriptionDetail {
    id?: number;
    nomMedicament?: string;
    dosage?: string;
    frequence?: string;
    duree?: string;
    instructions?: string;
    datePremierDose?: string;
    heurePremierDose?: string;
  }
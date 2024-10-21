
export interface Consultation {
    id: number; 
    description: string;
    note: string;
    dateCreation: string;
    patient: {
      id: number;
      nom: string;
      prenom: string
  };

  }
  
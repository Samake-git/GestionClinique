import { Analyse } from "./analyse.model";
import { Patient } from "./patient.model";
import { TypeAnalyse } from "./type-analyse.model";


export interface ResultatExamen {
    id: number;
    dateExamen: Date;
    nomExamen: string;
    resultat: string;
    unite: string;
    norme: string;
    commentaire?: string;
    analyse: {
      "id": number;
    };
  }
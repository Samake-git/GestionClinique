// rendez-vous.model.ts
import { EmploiDuTemps } from './emploi-du-temps.model'; // Assurez-vous que le chemin est correct
import { Patient } from './patient.model'; // Assurez-vous que le chemin est correct

export interface RendezVous {
    id: number;
    description: string;
    heureDebut: string; 
    heureFin: string;   
    jour: string;       
    statut: string;
    emploiDuTemps: EmploiDuTemps; 
    patient: Patient;               
}
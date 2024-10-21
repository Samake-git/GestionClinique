
import { CategorieAnalyse } from "./CategorieAnalyse.model";
import { Patient } from "./patient.model";
import { ResultatExamen } from "./resultatexamen.model";
import { TypeAnalyse } from "./type-analyse.model";
import { User } from "./user";




export interface Analyse {
    id: number;
    appareilUtilise: string;
    dateAnalyse: Date;
    typeAnalyse: TypeAnalyse;
    patient: Patient;
    user: User;
    categorieAnalyse: CategorieAnalyse;
    resultats: ResultatExamen[];
}






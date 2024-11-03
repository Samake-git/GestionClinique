
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../interfaces/patient.model'; // Assurez-vous d'avoir le bon chemin vers votre modèle Patient

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private baseUrl = 'http://localhost:8080/api/medecin/patients'; 

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer le JWT stocké dans localStorage
  private getJwtToken(): string | null {
    return localStorage.getItem('jwt');
  }

  // Méthode pour générer les headers avec le JWT
  private getAuthHeaders(): HttpHeaders {
    const token = this.getJwtToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Ajouter un patient (avec gestion du fichier image)
  addPatient(patient: Patient, file?: File): Observable<Patient> {
    const formData: FormData = new FormData();

    // Ajouter les champs patient au FormData
    formData.append('nom', patient.nom);
    formData.append('prenom', patient.prenom);
    formData.append('email', patient.email);
    formData.append('phone', patient.phone);
    formData.append('username', patient.username);
    formData.append('motDePasse', patient.motDePasse);
    formData.append('sexe', patient.sexe);
    formData.append('adresse', patient.adresse);
    formData.append('age', patient.age.toString()); // Convertir en string
    formData.append('poids', patient.poids);
    formData.append('ethenie', patient.ethenie);

    // Ajouter le fichier image si présent
    if (file) {
      formData.append('photos', file);
    }

    return this.http.post<Patient>(`${this.baseUrl}/ajouter`, formData, { headers: this.getAuthHeaders() });
  }

  // Récupérer tous les patients
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.baseUrl}/afficherTous`, { headers: this.getAuthHeaders() });
  }

  // Mettre à jour un patient (avec gestion du fichier image)
  updatePatient(patient: Patient, file?: File): Observable<Patient> {
    const formData: FormData = new FormData();

    // Ajouter les champs patient au FormData
    formData.append('nom', patient.nom);
    formData.append('prenom', patient.prenom);
    formData.append('email', patient.email);
    formData.append('phone', patient.phone);
    formData.append('username', patient.username);
    formData.append('motDePasse', patient.motDePasse);
    formData.append('sexe', patient.sexe);
    formData.append('adresse', patient.adresse);
    formData.append('age', patient.age.toString()); // Convertir en string
    formData.append('poids', patient.poids);
    formData.append('ethenie', patient.ethenie);

    // Ajouter le fichier image si présent
    if (file) {
      formData.append('photos', file);
    }

    return this.http.put<Patient>(`${this.baseUrl}/modifier/${patient.id}`, formData, { headers: this.getAuthHeaders() });
  }

  // Supprimer un patient
  deletePatient(patientId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/supprimer/${patientId}`, { headers: this.getAuthHeaders() });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prescription, PrescriptionDetail } from '../interfaces/prescription.model';
import { Patient } from '../interfaces/patient.model';


@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private apiUrl = 'http://localhost:8080/api/medecin/prescriptions'; 
  private baseUrl1 = 'http://localhost:8080/api/medecin/patients/afficherTous'

  constructor(private http: HttpClient) {}

   // Méthode pour récupérer le JWT stocké dans localStorage
   private getJwtToken(): string | null {
    return localStorage.getItem('jwt');
  }

  // Méthode pour générer les headers avec le JWT
  private getAuthHeaders(): HttpHeaders {
    const token = this.getJwtToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // Ajout du token JWT dans le header Authorization
    });
  }


  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseUrl1, { headers: this.getAuthHeaders() });
  }

  createPrescription(prescriptionData: {
    patientId: number;
    prescription: { commentaire: string };
    details: PrescriptionDetail[];
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, prescriptionData, { headers: this.getAuthHeaders()});
  }

  // Récupérer toutes les prescriptions
  getAllPrescriptions(): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // Récupérer une prescription par ID
  getPrescriptionById(id: number): Observable<Prescription> {
    return this.http.get<Prescription>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // Modifier une prescription existante
  updatePrescription(id: number, updatedPrescriptionData: {
    prescription: { commentaire: string };
    details: PrescriptionDetail[];
  }): Observable<Prescription> {
    return this.http.put<Prescription>(`${this.apiUrl}/modifier/${id}`, updatedPrescriptionData, { headers: this.getAuthHeaders() });
  }

  // Supprimer une prescription par ID
  deletePrescription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/supprimer/${id}`, { headers: this.getAuthHeaders() });
  }


}
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
  private detailUrl = 'http://localhost:8080/api/medecin/prescriptionDetail'; // URL pour les détails de prescription
  private baseUrl1 = 'http://localhost:8080/api/medecin/patients/afficherTous';

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

  // Récupérer tous les patients
  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseUrl1, { headers: this.getAuthHeaders() });
  }

  // Créer une prescription
  createPrescription(prescription: any): Observable<Prescription> {
    return this.http.post<Prescription>(`${this.apiUrl}/ajouter`, prescription, { headers: this.getAuthHeaders() });
  }

  // Récupérer toutes les prescriptions
  getAllPrescriptions(): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(`${this.apiUrl}/afficherTous`, { headers: this.getAuthHeaders() });
  }

  // Récupérer une prescription par ID
  getPrescriptionById(id: number): Observable<Prescription> {
    return this.http.get<Prescription>(`${this.apiUrl}/afficher/${id}`, { headers: this.getAuthHeaders() });
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

  // Créer un détail de prescription
  createPrescriptionDetail(detailData: PrescriptionDetail): Observable<PrescriptionDetail> {
    return this.http.post<PrescriptionDetail>(`${this.detailUrl}/ajouter`, detailData, { headers: this.getAuthHeaders() });
  }

  // Récupérer tous les détails de prescription
  getAllPrescriptionDetails(): Observable<PrescriptionDetail[]> {
    return this.http.get<PrescriptionDetail[]>(`${this.detailUrl}/afficherTous`, { headers: this.getAuthHeaders() });
  }

  // Récupérer un détail de prescription par ID
  getPrescriptionDetailById(id: number): Observable<PrescriptionDetail> {
    return this.http.get<PrescriptionDetail>(`${this.detailUrl}/afficher/${id}`, { headers: this.getAuthHeaders() });
  }

  // Modifier un détail de prescription
  updatePrescriptionDetail(id: number, updatedDetail: PrescriptionDetail): Observable<PrescriptionDetail> {
    return this.http.put<PrescriptionDetail>(`${this.detailUrl}/modifier/${id}`, updatedDetail, { headers: this.getAuthHeaders() });
  }

  // Supprimer un détail de prescription
  deletePrescriptionDetail(id: number): Observable<void> {
    return this.http.delete<void>(`${this.detailUrl}/supprimer/${id}`, { headers: this.getAuthHeaders() });
  }

  // Récupérer tous les détails de prescription pour une prescription donnée

  getPrescriptionDetails(prescriptionId: number): Observable<PrescriptionDetail[]> {
    return this.http.get<PrescriptionDetail[]>(`${this.detailUrl}/prescription/${prescriptionId}`, { headers: this.getAuthHeaders() });
  }


}
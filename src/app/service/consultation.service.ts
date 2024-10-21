// consultation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consultation } from '../interfaces/consultation.model';
import { Patient } from '../interfaces/patient.model';

@Injectable({
  providedIn: 'root',
})
export class ConsultationService {
  private baseUrl = 'http://localhost:8080/api/medecin/Consultation'; 

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

    ajouterConsultation(consultation: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/ajouter`, consultation, { headers: this.getAuthHeaders() });
    }

    modifierConsultation(id: number, consultation: Consultation): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/modifier/${id}`, consultation, { headers: this.getAuthHeaders() });
    }

    // Supprimer une consultation
    supprimerConsultation(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/supprimer/${id}` , { headers: this.getAuthHeaders() });
    }

    // Afficher toutes les consultations
    getAllConsultations(): Observable<Consultation[]> {
        return this.http.get<Consultation[]>(`${this.baseUrl}/affichertous`, { headers: this.getAuthHeaders() });
    }

    // Afficher une consultation par ID
    getConsultationById(id: number): Observable<Consultation> {
        return this.http.get<Consultation>(`${this.baseUrl}/afficher/${id}` , { headers: this.getAuthHeaders() });
    }

}
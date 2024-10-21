// department.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class MotifConsultationService {
  private baseUrl = 'http://localhost:8080/api/receptionniste/motifconsultation'; 

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

    getAllmotifconsultations(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/afficherTous`, { headers: this.getAuthHeaders() });
      }

  createMotifconsultation(motifconsultation: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Creer`, motifconsultation, { headers: this.getAuthHeaders() });
  }

  updateMotifconsultation(motifconsultation: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifier/${motifconsultation.id}`, motifconsultation, { headers: this.getAuthHeaders() });
  }

  deleteMotifconsultation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/supprimer/${id}`, { headers: this.getAuthHeaders() });
  }
}
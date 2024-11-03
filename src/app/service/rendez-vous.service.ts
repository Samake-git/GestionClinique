
// rendez-vous.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RendezVous } from '../interfaces/rendez-vous.model';

@Injectable({
    providedIn: 'root'
})
export class RendezVousService {
    private baseUrl = 'http://localhost:8080/api/medecin/rendezvous'; 

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

    // Obtenir les rendez-vous par emploi du temps
    obtenirRendezVousParEmploiDuTemps(emploiDuTempsId: number): Observable<RendezVous[]> {
        return this.http.get<RendezVous[]>(`${this.baseUrl}/emploiDuTemps/${emploiDuTempsId}`, { headers: this.getAuthHeaders() });
    }

     // Annuler un rendez-vous
     annulerRendezVous(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/annuler/${id}`, { headers: this.getAuthHeaders() });
    }

    // Valider un rendez-vous
    validerRendezVous(id: number): Observable<void> {
        const headers = this.getAuthHeaders();
        return this.http.put<void>(`${this.baseUrl}/valider/${id}`, {}, { headers });
    }

    
}
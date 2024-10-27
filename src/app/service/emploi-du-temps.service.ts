import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmploiDuTemps } from '../interfaces/emploi-du-temps.model';


@Injectable({
  providedIn: 'root'
})
export class EmploiDuTempsService {
  private baseUrl = 'http://localhost:8080/api/medecin/EmploisDuTemps';

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


  ajouterDisponibilite(emploiDuTemps: EmploiDuTemps): Observable<any> {
    
    return this.http.post(`${this.baseUrl}/ajouter`, emploiDuTemps, { headers: this.getAuthHeaders() });
}

  modifierDisponibilite(id: number, emploiDuTemps: EmploiDuTemps): Observable<EmploiDuTemps> {
    return this.http.put<EmploiDuTemps>(`${this.baseUrl}/modifier/${id}`, emploiDuTemps, { headers: this.getAuthHeaders() });
}

  supprimerDisponibilite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/supprimer/${id}`, { headers: this.getAuthHeaders() });
  }

  afficherDisponibilites(): Observable<EmploiDuTemps[]> {
    return this.http.get<EmploiDuTemps[]>(`${this.baseUrl}/afficher`, { headers: this.getAuthHeaders() });
  }

  afficherDisponibilitesParJour(jour: string): Observable<EmploiDuTemps[]> {
    return this.http.get<EmploiDuTemps[]>(`${this.baseUrl}/afficher/jour`, { params: { jour } });
  }

  reserverCreneau(id: number, rendezVous: string): Observable<EmploiDuTemps> {
    return this.http.post<EmploiDuTemps>(`${this.baseUrl}/reserver/${id}`, null, { params: { rendezVous } });
  }

  libererCreneau(id: number): Observable<EmploiDuTemps> {
    return this.http.post<EmploiDuTemps>(`${this.baseUrl}/liberer/${id}`, { headers: this.getAuthHeaders() });
  }
}
